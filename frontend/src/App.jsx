import { useState } from 'react'
import './App.css'
import Signup from './Signup'
import NavBar from './NavBar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signin from './Signin'
import AddCourse from './AddCourse'
import Courses from './Courses'
import Course from './Course'
 
function App() {
  return (

      <div style={{width: "100vw", height : "100vh"}}>
    <Router>
    <NavBar/>
      <Routes>
        <Route path="/course/:courseId" element={<Course/>}></Route>
        <Route path="/addcourse" element = {<AddCourse/>}></Route>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/courses" element={<Courses/>}/>
      </Routes>
    </Router>
    </div >  

  );
 
}

export default App
