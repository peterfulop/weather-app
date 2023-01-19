import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { fetchDataByName } from '../../../../helpers/fetch-data';
import { CityWeather } from '../../../../types/types';
import { LSK } from '../../../../utils/constants';
import { convertKelvinToCelcius } from '../../../../utils/convert-kelvin-to-celsius';
import './AddCityForm.css';

export const AddCityForm = (props: {
  enabled: boolean;
  cities: CityWeather[] | null;
  setCities: React.Dispatch<React.SetStateAction<CityWeather[]>>;
}) => {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setCity('');
    setError(null);
  };

  const isCityExists = (newCity: string): boolean => {
    const result = props.cities?.find(
      (city) => city.name.toUpperCase() === newCity.toUpperCase()
    );
    return !!result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!city) {
      setError('City name is required!');
      return;
    }

    const exists = isCityExists(city);
    if (exists) {
      setError('City name already exists!');
      return;
    }

    const cityData = await fetchDataByName(city);
    if (!cityData) {
      setError('City name does not exists in the database!');
      return;
    }

    const newCity: CityWeather = {
      name: cityData.name,
      country: cityData.sys.country,
      temp: convertKelvinToCelcius(cityData.main.temp),
      description: cityData.weather[0].description,
      icon: cityData.weather[0].icon,
    };

    let current: CityWeather[] = [];
    if (props.cities) {
      current = [...props.cities, newCity];
    } else {
      current.push(newCity);
    }
    const sorted = current.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem(LSK, JSON.stringify(sorted));
    props.setCities(sorted);
    resetForm();
  };

  return props.enabled ? (
    <Form
      className='add-city-form'
      onChange={() => error && resetForm()}
      onSubmit={async (e) => await handleSubmit(e)}
    >
      <h4>Add new city!</h4>
      <div className='add-city-form__input'>
        <Form.Control
          type='text'
          placeholder='name of the city...'
          onChange={(e) => {
            setCity(e.target.value);
          }}
          value={city}
        />
        <Button
          className='mt-3'
          name='add-city'
          variant='success'
          type='submit'
        >
          Add!
        </Button>
      </div>
      {error && <p className='add-city-form__error-message'>{error}</p>}
    </Form>
  ) : (
    <div className='add-city-form'>
      <h4>You have reached the limit of ownable cities!</h4>
      <small>To add a new city, delete one first!</small>
    </div>
  );
};
