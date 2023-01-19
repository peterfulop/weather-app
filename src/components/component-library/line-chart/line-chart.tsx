import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LineChartInput } from '../../../types/types';

export const LineChart = (props: { lineChartInput: LineChartInput }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: props.lineChartInput?.chartTitle,
      },
    },
  };

  const data = {
    labels: props.lineChartInput.labels,
    datasets: props.lineChartInput.datasets,
  };

  return <Line options={options} data={data} style={{ padding: 10 }} />;
};
