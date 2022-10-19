const mongoose = require('mongoose')


// Schema or Fields
const UserSchema = new mongoose.Schema({          //object
    name:{
        type:String,
        Required:true,  
    },
    email:{
        type:String,
        Required:true,  
    },
    password:{
    
        type:String,
        Required:true,
    },
    role:{
        type:String,
        default:'student'
    }
},{timestamps:true})

//create model

const UserModel = mongoose.model('user',UserSchema); 

module.exports = UserModel

