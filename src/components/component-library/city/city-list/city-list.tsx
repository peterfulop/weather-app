import { CityWeather } from '../../../../types/types';
import { CityListItem } from '../city-list-item/city-list-item';

import '../City.css';

export const CityList = (props: {
  cities: CityWeather[];
  setCities: React.Dispatch<React.SetStateAction<CityWeather[]>>;
}) => {
  return (
    <div className='city-list'>
      {props.cities?.map((city, index) => {
        return (
          <CityListItem
            city={city}
            key={index}
            index={index + 1}
            setCities={props.setCities}
          />
        );
      })}
    </div>
  );
};
