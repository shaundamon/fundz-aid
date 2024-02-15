import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({
    user: '',
    is_organizer: false,
    phone_number: '',
    address: '',
  });
  const [editing, setEditing] = useState(false);

  // Assuming you have a way to get the user's ID (e.g., from the login response, a context, etc.)
  const userId = localStorage.getItem('userId');

  // Fetch user profile when the component mounts
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/profiles/${userId}/`)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    axios.put(`http://127.0.0.1:8000/api/profiles/${userId}/`, profile)
      .then(response => {
        setEditing(false);
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
      });
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  return (
    <div>
      <h1>User Profile</h1>
      {editing ? (
        <div>
          <label>
            Phone Number:
            <input type="text" name="phone_number" value={profile.phone_number} onChange={handleInputChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={profile.address} onChange={handleInputChange} />
          </label>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Username: {profile.user}</p>
          <p>Organizer: {profile.is_organizer ? "Yes" : "No"}</p>
          <p>Phone Number: {profile.phone_number}</p>
          <p>Address: {profile.address}</p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
