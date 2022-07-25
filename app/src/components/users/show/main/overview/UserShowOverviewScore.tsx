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

export const UserShowOverviewScore:React.FC<Props> = function UserShowOverviewScoreFunc(Props){
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
          'rgba(246, 61, 32, 0.8)',
          'rgba(255, 106, 0, 0.8)',
          'rgba(255, 165, 0, 0.8)',
          'rgba(138, 212, 43, 0.8)',
          'rgba(0, 198, 152, 0.8)',
          'rgba(0, 173, 255, 0.8)',
          'rgba(0, 102, 255, 0.8)',
          'rgba(110, 0, 255, 0.8)',
          'rgba(239, 0, 255, 0.8)',
          'rgba(255, 48, 115, 0.8)',

        ],
        // グラフの枠線の色
        borderColor: [
          'rgb(246 61 32)',
          'rgb(255 106 0)',
          'rgb(255 165 0)',
          'rgb(138 212 43)',
          'rgb(0 198 152)',
          'rgb(0 173 255)',
          'rgb(0 102 255)',
          'rgb(110 0 255)',
          'rgb(239 0 255)',
          'rgb(255 48 115)',
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