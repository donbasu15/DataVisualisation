import React, {useState, useEffect}from "react";
import { json,csv,geoNaturalEarth1,geoPath,geoGraticule } from "d3";

import {feature,mesh} from 'topojson-client'
const countriesUrl = 'https://gist.githubusercontent.com/ofou/df09a6834a8421b4f376c875194915c9/raw/country-capital-lat-long-population.csv'
const mapUrl ='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'
const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const height = 500;
const width = 1000;
const getLatLan = (country,countries)=>{
    for(let c of countries){
        if(c.Country === country){
            return projection([c.Longitude,c.Latitude])
        }
    }
    
}
const Map =({countriesCount})=>{
  const [mapData,setMapData] = useState(null);
  const [countries,setCountries] = useState(null)
  console.log(countries)
  console.log(countriesCount);
  const raw = d => {
    d.Latitude = +d.Latitude;
    d.Longitude = +d.Longitude;
    return d;
  }
  useEffect(()=>{
    
    json(mapUrl).then(topodata => {
        let {countries} = topodata.objects;
        setMapData({
            countries: feature(topodata,countries),
            interiors: mesh(topodata,countries,(a,b) => a!==b)
    })
    });
    csv(countriesUrl,raw).then(setCountries);
  },[])
  if(!mapData || !countries){
    return (
        <></>
    )
  }
  
  return(
    <div  className="worldMap">
    <h3>Country Wise Object Count</h3>
    <svg height={height} width={width} transform={`translate(20,0)`}>
         
         <g > 
               <path className="mapSphere" d={path({type: 'Sphere'})}/>
               <path className="mapInteriors" d={path(mapData.interiors)}/>
               <path className="mapGraticule" d={path(graticule())}/>
                {mapData.countries.features.map(feature=>(
                   <path className="mapPath" d={path(feature)}/>
                ))}
                {Object.keys(countriesCount).map((c)=>{
                    const ll = getLatLan(c,countries);
                    console.log(ll);
                    if(ll && ll.length) return <circle cx={ll[0]} cy={ll[1]} r={countriesCount[c]>80?0.3*countriesCount[c]:countriesCount[c]>10?0.7*countriesCount[c]:countriesCount[c]<=3?countriesCount[c]*2.5:1.2*countriesCount[c]} className="mapCircle"><title>{c},{countriesCount[c]}</title></circle>
                })}
            
                
                 
         </g>
    </svg>
    </div>
     
  )
}

export default Map;