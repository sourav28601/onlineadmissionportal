const CourseModel = require('../../models/Course')
const UserModel = require('../../models/User')

class AdminController{
    
    static dashboard = async(req,res)=>{
        try{
            const result = await CourseModel.find()
            const{name,email}=req.user             
            // console.log(result)
            res.render('admin/dashboard',{data:result,n:name,e:email})    // data ko display page   
        }catch(err){
            console.log(err)
        }
      
    }

}
module.exports = AdminController