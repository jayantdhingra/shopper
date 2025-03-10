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
          <Link style={{ textDecoration: "none" }} to="/JustBuy/">Shop</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/JustBuy/company">Company</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/JustBuy/offices">Offices</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/JustBuy/about">About</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/JustBuy/contact-us">Contact</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/JustBuy/blog-for-ecommerce-website-team8">Blog</Link>
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to="/JustBuy/login">
          <button>Login</button>
        </Link>
        <Link to="/JustBuy/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeNavBar;
