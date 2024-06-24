export const XLabel = ({innerWidth})=>{
    return(
      <g transform={`rotate(90) translate(${innerWidth/2},95)`}>
         <text style={{fontSize:'large'}} textAnchor='middle'>Categories</text>
      </g>
    )
}