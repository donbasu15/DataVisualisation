import Map from './Map.jsx'
import Bar from './BarChart.jsx'
import Bubble from './ScatterPlot.jsx'
import {LineChart} from './LineChart.jsx'
import React from 'react'
import { useState,useEffect } from 'react'
import { json } from 'd3'
import { dataSet } from './Components/LineChart/LineChartData.js'
import './App.css'
const url ='http://localhost:8000/getadmindata'
const countryParse = (data,cob) =>{
      data.map((d)=>{
            if(d['country']){
               if(cob[d['country']]){
                cob[d['country']] +=1;
               }else{
                cob[d['country']] =+1;
               }
            }
      })
      
}
const AdminApp = ()=>{
    const [data,setData] =useState(null);
    const [barOptions,setBarOptions] = useState([]);
    const [map,setMap] = useState(null);
    const [countriesCount,setCountriesCount] = useState({});
    let o={}
    let cob={}
    let d = [{value:'',label:'All'}];
    useEffect(()=>{
      if(data)dataSet(data,o,'start_year');
      if(data)countryParse(data,cob);
      for(let yr of Object.keys(o)){
         d.push(yr);
      }
      setBarOptions(d);
      setCountriesCount(cob);
    },[data])
    
    useEffect(()=>{
        json(url).then(setData);
        
    },[])
    if(!data){
        return(
           <></>
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
             <div className='mapWrap'>
               
               <Map countriesCount={countriesCount}/>
             </div>
             
       </>
    )
}
export default AdminApp;