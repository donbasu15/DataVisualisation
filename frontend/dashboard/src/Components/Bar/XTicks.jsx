export const XTicks = ({xScale})=>{
    return(
      xScale.domain().map((d)=>(
        <g className='pestle'  id={d} transform={`translate(-15,${xScale(d)+15})`}>
          <text transform='rotate(144)'>{d}</text>
          
        </g>
      ))
    )
  }