import React, { useState } from "react";
import "../Styles/UserSettings.css"; // Import the CSS file

const UserSettings = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    notifications: {
      email: true,
      sms: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setUserData((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [name]: checked },
      }));
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    console.log("Updated User Data:", userData);
  };

  return (
    <div className="user-settings-container">
      <h2>Manage Account Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <h3>Profile Details</h3>
        <label>Full Name</label>
        <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} required />

        <label>Phone Number</label>
        <input type="text" name="phone" value={userData.phone} onChange={handleChange} required />

        <h3>Change Password</h3>
        <label>Current Password</label>
        <input type="password" name="password" value={userData.password} onChange={handleChange} />

        <label>New Password</label>
        <input type="password" name="newPassword" value={userData.newPassword} onChange={handleChange} />

        <label>Confirm New Password</label>
        <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />

        <h3>Notification Preferences</h3>
        <label>
          <input type="checkbox" name="email" checked={userData.notifications.email} onChange={handleChange} />
          Receive notifications via Email
        </label>

        <label>
          <input type="checkbox" name="sms" checked={userData.notifications.sms} onChange={handleChange} />
          Receive notifications via SMS
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserSettings;
