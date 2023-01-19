import { useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { MdViewCarousel } from 'react-icons/md';
import { WeatherForecast } from '../../../../types/types';

import { useParams } from 'react-router-dom';
import { setLineChartInputs } from '../../../../helpers/set-line-charts-data';
import { LineChart } from '../../line-chart/line-chart';
import { WeatherForecastList } from '../weather-forecast-list/weather-forecast-list';
import './WeatherForecast.css';

export const WeatherForecastsBlock = (props: {
  weatherForecast: WeatherForecast[];
}) => {
  const [chartView, setChartView] = useState(false);

  const { cityName } = useParams();

  return (
    <div className='weather-forecast-block'>
      <div className='weather-forecast-block__actions'>
        <small>
          {`Weather forecast for the next ${props.weatherForecast.length} days.`}
        </small>
        {chartView ? (
          <MdViewCarousel
            size={30}
            color='lightGray'
            onClick={() => setChartView(false)}
            className='forecast-view-action-btn'
            title='Get the list view!'
          />
        ) : (
          <AiOutlineLineChart
            size={30}
            color='lightGray'
            onClick={() => setChartView(true)}
            className='forecast-view-action-btn'
            title='Get the chart view!'
          />
        )}
      </div>
      {chartView ? (
        <div className='weather-forecast-block__chart'>
          <LineChart
            lineChartInput={setLineChartInputs(props.weatherForecast)}
          />
        </div>
      ) : (
        <WeatherForecastList data={props.weatherForecast} />
      )}
    </div>
  );
};
