"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  accounts: number[]; 
}

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: 'Bankques',
        data: ['1250000', '2500000', '3750000'
        ],
        backgroundColor: ['#FFD700', '#FFB800', '#FFCC00'],


      },
    ],
    labels: ['Banque 1', 'Banque 2', 'Banque 3'],
  };

  return <Doughnut 
  data={data} 
  options= {{
    cutout: '60%',
    plugins:{
        legend:{
            display: false
        }
    }
   
  }}
  />;
};

export default DoughnutChart;
