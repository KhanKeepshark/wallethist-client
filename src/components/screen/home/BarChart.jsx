import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useContext } from 'react'
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = observer(({records}) => {

  const {navState} = useContext(Context)

  const options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        y: {
          ticks: {
            color: navState.textColor
          }
        },
        x: {
          ticks: {
            color: navState.textColor
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        }
      },
  };
  
  const dateAndMoney = {}
  records.map(e => {
    if (Object.keys(dateAndMoney).includes(e.date)) {
      const sum = dateAndMoney[e.date] + e.money
      return dateAndMoney[e.date] = sum
    }
    dateAndMoney[e.date] = e.money
  })
  const labels = []
  Object.keys(dateAndMoney).map(e => labels.push(e.slice(8, 10)))

  const data = {
  labels,
  datasets: [
      {
      data: Object.values(dateAndMoney),
      borderColor: navState.purpleColor,
      backgroundColor: navState.purpleColor,
      }
  ]
  };
    
    return (
      <Line options={options} data={data} width={350}/>
    )
})