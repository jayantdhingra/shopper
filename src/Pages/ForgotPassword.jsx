import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Styles/ForgotPassword.css"; // Import the CSS file

const ForgotPassword = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">Forgot Password</h2>

        <p className="forgot-password-text">
          Please enter the email address you'd like your password reset information sent to.
        </p>

        <input type="email" placeholder="Email" className="input-field" />

        <button className="reset-button">Request Reset Link</button>

        <p className="back-to-login" onClick={() => navigate("/login")}>Back to Login</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
