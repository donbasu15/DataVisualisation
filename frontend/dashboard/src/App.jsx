import Bar from './BarChart.jsx'
import Bubble from './ScatterPlot.jsx'
import {LineChart} from './LineChart.jsx'
import React from 'react'
import { useState,useEffect } from 'react'
import { json } from 'd3'
import { dataSet } from './Components/LineChart/LineChartData.js'
import './App.css'
const url ='http://localhost:8000/getdata'
const App = ()=>{
    const [data,setData] =useState(null);
    const [barOptions,setBarOptions] = useState([]);
    let o={}
    let d = [{value:'',label:'All'}];
    useEffect(()=>{
      if(data)dataSet(data,o,'start_year');
      for(let yr of Object.keys(o)){
         d.push(yr);
      }
      setBarOptions(d);
    },[data])
    useEffect(()=>{
        json(url).then(setData);
        
    },[])
    if(!data){
        return(
           <>Loading...</>
        )
    }
   
    return(
        <>
             <div className='wrapper' style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around', alignItems:'center'}}>
               <Bubble data={data}/>
               <Bar data={data} yearOptions={barOptions}/>
             </div>
             <div className='linechart-wrapper'>
               <LineChart data={data}/>
             </div>
       </>
    )
}
export default App;