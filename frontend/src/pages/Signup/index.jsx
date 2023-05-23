import React, { useState } from "react";
import auth from "../../services/auth.js";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (name === "" || email === "" || password === "") {
      alert("You are missing information");
      return;
    }

    if (password !== confirmPassword) {
      // Display error message or take other action
      alert("Passwords do not match");
      return;
    }

    // Perform signup logic here
    // You can access the entered name, email, and password using the 'name', 'email', and 'password' variables
    const newUser = {
        email: email,
        password: password,
        name: name
    };

    auth.signup(newUser)
    .then(() => {
        console.log("Signup successful");
        navigate("/login");
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            required="required"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required="required"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required="required"
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required="required"
          />
        </div>
        <button onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignupPage;
