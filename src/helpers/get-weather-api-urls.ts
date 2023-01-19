import { API_KEY } from '../utils/constants';

export const getWeatherAPIUrl = (city: string) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
};

export const getWeatherAPIForecastUrl = (city: string) => {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
};
