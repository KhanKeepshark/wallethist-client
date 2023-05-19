import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Context } from '../../../main'
import { observer } from 'mobx-react-lite';

ChartJS.register(ArcElement, Tooltip, Legend);


export const PieChart = observer(({records}) => {
    const {navState} = useContext(Context)

    const categoryAndMoney = {}
    records.map(e => {
      if (Object.keys(categoryAndMoney).includes(e.category)) {
        const sum = categoryAndMoney[e.category] + e.money
        return categoryAndMoney[e.category] = sum
      }
      categoryAndMoney[e.category] = e.money
    })

    const data = {
        labels: Object.keys(categoryAndMoney),
        datasets: [
          {
            data: Object.values(categoryAndMoney),
            backgroundColor: [
              navState.purpleColor,
              '#ff69b4',
              '#3a86ff',
              '#4cc9f0',
              '#ff006e',
            ],
            borderColor: [
              navState.purpleColor,
              '#ff69b4',
              '#3a86ff',
              '#4cc9f0',
              '#ff006e',
            ],
            borderWidth: 1,
          },
        ],
    };
      
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
        legend: {
            display: true,
            labels: {
                color: navState.textColor
            }
        },
        title: {
            display: true,
            text: 'Доля категорий',
            font: {
            size: 15
            },
            color: navState.textColor,
        },
        },
    };

  return <Pie data={data} options={options} />;
})
