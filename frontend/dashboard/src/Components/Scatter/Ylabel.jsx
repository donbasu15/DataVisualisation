export const YLabel = ({innerHeight,yLabel})=>{
    return(
      <g transform={`translate(-50,${innerHeight/2}) rotate(-90)`}>
           <text textAnchor='middle'>{yLabel}</text>
      </g>
    )
}