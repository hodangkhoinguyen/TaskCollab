
import React, { useState } from 'react';
import './signup.css'
import { useHistory } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   const history = useHistory();

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
    setConfirmPassword(event.target.value);
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // Display error message or take other action
      console.log('Passwords do not match');
    } else {
      // Perform signup logic here
      // You can access the entered name, email, and password using the 'name', 'email', and 'password' variables
      console.log('Signup successful');
    }
    // Perform signup logic here
    // You can access the entered name, email, and password using the 'name', 'email', and 'password' variables
    history.push('/main')
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Name"
              required
            />
          </div>
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
            <label>Create Password:</label>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
