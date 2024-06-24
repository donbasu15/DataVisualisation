export const YTicks = ({yScale,innerWidth})=>{
    return(
      yScale.ticks().map((tickValue)=>(
        <g transform={`translate(${yScale(tickValue)},-30)`}>
          <line transform='translate(0,30)' className='barchartline' x2={0} x1={0} y1={0} y2={innerWidth}/>
          <text transform='rotate(90)'>{tickValue}</text>
         </g>
      ))
    )
  }