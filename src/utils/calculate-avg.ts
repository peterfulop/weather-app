import { WeatherForecast, WeatherForecastNumbers } from '../types/types';

export const calculateAVG = (
  array: WeatherForecast[],
  property: WeatherForecastNumbers
): number => {
  let initialValue = 0;
  const result =
    array.reduce(
      (accumulator, currentValue) => accumulator + currentValue[property],
      initialValue
    ) / array.length;
  return Number(result.toFixed(1));
};
