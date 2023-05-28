import React, { useState } from 'react';
import axios from 'axios';
import './askEmail.css';

const AskEmailPage = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a request to your backend server to initiate the password reset process
      await axios.post('/api/reset-password/request', { email });
      setEmailSent(true);
      // Display a success message to the user or redirect them to a confirmation page
    } catch (error) {
      console.error('Error requesting password reset:', error);
      // Display an error message to the user
    }
  };

  return (
    <div>
    <header className="main-header">
      <h1>TaskHub</h1>
    </header>
    <div className="container">
      <div className="ask-email-form">
        <h4>Enter your email and we'll email you a link to reset your password. </h4>
        {!emailSent ? (
          <form onSubmit={handleSubmit}>
            <div>
              {/* <label>Email:</label> */}
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        ) : (
          <p>Email sent. Please check your inbox for further instructions.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default AskEmailPage;