const express = require('express')
const UserController = require('../controllers/UserController')
const {CheckUserAuth,AuthRole} = require('../middleware/auth')  
const image_middleware = require('../middleware/image_middleware')
const CourseController = require('../controllers/CourseController')
const AdminController = require('../controllers/admin/AdminController')
const router = express.Router()    // METHOD CREATE 


// UserController Routes
router.get('/',UserController.login)
router.get('/register',UserController.register)
router.post('/registerinsert',UserController.registerinsert)
router.post('/verifylogin',UserController.verifylogin)
router.get('/logout',UserController.logout)

router.get('/home',CheckUserAuth,UserController.home)
router.get('/about',CheckUserAuth,UserController.about)
router.get('/contact',CheckUserAuth,UserController.contact)

// CourseController

router.get('/admissionform',CheckUserAuth,CourseController.admission)
router.get('/mtechform',CheckUserAuth,CourseController.mtech)
router.get('/mcaform',CheckUserAuth,CourseController.mca)
router.get('/mbaform',CheckUserAuth,CourseController.mba)
router.post('/courseinsert',image_middleware,CheckUserAuth,CourseController.courseinsert)
router.get('/coursedisplay',CheckUserAuth,CourseController.coursedisplay)
router.get('/courseview/:id',CheckUserAuth,CourseController.courseview)
router.get('/courseedit/:id',CheckUserAuth,CourseController.courseedit)
router.post('/courseupdate/:id',image_middleware,CheckUserAuth,CourseController.courseupdate)

//AdminController
router.get('/admin/dashboard', CheckUserAuth,AuthRole('admin'),AdminController.dashboard)


module.exports=router

