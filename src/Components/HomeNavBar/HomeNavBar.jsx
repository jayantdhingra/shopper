import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import logo from "../Assets/logo.png";
import { useState, useEffect } from "react";

export const HomeNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  
      useEffect(() => {
          const checkAuthStatus = () => {
              setIsLoggedIn(!!localStorage.getItem("token"));
          };
  
          // Listen for login/logout events
          window.addEventListener("authChange", checkAuthStatus);
          
          return () => {
              window.removeEventListener("authChange", checkAuthStatus);
          };
      }, []);
  
      const handleLogout = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
  
          // Emit event to notify other components
          window.dispatchEvent(new Event("authChange"));
  
          navigate("/");
      };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Shop Logo" />
        <p>JUST BUY</p>
      </div>

      <ul className="nav-menu">
        <li>
          <Link style={{ textDecoration: "none" }} to="/">Shop</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/company">Company</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/offices">Offices</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/about">About</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/contact-us">Contact</Link>
        </li>
        <li>
          <a href="/WDM_Team8/blog/blog-for-ecommerce-website-team8/" style={{ textDecoration: "none" }}>
            Blog
          </a>

        </li>
      </ul>

      <div className="nav-login-cart">
        {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
        ) : (
            <Link to='/login'><button>Login</button></Link>
        )}
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeNavBar;
