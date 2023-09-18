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
    
    // fetch("http://localhost:3000/admin/me",{
    //         method : "GET",
    //         headers : {
    //             "Content-type" : "application/json",
    //             "Authorization" : "Bearer " + localStorage.getItem("token")
    //           }
    //       }).then(response =>{
    //         response.json().then((data)=>{
    //           if(response.ok){
    //             console.log(data.username);
    //             setUsername(data.username)
    //           }
    //         })
    //       })

  }, []);
  if(username){
    return (

      <div style={{display: "flex", justifyContent: "space-between", padding : 4}}>
        <div>
          <Typography>Coursera</Typography>
        </div>
        <div>
          <Typography variant="h7" color="initial">{username}</Typography>
          <Button variant="contained" sx = {{marginLeft : 2}} onClick={()=>{
            setUsername("")
            localStorage.setItem('token', null)
            navigate('/signin')
          }}>Sign out</Button>
        </div>
      </div>
    );

  }
  return (

    <div style={{display: "flex", justifyContent: "space-between", padding : 4}}>
      <div>
        <Typography>Coursera</Typography>
      </div>
      <div>
        <Button variant="contained" sx={{marginRight : "10px"}} onClick={()=>{
          navigate('/signup')
        }}>Sign up</Button>
        <Button variant="contained" onClick={()=>{
          navigate('/signin')
        }}>Sign in</Button>
      </div>
    </div>
  );
}

export default NavBar;
