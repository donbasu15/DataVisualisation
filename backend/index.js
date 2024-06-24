const mongoose = require('mongoose');
const app = require('express')();
const cors = require('cors');
const ArticleData = require('./model.js')
const main = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/articledata')
}
app.use(cors());


main()
   .then(console.log("Connected to Database!!!"))
   .catch((err)=>{
       console.log(err);
})



const getData = async ()=>{
   return await ArticleData.find({})
}


app.get("/getdata",async (req,res)=>{
    let data=await getData();
    res.json(data);
})
app.listen(8000,()=>{
    console.log('http://localhost:8000/')
})
