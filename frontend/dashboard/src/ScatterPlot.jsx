import { useEffect, useState } from 'react'
import {json,scaleLinear,max} from 'd3'
import { YLabel } from './Components/Scatter/Ylabel'
import { XLabel } from './Components/Scatter/Xlabel'
import { YTicks } from './Components/Scatter/Yticks'
import { XTicks } from './Components/Scatter/XTicks'
import ReactDropdown from 'react-dropdown'
import { options } from './Components/Scatter/options'

const height = 400
const width = 500
const initialXAttribute = 'intensity'
const initialYAttribute = 'relevance'
const margin = {top:50,bottom:100,left:100,right:50}
const innerHeight = height-margin.top-margin.bottom;
const innerWidth = width-margin.left-margin.right;


const getLabel=(value)=>{
    for(let v of options){
      if(v.value ===value){
         return v.label;
      }
    }
    return '';
}

function Bubble({data}) {
  const [xAttribute,setXAttribute] =  useState(initialXAttribute);
  const [yAttribute,setYAttribute] =  useState(initialYAttribute);
  const xLabel = getLabel(xAttribute);
  const yLabel = getLabel(yAttribute);
  const onSelectedValueChangeX = (event)=>{
      setXAttribute(event.value)
  }
  const onSelectedValueChangeY = (event)=>{
    setYAttribute(event.value)
  }
  const xValue = d => d[xAttribute];//impact, intensity, likelihood
  const yValue = d => d[yAttribute];
  const xScale = scaleLinear()
       .domain([0,max(data,xValue)])
       .range([0,innerWidth])
       .nice()
  const yScale = scaleLinear()
       .domain([0,max(data,yValue)])
       .range([innerHeight,0])
       .nice()
  
  return (
    <div className='scaterPlot'>
      <div className='menu-container'>
       <span className='dropdown-label'>X</span>
       <ReactDropdown className='reactdropdown' options={options} value={xAttribute} onChange={onSelectedValueChangeX}/>
       <span className='dropdown-label'>Y</span>
       <ReactDropdown className='reactdropdown' options={options} value={yAttribute} onChange={onSelectedValueChangeY}/>
       </div>
       <svg height={height} width={width}>
          <g transform={`translate(${margin.left},${margin.top})`}>
                <YLabel innerHeight={innerHeight} yLabel={yLabel}/>
                <XLabel innerHeight={innerHeight} innerWidth={innerWidth} xLabel={xLabel}/>
                <YTicks yScale={yScale} innerWidth={innerWidth}/>
                <XTicks xScale={xScale} innerHeight={innerHeight}/>
                {data.map((d)=>(!xValue(d) || !yValue(d))?'':(<circle key={d._id} cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={5}><title>{xValue(d)},{yValue(d)}</title></circle>))}
           </g>
       </svg>
    </div>
  )
}

export default Bubble
