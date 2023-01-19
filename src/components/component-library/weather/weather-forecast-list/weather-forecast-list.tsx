import { WeatherForecast } from '../../../../types/types';
import { WeatherForecastListItem } from '../weather-forecast-list-item/weather-forecast-list-item';
import './WeatherForecastList.css';

export const WeatherForecastList = (props: { data: WeatherForecast[] }) => {
  return (
    <div className='weather-forecast-list'>
      {props.data.map((info, index) => (
        <WeatherForecastListItem key={index} data={info} />
      ))}
    </div>
  );
};
