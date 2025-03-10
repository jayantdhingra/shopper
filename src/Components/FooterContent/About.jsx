import React from "react";
import "./styles.css";
import logo from '../Assets/logo.png';

const About = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">About Us</h1>
      <p className="page-subtitle">A little bit about our journey.</p>
      {/* <img
        src="https://source.unsplash.com/800x400/?team,work"
        alt="About Us"
        className="page-image"
      /> */}
      <img src={logo} alt="Shop Logo" />
      <p className="page-text">
        Just Buy started as a small e-commerce platform and has grown into a
        global marketplace. We value customer satisfaction, innovation, and
        quality products.
      </p>
    </div>
  );
};

export default About;