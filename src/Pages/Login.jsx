import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <input type="text" placeholder="Username" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />

        <span className="forgot-password" onClick={() => navigate("/forgot-password")}>Forgot Password?</span>

        <button className="login-button">Login</button>

        <p className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
