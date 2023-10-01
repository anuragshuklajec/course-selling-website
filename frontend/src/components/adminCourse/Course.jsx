import { Card, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
/*eslint-disable*/
function Course() {
  let { courseId } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/course/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setCourse(response.data.course);
      });
  }, []);
  if (course) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <CourseComponent course={course} />
        <UpdateComponent course={course} setCourse={setCourse} />
      </div>
    );
  } else {
    return <div>Nothing Found</div>;
  }
}

function CourseComponent(props) {
  return (
    <div>
      <Card variant="outlined" sx={{ width: 300, height: 250, margin: "8px" }}>
        <Typography variant="h5" color="initial" align="center">
          {props.course.title}
        </Typography>
        <Typography variant="subtitle1" color="initial" align="center">
          {props.course.description}
        </Typography>
        <hr />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy5QC7JgWAelWvnWGevZ4YjsEZpmGStYe4BY_umnI3bA&s"
          width={300}
          alt="Course Image"
        />
      </Card>
    </div>
  );
}

function UpdateComponent(props) {
  const course = props.course;
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);

  useEffect(() => {
    setTitle(course.title);
    setDescription(course.description);
  }, [course]);

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          width: 400,
          height: 208,
          padding: "20px",
          margin: "8px",
        }}
      >
        <Typography color={"black"}>Update this course</Typography>
        <br />
        <TextField
          value={title}
          fullWidth={true}
          size="small"
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(title);
          }}
        />
        <br />
        <br />
        <TextField
          value={description}
          fullWidth={true}
          size="small"
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
            console.log(description);
          }}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const res = await axios.put(
              `http://localhost:3000/admin/courses/${course._id}`,{
              title,
              description,
              imageLink: "",
              published: true,},
              {
                headers: { Authorization: "Bearer " + localStorage.getItem("token"), },
              }
            );
            const data = res.data ;
            let updatedCourse = {
                      ...course,
                      title,
                      description
                    }
            props.setCourse(updatedCourse);
                  }}>
          Update course
        </Button>
      </Card>
    </div>
  );
}

export default Course;
