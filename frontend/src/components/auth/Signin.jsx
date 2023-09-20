/*eslint-disable*/
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        <Typography variant="h6" color="initial">
          Welcome to Coursera, Sign in below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          sx={{
            width: 400,
            height: 200,
            padding: "20px",
            margin: "10px",
          }}
        >
          <TextField
            fullWidth={true}
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(password);
            }}
          />{" "}
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/admin/login",{},
                {
                  headers: { username: email, password: password },
                }
              );
              const data = res.data;

              localStorage.setItem("token", data.token);
              window.location = "/courses"
            }}
          >
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
