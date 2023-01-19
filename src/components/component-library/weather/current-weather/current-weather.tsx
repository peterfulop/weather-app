import { DetailedCityWeather } from '../../../../types/types';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyRoutes } from '../../../../enums/routes.enum';
import { Unit } from '../../../../enums/unit.enum';
import { getWeatherByAllCity } from '../../../../helpers/fetch-data';
import { LSK } from '../../../../utils/constants';
import { setUnit } from '../../../../utils/set-unit-of-measures';
import { WeatherIcon } from '../../weather-icon/weather-icon';
import './CurrentWeather.css';

export const CurrentWeatherBlock = (props: { city: DetailedCityWeather }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDeleteCity = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const currentCity = e.currentTarget.id;
    const data = await getWeatherByAllCity();
    if (data) {
      const updatedData = data.filter((city) => city.name !== currentCity);
      localStorage.setItem(LSK, JSON.stringify([...updatedData]));
      navigate(MyRoutes.HOME);
    }
    setConfirmDelete(false);
  };

  return (
    <div className='detailed-city-item'>
      <div className='detailed-city-item__actions'>
        {!confirmDelete && (
          <button
            className='detailed-city-item-delete__btn'
            id={props.city.name}
            onClick={(e) => {
              e.stopPropagation();
              setConfirmDelete(true);
            }}
          >
            x
          </button>
        )}
        {confirmDelete && (
          <div className='detailed-city-item__actions_confirm'>
            <button
              className='detailed-city-item-delete-back__btn'
              id={props.city.name}
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(false);
              }}
            >
              Back!
            </button>
            <button
              className='detailed-city-item-delete-confirm__btn'
              id={props.city.name}
              onClick={async (e) => {
                e.stopPropagation();
                await handleDeleteCity(e);
              }}
            >
              Delete item!
            </button>
          </div>
        )}
      </div>
      <div className='detailed-city-item__title'>
        <h3>
          {props.city.name}
          <span>{props.city.country}</span>
        </h3>
      </div>
      <div className='detailed-city-item__content'>
        <div className='detailed-city-item__content_col'>
          <WeatherIcon icon={props.city.icon} image={{ width: 100 }} />
          <p className='detailed-city-item__date'>{props.city.date}</p>
          <p className='detailed-city-item__description'>
            {props.city.description}
          </p>
        </div>
        <div className='detailed-city-item__content_col'>
          <div className='detailed-temperature'>
            {setUnit(props.city.temp, Unit.CELSIUS)}
          </div>
          <div className='detailed-info'>
            <span>max:</span>
            {setUnit(props.city.temp_max, Unit.CELSIUS)}
          </div>
          <div className='detailed-info'>
            <span>min:</span>
            {setUnit(props.city.temp_min, Unit.CELSIUS)}
          </div>
          <div className='detailed-info'>
            <span>humidity:</span>
            {setUnit(props.city.humidity, Unit.PERCENTAGE)}
          </div>
          <div className='detailed-info'>
            <span>pressure:</span>
            {setUnit(props.city.pressure, Unit.PRESSURE)}
          </div>
        </div>
      </div>
    </div>
  );
};
