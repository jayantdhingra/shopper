import React from "react";
import "../Styles/ResetPassword.css"; // Import the CSS file

const ResetPassword = () => {
  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2 className="reset-password-title">Reset Password</h2>
        <p className="reset-password-text">Enter a New Password</p>

        <input type="password" placeholder="Password" className="input-field" />
        <input type="password" placeholder="Confirm Password" className="input-field" />

        <button className="reset-button">Reset Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;
