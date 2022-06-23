import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginScreenImg from "../assets/images/hospital2.svg";
import Logo from "../assets/images/SUWASERIYA_LOGO_IMG.png";

//components
import CustomButton from "../common/components/Button";

//style
import "./style/login.css";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        // ..
      });
  };
  return (
    <div className="login-screen">
      {/* <div className="text-center">
        <h1>Login</h1>
        
      </div> */}
      <div className="left">
        <img id="login_img" src={LoginScreenImg} />
      </div>
      <div className="right">
        <div className="logo-area">
          <img id="login_img" src={Logo} />
          <h3>Suwaseriya Admin</h3>
        </div>
        <div className="form-area">
          <br />
          <br />
          <form onSubmit={handleLogin}>
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              required
              style={{
                width: "400px",
                backgroundColor: "#fff",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              required
              style={{ width: "400px", backgroundColor: "#fff" }}
              onChange={(e) => setPassord(e.target.value)}
            />
            <br />
            {error && (
              <span style={{ color: "red", fontSize: "14px" }}>
                Please check your email or password again!
              </span>
            )}

            <br />
            <CustomButton
              label="login"
              style={{
                width: "400px",
                backgroundColor: "transparent",
                border: "2px solid #fff",
              }}
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
