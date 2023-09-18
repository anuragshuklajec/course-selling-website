import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card } from '@mui/material';
import { useState } from 'react';
import axios from "axios" ;
import { useNavigate } from 'react-router-dom';
function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  return (
    <div>
    <div style={{
        display: "flex",
        justifyContent : "center",
        marginTop: "150px",

      }}>
        <Typography variant="h6" color="initial">Welcome to Coursera, Signup below</Typography>
    </div>
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

      <TextField
        fullWidth = {true}
        label="Email"
       variant='outlined'
       onChange={(e)=>{
         setEmail(e.target.value)
         console.log(email)
       }}
       
      />
      <br /><br />
      <TextField
        fullWidth = {true}
        label="Password"
        type='password'
       variant='outlined'
       onChange={(e)=>{
         setPassword(e.target.value)
         console.log(password)
       }}

      /> <br/><br/>
      <Button variant="contained" color="primary" size='small' onClick={async()=>{
        const res = await axios.post("http://localhost:3000/admin/signup",{
          username : email,
          password : password
        })
        const data = res.data
        localStorage.setItem("token",data.token)
        navigate('/addcourse')
      }}>
        Signup
      </Button>
    </Card>
    </div>
    </div>


    
  );
}

export default Signup;

        // fetch("http://localhost:3000/admin/signup",{
        //   method : "POST",
        //   body : JSON.stringify(
        //     {
        //       username : email,
        //       password : password
        //     }),
        //   headers : {
        //       "Content-type" : "application/json"
        //     }
        // }).then((response)=>{
        //   response.json().then((data)=>{
        //     localStorage.setItem("token", data.token)
        //     console.log(data.token);
        //   })
        // })