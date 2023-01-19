import { KELVIN_TO_CELSIUS } from './constants';

export const convertKelvinToCelcius = (temperature: number): number => {
  return Number((temperature - KELVIN_TO_CELSIUS).toFixed(1));
};
