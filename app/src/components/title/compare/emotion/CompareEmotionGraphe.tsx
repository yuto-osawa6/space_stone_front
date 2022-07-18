import { Pie } from "react-chartjs-2";

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
  ArcElement,
  // Scale,
  
} from 'chart.js';

ChartJS.register(
  ArcElement,
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
      text: 'Emotion',
    },
    tooltip: {
      // enabled: false,
      intersect:false,
    }
  },
};

type Props = {
  label:string[]
  value:number[]
}

export const CompareEmotionGraphe:React.FC<Props> = function UserShowOverviewScoreFunc(Props){
  const data = {
    // x 軸のラベル
    labels: Props.label,
    datasets: [
      {
        label: 'Emotion',
        // データの値
        // data: [65, 59, 80, 81, 56, 55, 40,55,100,902],
        data: Props.value,

        // グラフの背景色
        backgroundColor: [
          // 'rgba(255, 0, 0, 0.8)',
          // 'rgba(255, 82, 0, 0.8)',
          // 'rgba(255, 177, 0, 0.8)',
          // 'rgba(255, 235, 0, 0.8)',
          // 'rgba(180, 255, 0, 0.8)',
          // 'rgba(16, 255, 0, 0.8)',
          // 'rgba(0, 255, 184, 0.8)',
          // 'rgba(0, 161, 255, 0.8)',
          // 'rgba(0, 55, 255, 0.8)',
          // 'rgba(255, 0, 235, 0.8)',
          'rgba(255, 48, 115, 0.8)',
          'rgba(239, 0, 255, 0.8)',
          'rgba(110, 0, 255, 0.8)',
          'rgba(0, 102, 255, 0.8)',
          'rgba(0, 173, 255, 0.8)',
          'rgba(0, 198, 152, 0.8)',
          'rgba(138, 212, 43, 0.8)',
          'rgba(255, 165, 0, 0.8)',
          'rgba(255, 106, 0, 0.8)',
          'rgba(246, 61, 32, 0.8)',
          'rgba(255, 255, 235, 0.8)',

        ],
        // グラフの枠線の色
        borderColor: [
          // 'rgba(255, 0, 0, 1)',
          // 'rgba(255, 82, 0, 1)',
          // 'rgba(255, 177, 0, 1)',
          // 'rgba(255, 235, 0, 1)',
          // 'rgba(180, 255, 0, 1)',
          // 'rgba(16, 255, 0, 1)',
          // 'rgba(0, 255, 184, 1)',
          // 'rgba(0, 161, 255, 1)',
          // 'rgba(0, 55, 255, 1)',
          // 'rgba(255, 0, 235, 1)',

          'rgb(255 48 115)',
          'rgb(239 0 255)',
          'rgb(110 0 255)',
          'rgb(0 102 255)',
          'rgb(0 173 255)',
          'rgb(0 198 152)',
          'rgb(138 212 43)',
          'rgb(255 165 0)',
          'rgb(255 106 0)',
          'rgb(246 61 32)',
          'rgba(255, 255, 235, 1)',

          
        ],
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };
  return(
    <>
      <Pie data={data}
        options={options}
        />
    </>
  )
}