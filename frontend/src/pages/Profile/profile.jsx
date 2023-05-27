
import React, { useEffect, useState } from 'react';
import './profilePage.css'; // Import the CSS file

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend or API
    // Set the user data in the state
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Replace with your API endpoint
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile Page</h2>
      {user ? (
        <div className="profile-info">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <div className="loading-spinner">
        <p className="loading-message">Loading user data...</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
