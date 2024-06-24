const mongoose = require('mongoose');
const fs = require('fs');
const main = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/articledata')
}

main()
   .then(console.log("Connected to Database!!!"))
   .catch((err)=>{
       console.log(err);
   })

const articleSchema = new mongoose.Schema({
       end_year:{
           type: Number,
           default:0
       },
       intensity:{
         type:Number,
         default:0
       },
       sector:{
         type:String,
         set: (v)=>v===''?v=null:v=v
       },
       topic:{
         type:String,
         set: (v)=>v===''?v=null:v=v
       },
       insight:{
          type:String,
          set: (v)=>v===''?v=null:v=v
       },
       url:{
         type:String,
         set: (v)=>v===''?v=null:v=v
         
       },
       region:{
         type:String,
         set: (v)=>v===''?v=null:v=v
       },
       start_year:{
         type:Number,
         default:0
       },
       impact:{
         type:Number,
         default:0
       },
       added:{
         type: String,
         set: (v)=>v===''?v=null:v=v
       },
       published:{
         type: String,
         set: (v)=>v===''?v=null:v=v
       },
       country:{
        type:String,
        set: (v)=>v===''?v=null:v=v
       },
       relevance:{
        type:Number,
        default:0
      },
       pestle:{
        type:String,
        set: (v)=>v===''?v=null:v=v
       },
       source:{
        type:String,
        set: (v)=>v===''?v=null:v=v
      },
       title:{
        type:String,
        set: (v)=>v===''?v=null:v=v
      },
       likelihood:{
        type:Number,
        default:0
      }
});

module.exports = mongoose.model("ArticleData",articleSchema);

