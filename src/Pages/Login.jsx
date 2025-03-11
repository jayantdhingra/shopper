import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation (at least 8 characters)
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Save userToken in localStorage (simulating login)
    localStorage.setItem("userToken", "authenticated");
    
    // Redirect to /shop
    navigate("/JustBuy/");

    alert('Login Successful')
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="forgot-password" onClick={() => navigate("/JustBuy/forgot-password")}>
          Forgot Password?
        </span>

        <button className="login-button" onClick={handleLogin}>Login</button>

        <p className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/JustBuy/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
