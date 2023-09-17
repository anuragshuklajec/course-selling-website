const {User,Course} =  require('../../db/schema')
const {authenticateJwt,jwt,SECRET} = require('../../middleware/auth/auth')
const express = require('express');
const router = express.Router();


router.post('/signup', async (req, res) => {
    // logic to sign up user
    const {username,password} = req.body
    const user = await User.findOne({username})
    if(user){
      res.status(403).json({message : 'User already exists'})
    }else{
      const newUser = new User({username,password})
      await newUser.save()
      const token = jwt.sign({username, role : 'user'},SECRET, {expiresIn : "1h"})
      res.json({message : "User created successfully", token})
  
    }
  });
  
  router.post('/login', async (req, res) => {
    // logic to log in user
    const {username,password} = req.headers
    const user = await User.findOne({username,password})
    if(user){
      const token = jwt.sign({username, role : 'user'},SECRET, {expiresIn : "1h"})
      res.json({message : "User Logged in successfully", token})
    }else{
      res.status(403).json({message: "User not found"})
    }
  
  });
  
  router.get('/courses', authenticateJwt, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({})
    res.json({courses})
  });
  
  router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
    // logic to purchase a course
    const course = await Course.findById(req.params.courseId)
    if(course){
      const user = await User.findOne({username : req.user.username})
      if(user){
      user.purchasedCourses.push(course)
      await user.save()
      res.json({message : "Course purchahsed Succefully"})
      }else{
        res.status(403).json({message : "User not found"})
      }
    }else{
      res.status(403).json({message : "Course not found"})
    }
  });
  
  router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({username : req.user.username}).populate('purchasedCourses')
    if(user){
      res.json({purchasedCourses : user.purchasedCourses || []})
    }else{
      res.status(403).json({message : "User not found"})
    }
  });

  module.exports = router;