import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// );

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  // Scale,
  
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Score',
    },
    tooltip: {
      // enabled: false,
      intersect:false,
    }
  },
};

type Props = {
  score:number[]
}

export const UserShowOverviewScore:React.FC<Props> = (Props) => {
  const data = {
    // x 軸のラベル
    labels: ["10", "20", "30", "40", "50", "60","70","80","90","100"],
    datasets: [
      {
        label: 'Score',
        // データの値
        // data: [65, 59, 80, 81, 56, 55, 40,55,100,902],
        data: Props.score,

        // グラフの背景色
        backgroundColor: [
          'rgba(255, 0, 0, 0.8)',
          'rgba(255, 82, 0, 0.8)',
          'rgba(255, 177, 0, 0.8)',
          'rgba(255, 235, 0, 0.8)',
          'rgba(180, 255, 0, 0.8)',
          'rgba(16, 255, 0, 0.8)',
          'rgba(0, 255, 184, 0.8)',
          'rgba(0, 161, 255, 0.8)',
          'rgba(0, 55, 255, 0.8)',
          'rgba(255, 0, 235, 0.8)',

        ],
        // グラフの枠線の色
        borderColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(255, 82, 0, 1)',
          'rgba(255, 177, 0, 1)',
          'rgba(255, 235, 0, 1)',
          'rgba(180, 255, 0, 1)',
          'rgba(16, 255, 0, 1)',
          'rgba(0, 255, 184, 1)',
          'rgba(0, 161, 255, 1)',
          'rgba(0, 55, 255, 1)',
          'rgba(255, 0, 235, 1)',
        ],
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };
  return(
    <>
      <Bar data={data}
        options={options}
        />
    </>
  )
}