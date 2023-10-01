import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios"



function NavBar() {
  const navigate = useNavigate()
  const [username,setUsername] = useState("")
  
  useEffect(() => {
    axios.get("http://localhost:3000/admin/me",{
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      }
    }).then((response)=>{
      console.log(response);
      if(response.status == 200){
        const data = response.data
        console.log(data.username);
        setUsername(data.username)
        console.log(username);
      }
    })

  }, []);
  if(username){
    return (

      <div style={{display: "flex", justifyContent: "space-between", padding : "4px", marginTop : "4px"}}>
        <div>
        <Button sx={{
           textTransform: "none",
        }} onClick={()=>{
            navigate("/")
          }}><Typography variant="h5" color="initial">Coursera</Typography></Button>
        </div>
        <div>
          <Typography variant="h7" color="initial">{username}</Typography>
          <Button variant="contained" sx = {{marginLeft : "10px"}} onClick={()=>{
            setUsername("")
            localStorage.setItem('token', null)
            navigate('/')
          }}>Sign out</Button>
        </div>
      </div>
    );

  }
  return (

    <div style={{display: "flex", justifyContent: "space-between", padding : "4px",marginTop : "10px"}}>
      <div>
        <Button sx={{
           textTransform: "none",
        }} onClick={()=>{
            navigate("/")
          }}><Typography variant="h5" color="initial">Coursera</Typography></Button>
      </div>
      <AuthButtons/>
    </div>
  );
}

export const AuthButtons = () =>{
  const navigate = useNavigate()
  return (
    <div>
        <Button variant="contained" sx={{marginRight : "10px"}} onClick={()=>{
          navigate('/signup')
        }}>Sign up</Button>
        <Button variant="contained" onClick={()=>{
          navigate('/signin')
        }}>Sign in</Button>
      </div>
  )
}

export default NavBar;
