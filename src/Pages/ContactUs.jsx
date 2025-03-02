import React from "react";
import "../Styles/ContactUs.css"; // Import the CSS file

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-us-box">
        <h2 className="contact-us-title">Contact Us</h2>
        <p className="contact-us-text">You will get a response within 24 hours</p>

        <input type="input" placeholder="Name" className="input-field" />
        <input type="input" placeholder="Email" className="input-field" />
        <input type="input" placeholder="Phone" className="input-field" />
        <input type="input" placeholder="Message" className="input-field" />

        <button className="contact-button">Send Enquiry</button>
      </div>
    </div>
  );
};

export default ContactUs;
