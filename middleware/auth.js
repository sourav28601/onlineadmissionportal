const UserModel = require('../models/User')
const jwt = require('jsonwebtoken');

const CheckUserAuth = async(req,res,next)=>{
    // console.log('hello');
    try{
        const token = req.cookies.jwt;
       
        if(!token){
            res.redirect('/')
        }else{
          
        const verifyuser = jwt.verify(token,'souravrjitgwalior')
        // console.log(verifyuser);
        const user = await UserModel.findOne({_id:verifyuser.userid}) 
        req.user = user
        // console.log(req.user.id);      
        next();
        }  
    }catch(err){
        console.log(err);
    }
   
}

const AuthRole = (roles)=>{
    // console.log(roles)
    return(req,res,next)=>{
        console.log(req.user.role)
        // console.log(roles)
        if(!roles.includes(req.user.role)){
            return res.redirect('/home')
        }
        next()
    }
}



module.exports = {
    CheckUserAuth,
    AuthRole
} 