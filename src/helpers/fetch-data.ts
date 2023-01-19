import {
  CityWeather,
  DetailedCityWeather,
  WeatherForecast,
} from '../types/types';
import { calculateAVG } from '../utils/calculate-avg';
import { LSK } from '../utils/constants';
import { convertKelvinToCelcius } from '../utils/convert-kelvin-to-celsius';
import { convertDateToString } from '../utils/convert-string-to-date';
import { groupBy } from '../utils/group-by';
import {
  getWeatherAPIForecastUrl,
  getWeatherAPIUrl,
} from './get-weather-api-urls';

export const fetchDataByName = async (city: string, forecast?: boolean) => {
  try {
    const URL = forecast
      ? getWeatherAPIForecastUrl(city)
      : getWeatherAPIUrl(city);
    const data = await fetch(URL);
    if (data.status.toString().startsWith('4')) {
      throw new Error();
    } else {
      return await data.json();
    }
  } catch (error) {
    return null;
  }
};

export const getWeatherByAllCity = async () => {
  const storedCities = localStorage.getItem(LSK);
  if (storedCities) {
    const sortedStoredCities = (JSON.parse(storedCities) as CityWeather[]).sort(
      (a, b) => a.name.localeCompare(b.name)
    );
    return await Promise.all(
      sortedStoredCities.map(async (city) => {
        const res = await fetchDataByName(city.name);
        return {
          name: res.name,
          country: res.sys.country,
          temp: convertKelvinToCelcius(res.main.temp),
          description: res.weather[0].description,
          icon: res.weather[0].icon,
        } as CityWeather;
      })
    );
  }
};

export const getWeatherByCity = async (
  currentCity: string | undefined
): Promise<DetailedCityWeather | null> => {
  const storedCities = localStorage.getItem(LSK);
  if (storedCities) {
    const sortedStoredCities = JSON.parse(
      storedCities
    ) as DetailedCityWeather[];
    const storedCity = sortedStoredCities.find(
      (city) => city.name === currentCity
    );
    if (!storedCity) {
      return null;
    }
    const res = await fetchDataByName(storedCity.name);
    return {
      name: res.name,
      country: res.sys.country,
      temp: convertKelvinToCelcius(res.main.temp),
      temp_min: convertKelvinToCelcius(res.main.temp_min),
      temp_max: convertKelvinToCelcius(res.main.temp_max),
      pressure: res.main.pressure,
      date: convertDateToString(res.dt),
      description: res.weather[0].description,
      humidity: res.main.humidity,
      icon: res.weather[0].icon,
    } as DetailedCityWeather;
  } else {
    return null;
  }
};

export const getWeatherForecastByCity = async (
  city: string | undefined
): Promise<WeatherForecast[] | null> => {
  if (!city) return [];
  const res = await fetchDataByName(city, true);
  if (!res) {
    return null;
  }
  console.log(res);

  const data = res.list.map((item: any): WeatherForecast => {
    return {
      date: convertDateToString(item.dt),
      temp: convertKelvinToCelcius(item.main.temp),
      temp_min: convertKelvinToCelcius(item.main.temp_min),
      temp_max: convertKelvinToCelcius(item.main.temp_max),
      pressure: item.main.pressure,
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    };
  }) as WeatherForecast[];

  const groupByDate = groupBy(data, (i) => i.date);
  return Object.entries(groupByDate).map((data) => {
    const currentDate = data[0];
    const currentMeasurements = data[1];
    const tempAvg = calculateAVG(currentMeasurements, 'temp');
    const tempMinAvg = calculateAVG(currentMeasurements, 'temp_min');
    const tempMaxAvg = calculateAVG(currentMeasurements, 'temp_max');
    const pressureAvg = calculateAVG(currentMeasurements, 'pressure');
    const humidityAvg = calculateAVG(currentMeasurements, 'humidity');
    return {
      date: currentDate,
      temp: tempAvg,
      temp_min: tempMinAvg,
      temp_max: tempMaxAvg,
      pressure: pressureAvg,
      humidity: humidityAvg,
      description: currentMeasurements[1].description,
      icon: currentMeasurements[1].icon,
    };
  });
};
