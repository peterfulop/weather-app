import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyRoutes } from '../../../../enums/routes.enum';
import { Unit } from '../../../../enums/unit.enum';
import { getWeatherByAllCity } from '../../../../helpers/fetch-data';
import { CityWeather } from '../../../../types/types';
import { LSK } from '../../../../utils/constants';
import { setUnit } from '../../../../utils/set-unit-of-measures';
import { WeatherIcon } from '../../weather-icon/weather-icon';

export const CityListItem = (props: {
  city: CityWeather;
  index: number;
  setCities: React.Dispatch<React.SetStateAction<CityWeather[]>>;
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteCity = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const currentCity = e.currentTarget.id;
    const data = await getWeatherByAllCity();
    if (data) {
      const updatedData = data.filter((city) => city.name !== currentCity);
      localStorage.setItem(LSK, JSON.stringify([...updatedData]));
      props.setCities([...updatedData]);
    }
    setConfirmDelete(false);
  };

  const handleClickItem = (cityName: string) => {
    navigate(MyRoutes.DETAILS.replace(':cityName', cityName));
  };

  return (
    <div
      className='city-item'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClickItem(props.city.name);
      }}
    >
      <div className='city-item__actions'>
        {!confirmDelete && (
          <button
            className='before-delete-city-item-btn'
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
          <div className='city-item__actions_confirm'>
            <button
              className='delete-city-item-back-btn'
              id={props.city.name}
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(false);
              }}
            >
              Back!
            </button>
            <button
              className='delete-city-item-confirm-btn'
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
      <div className='city-item__content'>
        <div className='city-item__info'>
          <div className='city-item__info'>
            <p className='city-item__name'>{props.city.name}</p>
            <small>{props.city.country}</small>
          </div>
          <div className='city-item__info_line'>
            <p className='city-item__description'>{props.city.description}</p>
          </div>
        </div>
        <div className='city-item__temperature'>
          <p>{setUnit(props.city.temp, Unit.CELSIUS)}</p>
        </div>
        <WeatherIcon icon={props.city.icon} image={{ width: 80 }} />
      </div>
    </div>
  );
};
