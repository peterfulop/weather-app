import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getWeatherByCity,
  getWeatherForecastByCity,
} from '../../../helpers/fetch-data';
import { DetailedCityWeather, WeatherForecast } from '../../../types/types';
import { BackToHomeNav } from '../../component-library/back-to-home-nav/back-to-home-nav';
import { ErrorBlock } from '../../component-library/error-block/error-block';
import { MainLayout } from '../../component-library/main-layout/main-layout';
import { MySpinner } from '../../component-library/spinner/spinner';
import { CurrentWeatherBlock } from '../../component-library/weather/current-weather/current-weather';
import { WeatherForecastsBlock } from '../../component-library/weather/weather-forecast/weather-forecast';

export const DetailsPage = () => {
  const [detailedCityWeather, setDetailedCityWeather] =
    useState<DetailedCityWeather>();
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[]>();
  const [loading, setLoading] = useState(false);
  const [currentWeatherError, setCurrentWeatherError] = useState<
    string | null
  >();
  const [weatherForecastError, setWeatherForecastError] = useState<
    string | null
  >();

  const { cityName } = useParams();

  useEffect(() => {
    setLoading(true);
    setCurrentWeatherError(null);
    const fetchData = async () => {
      try {
        const data = await getWeatherByCity(cityName);
        if (!data) {
          setCurrentWeatherError('City does not exist in the stored items.');
        }
        if (data) setDetailedCityWeather(data);
        setLoading(false);
      } catch (error: any) {
        setCurrentWeatherError(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    setWeatherForecastError(null);
    const fetchData = async () => {
      try {
        const data = await getWeatherForecastByCity(cityName);
        if (!data) {
          setWeatherForecastError('City does not exist in the stored items.');
        }
        if (data) setWeatherForecast([...data]);
        setLoading(false);
      } catch (error: any) {
        setWeatherForecastError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <BackToHomeNav />
      {loading && <MySpinner color='light' />}
      {!loading && detailedCityWeather && !currentWeatherError ? (
        <CurrentWeatherBlock city={detailedCityWeather} />
      ) : (
        <ErrorBlock message={currentWeatherError as string} />
      )}
      {!loading && weatherForecast && !weatherForecastError ? (
        <WeatherForecastsBlock weatherForecast={weatherForecast} />
      ) : (
        <ErrorBlock message={weatherForecastError as string} />
      )}
    </MainLayout>
  );
};
