import React from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";
import logo from "../Assets/logo.png";

export const HomeNavBar = () => {
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
          <Link style={{ textDecoration: "none" }} to="/blog/blog-for-ecommerce-website-team8">Blog</Link>
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeNavBar;
