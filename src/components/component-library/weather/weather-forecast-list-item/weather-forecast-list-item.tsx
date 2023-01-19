import { TbTemperatureMinus, TbTemperaturePlus } from 'react-icons/tb';
import { Unit } from '../../../../enums/unit.enum';
import { WeatherForecast } from '../../../../types/types';
import { setUnit } from '../../../../utils/set-unit-of-measures';
import { WeatherIcon } from '../../weather-icon/weather-icon';
import './WeatherForecastListItem.css';

export const WeatherForecastListItem = (props: { data: WeatherForecast }) => {
  return (
    <div className='weather-forecast-list-item'>
      <div className='weather-forecast-list-item__date'>{props.data.date}</div>

      <WeatherIcon icon={props.data.icon} image={{ width: 60 }} />

      <div className='weather-forecast-list-item__temperature'>
        {setUnit(props.data.temp, Unit.CELSIUS)}
      </div>
      <div className='weather-forecast-list-item__info'>
        <small>{props.data.description}</small>
      </div>
      <div className='weather-forecast-list-item__info'>
        <TbTemperaturePlus size={15} />
        {setUnit(props.data.temp_max, Unit.CELSIUS)}
      </div>
      <div className='weather-forecast-list-item__info'>
        <TbTemperatureMinus size={15} />
        {setUnit(props.data.temp_min, Unit.CELSIUS)}
      </div>
    </div>
  );
};
