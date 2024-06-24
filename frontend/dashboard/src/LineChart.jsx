import { scaleTime,scaleLinear,json,max,min,utcFormat,extent,line } from "d3";
import { useState,useEffect } from "react";
import ReactDropdown from "react-dropdown";
import { dataSet } from "./Components/LineChart/LineChartData";
import { options } from "./Components/LineChart/yearOption";
import { XTicks } from "./Components/LineChart/XTicks";
import { YTicks } from "./Components/LineChart/YTIcks";
const width = 1000;
const height = 500;
const margin ={top:75,bottom:170,left:100,right:70};
let yearOptions = [];
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;






const LineChart = ({data})=>{  
    const [y,setY] = useState('start_year');
    let ob={};
    yearOptions = [];
    
    dataSet(data,ob,y);


    const yScale = scaleLinear()
        .domain([min(Object.values(ob)),max(Object.values(ob))])
        .range([innerHeight,0])
        .nice()
    const xScale = scaleLinear()
        .domain(extent(Object.keys(ob)))
        .range([0,innerWidth])
        .nice()
    const changeY = (event)=>{
       setY(event.value)
    }
    return(
        <div className="linechart">
          <div className="menu-container">
              <ReactDropdown options={options} value={'start_year'} onChange={changeY}></ReactDropdown>
          </div>
          <svg height={height} width={width}>
            <g>
             <YTicks margin={margin} innerWidth={innerWidth} yScale={yScale}/>
             <XTicks margin={margin} xScale={xScale} innerHeight={innerHeight} />
              <text transform={`translate(${innerWidth/2+89},${innerHeight+170})`} >Year</text>
              <text transform={`rotate(-90) translate(${-innerHeight+50},50)`} >Objects</text>
              <text transform={`translate(${innerWidth/2+99},${innerHeight+200})`} style={{fontSize:'large', textAnchor:'middle'}}>Objects in a Year</text>
             <g transform={`translate(${margin.left},${margin.top})`}>
                 <path fill="none"
                     stroke="black"
                     d={line()
                       .x(d => xScale(d))
                       .y(d => yScale(ob[d]))(Object.keys(ob))
                 }/>
                  {Object.keys(ob).map((o)=>(<circle cy={yScale(ob[`${o}`])} cx={xScale(o)} r={7} fill="black"><title>{o},{ob[`${o}`]}</title></circle>))}
             </g>
             </g>
          </svg>
          
        </div>
    )
}

export  {LineChart,yearOptions};