import { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";


function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(response => {
      response.json().then((data) => {
        setCourses(data.courses);
      });
    });
  }, []);

  return (
    <div>
      <Typography variant="h2" color="initial" align="center" marginTop={5} marginBottom={1}>Your Courses</Typography>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseCard(props) {

  return (
    <div>
      <Card variant="outlined" sx={{ width: 300, height: 250, margin: "8px" }}>
        <Typography variant="h5" color="initial" align="center">{props.course.title}</Typography>
        <Typography variant="subtitle1" color="initial" align="center">{props.course.description}</Typography>
        <hr />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy5QC7JgWAelWvnWGevZ4YjsEZpmGStYe4BY_umnI3bA&s" width={300} alt="Course Image" />
      </Card>
    </div>
  );
}

export default Courses;
