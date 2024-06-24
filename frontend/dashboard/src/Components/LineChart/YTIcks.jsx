export const YTicks = ({margin,yScale,innerWidth}) =>{
    return(
     yScale.ticks().map((o)=>(
        <g>
           <line key={o+234} y1={margin.top+yScale(o)} y2={margin.top+yScale(o)} x1={0+margin.left} x2={innerWidth+margin.left}/>
           (<text textAnchor="middle" key={o+2342} transform={`translate(${margin.left-20},${margin.top+yScale(o)+4})`} >{o}</text>:'')
        </g>
       ))
    )
}