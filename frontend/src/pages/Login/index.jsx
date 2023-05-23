import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import auth from "../../services/auth.js";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (email === "" || password === "") {
      alert("You are missing information");
      return;
    }

    const signinUser = {
      email: email,
      password: password,
    };
    auth.signin(signinUser)
    .then((result) => {
        console.log(result);
        props.login(result);
    })
    .catch(err => console.log(err));

  };

  const handleGoogleLogin = () => {
    // perform Google login logic here
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
        <p>Or log in with your Google account:</p>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          Log In with Google
        </button>
        {/* /<button onClick={handleGoogleLogin}>Log In with Google</button> */}
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
