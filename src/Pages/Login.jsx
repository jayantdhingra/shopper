import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token
        localStorage.setItem("role", data.role); // Store user role
        localStorage.setItem("userToken", "authenticated");
        
        // Emit event to notify Navbar of login change
        window.dispatchEvent(new Event("authChange"));

        alert('Login Successful')
        navigate(data.role === "Admin" ? "/" : "/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <input type="email" name="email" placeholder="Email" className="input-field" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} />

        <span className="forgot-password" onClick={() => navigate("/forgot-password")}>Forgot Password?</span>

        <button className="login-button" onClick={handleLogin}>Login</button>

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
