const mongoose = require('mongoose');
const main = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/articledata')
}

main()
   .then(console.log("Connected to Database!!!"))
   .catch((err)=>{
       console.log(err);
   })

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        required: true,
        default:false
    }

})

module.exports = mongoose.model('User',userSchema);