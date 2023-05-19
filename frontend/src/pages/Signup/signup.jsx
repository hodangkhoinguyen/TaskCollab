
import React, { useState } from 'react';
<<<<<<< HEAD
// import { useHistory } from 'react-router-dom';
import './signup.css'
=======
import './signup.css'
import { useHistory } from 'react-router-dom';

>>>>>>> origin/login
const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  // const history = useHistory();
=======
  const history = useHistory();
>>>>>>> origin/login

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
<<<<<<< HEAD
   setPassword(event.target.value);
  };

const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
=======
    setPassword(event.target.value);
>>>>>>> origin/login
  };

  const handleSubmit = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    if (password !== confirmPassword) {
      // Display error message or take other action
      console.log('Passwords do not match');
    } else {
      // Perform signup logic here
      // You can access the entered name, email, and password using the 'name', 'email', and 'password' variables
      console.log('Signup successful');
    }
=======
    // Perform signup logic here
    // You can access the entered name, email, and password using the 'name', 'email', and 'password' variables
    history.push('/main')
>>>>>>> origin/login
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
<<<<<<< HEAD
              placeholder="Name"
=======
>>>>>>> origin/login
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
<<<<<<< HEAD
              placeholder="Email"
=======
>>>>>>> origin/login
              required
            />
          </div>
          <div>
<<<<<<< HEAD
            <label>Create Password:</label>
=======
            <label>Password:</label>
>>>>>>> origin/login
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
<<<<<<< HEAD
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
=======
>>>>>>> origin/login
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
