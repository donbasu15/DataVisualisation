export const XLabel = ({innerHeight,innerWidth,xLabel})=>{
    return(
      <g transform={`translate(${innerWidth/2},${innerHeight+35})`}>
              <text textAnchor='middle'>{xLabel}</text>
              <text style={{fontSize:'large'}} textAnchor='middle' y={30}>Property Comparision Graph</text>
       </g>
    )
}