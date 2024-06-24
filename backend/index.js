const mongoose = require('mongoose');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({});
const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const ArticleData = require('./model.js')
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./usermodel.js');
const path = require('path');
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const main = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/articledata')
}
app.use(
    cors()
  );
app.use(bodyParser.json())

main()
   .then(console.log("Connected to Database!!!"))
   .catch((err)=>{
       console.log(err);
})



const getData = async ()=>{
   return await ArticleData.find({})
}

const isLoggedIn = (req,res,next)=>{
    const isLoggedIn = (req, res, next) => {
        try {
            let token = req.cookies.usertoken;
            if (!token) {
                return res.status(401).redirect('http://localhost:5137/login');
            }
            next(); // Proceed to the next middleware
        } catch (err) {
            return res.status(500).redirect('http://localhost:5137/login');
        }
    };
}

const isAdmin = async (req,res,next) =>{
    try {
        let token = req.cookies.usertoken;
        console.log(token);
        if (!token) {
            return res.status(401).redirect('http://localhost:5137/login');
        }

        let decoded = jwt.verify(token, 'secretkeyhere');
        let userId = decoded.userId;

        const user = await User.findOne({ _id: userId });
        if (!user || !user.admin) {
            return res.status(403).redirect('http://localhost:5137/login');
        }

        next(); // Proceed to the route handler
    } catch (err) {
        return res.status(500).redirect('http://localhost:5137/login');
    }
}

app.get("/getadmindata",async (req,res)=>{
    

    let data=await getData();

    res.json(data);

})
app.post('/signup',async(req,res)=>{
    try{
        let {username,password,admin} = req.body;
        let hashedPass = bcrypt.hashSync(password,10);
        let newUser = await User.insertMany({username:username,password:hashedPass,admin:admin});
        res.send(newUser);
    }catch(err){
        res.send(err);
    }
})
app.post("/login",async(req,res)=>{
     try{
          let {username:username,password:password} = req.body;
         
          let user = await User.findOne({username:username});
          console.log(user);
          if(!user){
             return res.json({message:'user not found'})
          }
          if(!bcrypt.compareSync(password,user.password)){
            return res.json({message: 'wrong password'});
          }
          let token = jwt.sign({
              userId: user._id
          },'secretkeyhere',{expiresIn: '1h'});
            
          res.cookie('usertoken',token);
          if(user.admin) return res.send({ redirect: true, url: '/admindashboard' });    
          else return res.send({redirect:true, url:'/userdashboard'})
      
     }catch(err){
        res.send({message:`${err}`});
     }
})
app.post('/signout',(req,res)=>{
    res.cookie('usertoken',"");
    res.send('signed out');
})
app.listen(8000,()=>{
    console.log('http://localhost:8000/')
})
