import { TextField, Button,Card } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddCourse() {
    const navigate = useNavigate()
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
  return (
    <div style={{display : 'flex', justifyContent : "center"}}>
    <Card
    variant='outlined'
    sx={{

    width: 400,
    height : 200,
    padding : '20px',
    margin : '10px'

    }}
    >
      <TextField fullWidth={true} label="Title" variant="outlined" onChange={(e)=>{
        setTitle(e.target.value)
        console.log(title);
      }} />
      <br /><br />
      <TextField fullWidth={true} label="Description" variant="outlined" onChange={(e)=>{
        setDescription(e.target.value)
        console.log(description);
      }} />
      <br /><br />
      <Button variant="contained" color="primary" onClick={()=>{
        fetch("http://localhost:3000/admin/courses",{
            method : "POST",
            body : JSON.stringify(
              {
                title,
                description,
                imageLink : "",
                published : true,
              }),
            headers : {
                "Content-type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
              }
          }).then((response)=>{
            response.json().then((data)=>{
              console.log(data.token);
              navigate('/courses')

            })
          })
      }}>
        Add course
      </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
