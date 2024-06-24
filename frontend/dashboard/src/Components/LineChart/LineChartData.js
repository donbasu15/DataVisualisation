export const  dataSet=(data,ob,y)=>{
    data.map((d)=>{
       if(d[y]){
          if(!ob[`${d[y]}`]) ob[`${d[y]}`]=+1;
          else ob[`${d[y]}`]+=1;
       }  
   })
}