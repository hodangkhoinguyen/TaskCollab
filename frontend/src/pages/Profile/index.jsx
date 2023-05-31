
import React, { useEffect, useState } from 'react';
import './styles.css'; // Import the CSS file
import auth from '../../services/auth.js';
const ProfilePage = (props) => {
  console.log(props.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend or API
    // Set the user data in the state
    const fetchUserData = async () => {
      if (!props.user) return;
      try {
        const userData = await auth.getInfo(props.user);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [props.user]);

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
