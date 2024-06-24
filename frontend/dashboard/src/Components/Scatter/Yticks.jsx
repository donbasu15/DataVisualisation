export const YTicks = ({yScale,innerWidth})=>{
    return(
      yScale.ticks().map((tickValue)=>(
        <>
          <line key={tickValue} x1={0} y1={yScale(tickValue)} y2={yScale(tickValue)} x2={innerWidth} stroke='black'/>
          <text key={tickValue+1000} y={yScale(tickValue)} dx='-2em' dy='0.3em' style={{textAnchor:'middle'}}>{tickValue}</text>
        </>
      ))
    )
  }