import '../src/styles/App.css'
import Signup from '../src/components/auth/Signup'
import NavBar from '../src/components/navbar/NavBar'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signin from '../src/components/auth/Signin'
import AddCourse from '../src/components/adminCourse/AddCourse'
import Courses from '../src/components/adminCourse/Courses'
import Course from '../src/components/adminCourse/Course'
 
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
