import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';
import { useAuth } from '../../../contexts/AuthContext';
import API from '../../../axios';


const LineChart = (prop) => {
    const {currentUser} = useAuth() ;

    // const chartData = [
    //     ['Day', 'Sales'],
    //     ['2018', 1000],
    //     ['2019', 1170],
    //     ['2020', 660],
    //     ['2021', 1030],
    //   ];
    const [chartData,setChartData]=useState([]);
      const options = {
        title: prop.type,
        // curveType: 'function',
        legend: { position: 'bottom' },
      };
      useEffect(()=>{
        const fetchData=async()=>{
            const resp=await API.post("/restaurant/getDailyTotal",{rid:currentUser._id})
            // console.log(resp.data)
            setChartData(resp.data.bills);
        }
        fetchData()

      },[])
  return (
    <Chart
    chartType="LineChart"
    width="1000px"
    height="700px"
    data={chartData}
    options={options}
  />
  )
}

export default LineChart