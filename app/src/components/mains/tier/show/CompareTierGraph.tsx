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
  // userTier:number
}

export const CompareTierGraph:React.FC<Props> = function CompareTierGraphFunc(Props){
  const data = {
    // x 軸のラベル
    labels: ["E", "D", "C", "B", "A", "S"],
    datasets: [
      {
        label: 'Score',
        // データの値
        // data: [65, 59, 80, 81, 56, 55, 40,55,100,902],
        data: Props.score,

        // グラフの背景色
        backgroundColor: [
          'rgba(26, 37, 47, 0.8)',
          'rgba(255, 106, 0, 0.8)',
          'rgba(0, 198, 152, 0.8)',
          'rgba(0, 173, 255, 0.8)',
          'rgba(110, 0, 255, 0.8)',
          'rgba(255, 48, 115, 0.8)',

        ],
        // グラフの枠線の色
        borderColor: [
          'rgba(26, 37, 47, 1)',
          'rgba(255, 106, 0, 1)',
          'rgba(0, 198, 152, 1)',
          'rgba(0, 173, 255, 1)',
          'rgba(110, 0, 255, 1)',
          'rgba(255, 48, 115, 1)',
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