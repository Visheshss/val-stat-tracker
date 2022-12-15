import React, { Component, useState } from 'react';

import { Chart as ChartJS, LineElement, TimeScale, LinearScale, PointElement, Tooltip, Legend} from "chart.js/auto";
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels'

ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale, 
  PointElement, 
  Tooltip, 
  Legend
)

export const Chart = ({mmrData}) => {

  var mmrData = Array.from(mmrData)

  const options = {
    plugins: {
      legend: {
        labels: {
            color: "white"
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit:'day'
        },
        ticks: {
          color: "white",
          source: 'auto'
        },
        distribution: 'series'
      },
      y: {
        ticks: {
          color: "white"
        }
      }
    }
  }

  const data =  {
      labels: mmrData.map((data) => data['date']),
      datasets: [
        {
          label: "MMR",
          data: mmrData.map((data) => data['elo']),
          backgroundColor: ["Red"],
          borderColor: "Black",
          borderWidth: 2,
        }
      ],
  }

  return (
      <>
          <div id='chart'>   
            <Line data={data} options={options}/>
          </div>
      </>
  )
}


        