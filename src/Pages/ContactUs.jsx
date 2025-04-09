import React from "react";
import "../Styles/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-us-box">
        <h2 className="contact-us-title">Contact Us</h2>
        <p className="contact-us-text">You will get a response within 24 hours</p>

        <input type="text" placeholder="Name" className="input-field" />
        <input type="email" placeholder="Email" className="input-field" />
        <input type="text" placeholder="Phone" className="input-field" />
        <textarea placeholder="Message" className="input-field" rows="4" />

        <button className="contact-button">Send Enquiry</button>
      </div>

      {/* Map with red marker */}
      <div className="map-container">
        <h3 className="contact-us-title">Our Location</h3>
        <iframe
          title="company-location"
          className="map-frame"
          src="https://www.google.com/maps?q=Best+Buy+Headquarters,+Richfield,+MN&output=embed"
          allowFullScreen=""
          loading="lazy"
        >
      </iframe>
      </div>
    </div>
  );
};

export default ContactUs;
