import React, {useEffect, useState} from 'react'
import Chart from "react-apexcharts";

import './App.css'
import {dataSet} from './dataSet.js'

function App() {
  useEffect(() => {
    getData()
  }, [])

  const [option, setoption] = useState({})
  const [series, setSeries] = useState([])

  const getData = () => {
    const max = new Date().getFullYear()
    const min = max - (max - 2012)
    const newYear = []
  
    for (let j = min; j <= max; j++) {
     newYear.push(j.toString())
    }

    const arr = [].concat(newYear, dataSet)
    arr.sort()
    let chartData = {year: [], total: []}

    let current = null;
    let cnt = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== current) {
            if (cnt > 0) {
              chartData.year.push(current)
              chartData.total.push(cnt - 1)
            }
            current = arr[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
      chartData.year.push(current)
      chartData.total.push(cnt - 1)
    }
    setoption({
      chart: {
        id: "basic-bar",
        foreColor: '#373d3f'
      },
      xaxis: {
        categories: chartData.year
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#5eaaa8", "#a3d2ca"],
    })
    setSeries([
      {
        name: "series-1",
        data: chartData.total
      }
    ])
    console.log(chartData)
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Jumlah Kedatangan Mahasiswa Indonesia di Sakarya</h1>
        <div className="Content">
          <Chart
            options={option}
            series={series}
            type="area"
            width="400"
          />   
        </div>
      </div>
    </div>
  );
}

export default App;
