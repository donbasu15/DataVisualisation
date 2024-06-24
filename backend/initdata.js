const ArticleData = require("./model.js")
const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

const initData = async ()=>{
    try{
        await ArticleData.deleteMany({});
       await ArticleData.insertMany(articles);
       console.log("Data Initialized");
    }catch(e){
        console.log(e);
    }
}

initData();
