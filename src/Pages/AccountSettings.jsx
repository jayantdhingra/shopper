import React, { useState } from "react";
import "../Styles/AccountSettings.css"; // Import the CSS file

const AccountSettings = () => {
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
      <h2 className="heading">Manage Account Settings</h2>
      
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="miniHeading">Profile Details</h3>
        <label className="label">Full Name</label>
        <input className="input" type="text" name="fullName" value={userData.fullName} onChange={handleChange} required />

        <label className="label">Email</label>
        <input className="input" type="email" name="email" value={userData.email} onChange={handleChange} required />

        <label className="label">Phone Number</label>
        <input className="input" type="text" name="phone" value={userData.phone} onChange={handleChange} required />

        <h3 className="miniHeading">Change Password</h3>
        <label className="label">Current Password</label>
        <input className="input" type="password" name="password" value={userData.password} onChange={handleChange} />

        <label className="label">New Password</label>
        <input className="input" type="password" name="newPassword" value={userData.newPassword} onChange={handleChange} />

        <label className="label">Confirm New Password</label>
        <input className="input" type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />

        <h3 className="miniHeading">Notification Preferences</h3>
        <label className="label">
          <input className="input" type="checkbox" name="email" checked={userData.notifications.email} onChange={handleChange} />
          Receive notifications via Email
        </label>

        <label className="label">
          <input className="input" type="checkbox" name="sms" checked={userData.notifications.sms} onChange={handleChange} />
          Receive notifications via SMS
        </label>

        <button className="saveButton" type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AccountSettings;
