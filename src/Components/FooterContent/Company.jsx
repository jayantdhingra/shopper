import React from "react";
import "./styles.css";
import companyImage from '../Assets/join.png'

import logo from '../Assets/logo.png';

const Company = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome to Just Buy</h1>
      <p className="page-subtitle">
        Your go-to destination for the best shopping experience.
      </p>
      <img src={logo} alt="Shop Logo" />
      <p className="page-text">
        At Just Buy, we are committed to providing the best products and
        services to our customers. Our company has been serving the global
        market with high-quality products and innovative solutions.
      </p>
    </div>
  );
};

export default Company;