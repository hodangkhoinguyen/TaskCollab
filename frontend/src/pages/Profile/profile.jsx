
import React, { useEffect, useState } from 'react';
import './profile.css'; // Import the CSS file

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend or API
    // Set the user data in the state
    const fetchUserData = async () => {
      try {
        const userData = {
          name: "John",
          email: "asd@gmail.com"
        }
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

    const handleSignout = () => {
    // Implement your sign out logic here
    console.log("User signed out");
  };

  return (
    <div>
      <header className="main-header">
        <h1>TaskHub</h1>
        <button className="signout-button" onClick={handleSignout}>Sign Out</button>
      </header>
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
    </div>
  );
};

export default ProfilePage;
