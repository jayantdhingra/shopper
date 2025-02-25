import React from 'react'
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/Signup.css"

export const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate
    return (
        <div className="signup-container">
          <div className="signup-box">
            <h2 className="signup-title">Sign Up</h2>
    
            <input type="text" placeholder="Username" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
    
            <button className="signup-button">Sign Up</button>
    
            <p className="login-text">
              Already have an account? <span className="login-link" onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
        </div>
      );
}

export default Signup
