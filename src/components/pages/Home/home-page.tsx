import { useEffect, useState } from 'react';
import { getWeatherByAllCity } from '../../../helpers/fetch-data';
import { CityWeather } from '../../../types/types';
import { AddCityForm } from '../../component-library/city/add-city-form/add-city-form';
import { CityList } from '../../component-library/city/city-list/city-list';
import { ErrorBlock } from '../../component-library/error-block/error-block';
import { MainLayout } from '../../component-library/main-layout/main-layout';
import { MySpinner } from '../../component-library/spinner/spinner';

export const HomePage = () => {
  const [citiesWeather, setCitiesWeather] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const data = await getWeatherByAllCity();
        if (data) setCitiesWeather([...data]);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <AddCityForm
        cities={citiesWeather}
        setCities={setCitiesWeather}
        enabled={citiesWeather.length < 10}
      />
      {loading && !error && <MySpinner color='light' />}
      {error && <ErrorBlock message={error} />}
      {!loading && citiesWeather.length > 0 && (
        <CityList cities={citiesWeather} setCities={setCitiesWeather} />
      )}
      {!loading && !citiesWeather.length && (
        <p className='text-light p-4'>No city stored yet...</p>
      )}
    </MainLayout>
  );
};
