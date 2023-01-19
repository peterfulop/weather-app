export type CityWeather = {
  name: string;
  country: string;
  temp: number;
  description: string;
  icon: string;
};

export type DetailedCityWeather = CityWeather & {
  date: string;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
};

type ExcludedCityWeatherType = Omit<
  DetailedCityWeather,
  'name' | 'country' | 'main'
>;

export type WeatherForecastNumber = {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
};

export type WeatherForecastNumbers = keyof WeatherForecastNumber;

export type WeatherForecast = ExcludedCityWeatherType & {
  date: string;
  temp_min: number;
  temp_max: number;
  icon: string;
};

export type LineChartInput = {
  chartTitle?: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    color?: string;
  }[];
};
