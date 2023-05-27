import React, { useState } from 'react';
import axios from 'axios';
import './resetPasswordPage.css'; // Import the CSS file

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Send a request to your backend server to initiate the password reset process
      await axios.post('/api/reset-password', { email });
      console.log('Password reset email sent');
      // Display a success message to the user or redirect them to a confirmation page
    } catch (error) {
      console.error('Error initiating password reset:', error);
      // Display an error message to the user
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Reset Password</h2>
      <form className="reset-form" onSubmit={handleSubmit}>
        <div>
          <label>Please enter Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
