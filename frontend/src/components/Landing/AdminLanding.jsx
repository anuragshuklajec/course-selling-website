import { Typography, Button } from "@mui/material";
import { AuthButtons } from "../navbar/NavBar";

function AdminLanding(){
    return (
        <div style={{display: "flex", justifyContent: "space-evenly", marginTop : "7%",alignItems: "center" }}>
            <LeftComponent/>
            <RightComponent/>
        </div>
    )

}

function LeftComponent(){
    return(
        <div style={{textAlign : "center", marginBottom: "10px"}}>
            <Typography variant="h4" color="gray" sx={{marginBottom : "10px"}}>Shape your future with</Typography>
            <Typography variant="h3" sx={{marginBottom : "20px"}}>Coursera</Typography>
            <AuthButtons/>
        </div>
    )
}

function RightComponent(){
    return(
        <div>
            <img src="https://www.techrepublic.com/wp-content/uploads/2022/07/coursera-releases-machine-learning-course.jpeg" alt="Coursera"  style={{ width: "100%", maxWidth: "800px"}}/>
        </div>
    )
}


export default AdminLanding ; 