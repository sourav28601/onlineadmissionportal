const CourseModel = require('../models/Course')
const UserModel = require('../models/User')


class CourseController{
    static admission = async(req,res) =>{
        const{name,email}=req.user
        res.render('course/admission',{n:name,e:email})
    }
    static mtech = async(req,res) =>{
        const{name,email}=req.user
        res.render('course/mtechform',{n:name,e:email})
    }
    static mca = async(req,res) =>{
        const{name,email}=req.user
        res.render('course/mcaform',{n:name,e:email})
    }
    static mba = async(req,res) =>{
        const{name,email}=req.user
        res.render('course/mbaform',{n:name,e:email})
    }
    static courseinsert = async(req,res)=>{
            try{
                const{name,email,mobile,qualification,college,branch,course,address,gender,image}=req.body
                const result = new CourseModel({
                    name:name,
                    email:email,
                    mobile:mobile,
                    qualification:qualification,
                    college:college,
                    branch:branch,
                    course:course,
                    address:address,
                    gender:gender,
                    image:req.file.filename,
                    user:req.user.id
                })
                //saving data
                await result.save()
                res.redirect('/coursedisplay') //route ka url jispe apko puchna h use
            }catch(err){
                console.log(err)
            }    
        }
        static coursedisplay = async(req,res) =>{ 
            try{
                const{_id} = req.user
                const result = await CourseModel.find({user: _id})
                const{name,email}=req.user             
                //console.log(result)
                res.render('course/coursedisplay',{data:result,n:name,e:email})    // data ko display page   
            }catch(err){
                console.log(err)
            }
        }
        static courseview = async(req,res) =>{
            // console.log(req.params.id)
            try{
                const{name,email}=req.user
                const result = await CourseModel.findById(req.params.id)
                // console.log(result)
                res.render('course/courseview',{data:result,n:name,e:email,})
            }catch(err) 
            {
                console.log(err)
            }
        }
        static courseedit = async(req,res) =>{
            // console.log(req.params.id)
            try{
                const{name,email}=req.user
                const result = await CourseModel.findById(req.params.id)
                // console.log(result)
                res.render('course/courseedit',{n:name,e:email,data:result})
            }catch(err) 
            {
                console.log(err)
            }
        }
        static courseupdate = async(req,res)=>{
            // console.log(req.params.id)
            // console.log(req.body)
            try{
                if(req.file){
                    var imagefile = req.file.filename
                }
                // const{name,email}=req.user
                const result = await CourseModel.findByIdAndUpdate(req.params.id,{
                    name:req.body.name,
                    email:req.body.email,
                    mobile:req.body.mobile,
                    image:imagefile,
                    qualification:req.body.qualification,
                    college:req.body.college,
                    branch:req.body.branch,
                    course:req.body.course,
                    address:req.body.address,
                    gender:req.body.gender,
                }) 
                // console.log(result)
                res.redirect('/coursedisplay');
            }catch(err) 
            {
             console.log(err)
            }
        }
   
}


module.exports = CourseController;
