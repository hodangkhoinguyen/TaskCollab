import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const PasswordResetForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      // Display an error message to the user
      return;
    }

    try {
      // Send a request to your backend server to reset the password
      await axios.post('/api/reset-password', { password });
      console.log('Password reset successful');
      // Display a success message to the user or redirect them to a confirmation page
    } catch (error) {
      console.error('Error resetting password:', error);
      // Display an error message to the user
    }
  };

  return (
    <div>
    <div className="container">
      <h2 className="reset-title">Reset Password</h2>
      <form className="reset-form" onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="New Password"
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm New Password"
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  </div>
  );
};

export default PasswordResetForm;