export const XTicks = ({xScale,margin,innerHeight})=>{
    return(
       xScale.ticks().map((o)=>(
          <g>
             <line key={o+234} x1={margin.left+xScale(o)} x2={margin.left+xScale(o)} y1={0+margin.top} y2={innerHeight+margin.top} />
             (<text textAnchor="middle" key={o+2342} transform={`translate(${margin.left+xScale(o)},${innerHeight+margin.top+40})`} >{o}</text>:'')
          </g>
          ))
    )
 }