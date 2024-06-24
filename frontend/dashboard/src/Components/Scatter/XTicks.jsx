export const XTicks = ({xScale,innerHeight})=>{
    return(
      xScale.ticks().map((tickValue)=>(
        <>
            <line key={tickValue+10} y1={0} x1={xScale(tickValue)} x2={xScale(tickValue)} y2={innerHeight} stroke='black'/>
            <text key={tickValue+100} x={xScale(tickValue)} dy='0.91em' y={innerHeight} style={{textAnchor:'middle'}}>{tickValue}</text>
        </>
      ))
    )
  }