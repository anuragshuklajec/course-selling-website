const {Admin,Course} =  require('../../db/schema')
const {authenticateJwt,jwt,SECRET} = require('../../middleware/auth/auth')
const express = require('express');
const router = express.Router();

router.get('/me',authenticateJwt,(req,res)=>{
    res.json({
      username : req.user.username
    })
  })
  router.post('/signup', async (req, res) => {
    // logic to sign up admin
    const {username, password} = req.body ; 
    const existingAdmin = await Admin.findOne({username})
    if(existingAdmin){
      res.status(403).json({message : 'Admin already exists'})
    }else{
      const obj = {username : username, password : password}
      const newAdmin = new Admin(obj)
      await newAdmin.save()
      const token = jwt.sign({username , role : 'admin'}, SECRET,{ expiresIn : '1h'})
      res.json({message : 'Admin created successfully' , token})
    }
  });
  
  router.post('/login', async (req, res) => {
    // logic to log in admin
    const { username, password } = req.headers;
    const admin = await Admin.findOne({username,password})
    if(admin){
      const token = jwt.sign({username , role : 'admin'}, SECRET,{ expiresIn : '1h'})
      res.json({message : 'Admin logged in successfully' , token})
  
    }else{
      res.status(403).json({message : "Invalid username or password"})
    }
  
  });
  
  router.post('/courses', authenticateJwt, async (req, res) => {
    // logic to create a course
    const course = new Course(req.body)
    await course.save()
    res.json({message : "Course created succesfully", CourseId : course.id})
  });
  
  router.put('/courses/:courseId', authenticateJwt , async (req, res) => {
    // logic to edit a course
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new:true})
    if(course){
      res.json({message : "Course updated successfully"})
    }else{
      res.json({message : "Course not found"})
    }
  
  });
  
  router.get('/courses', authenticateJwt, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({})
    res.json({courses})
  
  });

  module.exports = router ;