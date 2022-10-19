const UserModel = require('../models/User')
const CourseModel = require('../models/Course')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController{
    static login =async(req,res)=>{
        res.render('user/login',{message:req.flash('error')});
    }
    static register =async(req,res)=>{
        res.render('user/register',{message:req.flash('error')});
    }
    static registerinsert = async(req,res)=>{
        // console.log(req.body);
        const{name,email,password,confirmpassword}=req.body
        const user = await UserModel.findOne({email:email})
        if(user){
            req.flash('error','this email is already registered')
            return res.redirect('/register')
        }else{
            if(name && email  && password && confirmpassword){
                if(password === confirmpassword){
                    try{
                        const salt = await bcrypt.genSalt(10)
                        const hashpassword =await bcrypt.hash(password,salt)
                        const result = new UserModel({
                            name:name,
                            email:email,
                            password:hashpassword,
                        })
                        await result.save()
                        req.flash('error','Registration Successfully')
                    return res.redirect('/')
                    }catch(err){
                        console.log(err);
                    }
                }else{
                    req.flash('error','password and confirm password does not match')
                    return res.redirect('/register')
                }

            }else{
                req.flash('error','all field are required')
                return res.redirect('/register')
            }
        }
    }

    static verifylogin = async(req,res)=>{   console.log(req.body);
        // res.render('user/registration')
        try{
            const{email,password}=req.body
            const User = await UserModel.findOne({email:email})
            //console.log(User)
            if(User!=null){
                const isMatch = await bcrypt.compare(password,User.password)
                if((User.email==email)&& isMatch){
                    // generate token
                    const token = jwt.sign({userid:User._id}, 'souravrjitgwalior');
                    // console.log(token);
                    res.cookie('jwt',token)
                    if(User.role=='student'){
                        //console.log(User.role)
                       return res.redirect('home');
                    }
                    else if(User.role=='admin'){
                        return res.redirect('/admin/dashboard');
                    }
                    else{
                       return res.redirect('/')
                    }
                }else{
                    req.flash('error','email and password does not match')
                    res.redirect('/')
                }
            }else{
                req.flash('error','you are not registered user')
                res.redirect('/')
            }

        }catch(err){
            console.log(err);
        }
    }
    static logout = async(req,res)=>{
        try{
            res.clearCookie('jwt')
            res.redirect('/')
        }catch(err){
            console.log(err);
        }
    }

    static home =async(req,res)=>{   
        const{name,email,_id}=req.user
        const btech = await CourseModel.findOne({user:_id,course:'BTECH'})
        const mtech = await CourseModel.findOne({user:_id,course:'MTECH'})
        const mca = await CourseModel.findOne({user:_id,course:'MCA'})
        const mba = await CourseModel.findOne({user:_id,course:'MBA'})
        // console.log(btech);
        // res.render('home',{n:name,e:email,b:btech,m:mca,b:bca,mt:mtech});
        res.render('home',{n:name,e:email,b:btech,mt:mtech,m:mca,mb:mba});
        
    }
    static about =async(req,res)=>{
        const{name,email}=req.user
        res.render('about',{n:name,e:email});
    }
    static contact =async(req,res)=>{
        const{name,email}=req.user
        res.render('contact',{n:name,e:email});
    }
  
}


module.exports = UserController;
