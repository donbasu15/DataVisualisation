let parseBarData = (data,ob,year)=>{
    const cat = 'pestle'
    data.map((d)=>{
        let o = d[cat]
    if(year===''){
        if(o===null){
          if(!ob['Others']) ob['Others'] = +1;
          else ob['Others'] +=1;
        }
        else if(!ob[o]) ob[o] = +1;
        else ob[o] +=1;
      }else{
        if(`${d['start_year']}`===year){
          if(o===null){
            if(!ob['Others']) ob['Others'] = +1;
            else ob['Others'] +=1;
          }
          else if(!ob[o]) ob[o] = +1;
          else ob[o] +=1;
        }
      }
    })
  }

export default parseBarData;