const mongoose = require('mongoose')


// Schema or Fields
const CourseSchema = new mongoose.Schema({          //object
    name:{
        type:String,
        Required:true,  
    },
    email:{
        type:String,
        Required:true,
    },
    mobile:{
        type:String,
        Required:true,
    },
    course:{
        type:String,
        Required:true,
    },
    qualification:{
        type:String,
        Required:true,
    },
    college:{
        type:String,
        Required:true,
    },
    branch:{
        type:String,
        Required:true,  
    },
    semester:{
        type:String,
        Required:true,
    },
    image:{
        type:String,
        Required:true,
    },
    address:{
        type:String,
        Required:true,
    },
    gender:{
        type:String,
        Required:true,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
 
},{timestamps:true})

//create model

const CourseModel = mongoose.model('course',CourseSchema); 

module.exports = CourseModel


