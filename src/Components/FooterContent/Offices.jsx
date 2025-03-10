import React from "react";
import "./styles.css";

const Offices = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Our Offices</h1>
      <p className="page-subtitle">Find us in multiple locations worldwide.</p>
      <div className="office-list">
        <div className="office-card">
          <h3>New York, USA</h3>
          <p>123 5th Avenue, Manhattan, NY 10001</p>
        </div>
        <div className="office-card">
          <h3>London, UK</h3>
          <p>221B Baker Street, London, NW1 6XE</p>
        </div>
        <div className="office-card">
          <h3>Tokyo, Japan</h3>
          <p>Shibuya, Tokyo 150-0002</p>
        </div>
      </div>
    </div>
  );
};

export default Offices;