import parseBarData from './Components/Bar/BarData';
import { useEffect, useState } from 'react'
import ReactDropdown from 'react-dropdown';
import {json,scaleLinear,extent,max, line,min, scaleBand} from 'd3'
import {XLabel} from './Components/Bar/XLabel'
import {YLabel} from './Components/Bar/YLabel'
import {XTicks} from './Components/Bar/XTicks'
import {YTicks} from './Components/Bar/YTicks'

const width = 500;
const height = 400;
const category = 'pestle'
const margin ={top:10,bottom:150,left:60,right:10};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
let yearOptions = []

function Bar({data,yearOptions}) {
  const [year,setYear] =useState('');
 
  let ob={};
 
  parseBarData(data,ob,year);
  const yScale = scaleLinear()
       .domain([0,max(Object.values(ob))])
       .range([0,innerHeight])
       .nice()
  const xScale = scaleBand()
       .domain(Object.keys(ob))
       .range([0,innerWidth])
  const changeYear = (event)=>{
     setYear(event.value)
  }
  return (
    <div className='barchart'>
      <div className='menu-container'>
           <ReactDropdown options={yearOptions} value={year} onChange={changeYear} placeholder='All'/>
      </div>
       <svg height={width} width={height} transform={`rotate(-90) translate(0,50)`}>
           <g transform={`translate(${margin.bottom},${margin.left})`}>
                <XLabel innerWidth={innerWidth}/>
                <YLabel/>
                <XTicks xScale={xScale}/>
                <YTicks yScale={yScale} innerWidth={innerWidth}/>
                {Object.keys(ob).map((d,index)=>(<rect fill='#137B80' key={d} x={0} height={xScale.bandwidth()} width={yScale(ob[d])} y={xScale.bandwidth()*index}>,<title>{d},{ob[d]}</title></rect>))}
           </g>
       </svg>
    </div>
  )
}


export default Bar