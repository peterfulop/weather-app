import { LineChartInput, WeatherForecast } from '../types/types';

export const setLineChartInputs = (
  weatherForecast: WeatherForecast[]
): LineChartInput => {
  const minTemperatures = weatherForecast.map((data) => data.temp_min);
  const maxTemperatures = weatherForecast.map((data) => data.temp_max);
  const labels = weatherForecast.map((data) => data.date.split(',')[1]);
  return {
    labels,
    datasets: [
      {
        label: 'min',
        data: [...minTemperatures],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        color: 'white',
      },
      {
        label: 'max',
        data: [...maxTemperatures],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};
