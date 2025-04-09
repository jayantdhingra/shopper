import React, { useState, useEffect } from "react";
import "../Styles/CheckOutAddress.css";
import CheckOutItems from "../Components/CheckOutItems/CheckOutItems";
import { useNavigate } from "react-router-dom";
import {
	CitySelect,
	CountrySelect,
	StateSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';

const CheckOutAddress = () => {
  const navigate = useNavigate();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    optional: "",
    saveInfo: false,
  });

  const [states, setStates] = useState([]);

  const handleChange = (e) => {
    console.log('handlechange:', e.target)
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryChange = (e) => {
    setCountryid(e.id);
    console.log(e);
    setFormData((prevData) => ({
      ...prevData,
      "country": e.name,
    }));
  };

  const handleStateChange = (e) => {
    setstateid(e.id);
    console.log(e);
    setFormData((prevData) => ({
      ...prevData,
      "state": e.name,
    }));
  };

  const handleCityChange = (e) => {
    setstateid(e.id);
    console.log(e);
    setFormData((prevData) => ({
      ...prevData,
      "city": e.name,
    }));
  };

  const handleContinue = (event) => {
    event.preventDefault();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "country",
      "state",
      "city",
      "zipcode",
    ];

    for (let field of requiredFields) {
        console.log('formData[field]', formData[field])
      if (!formData[field]) {
        alert(`Please fill out the "${field}" field.`);
        return;
      }
    }

    // Store in localStorage
    localStorage.setItem("shippingData", JSON.stringify(formData));

    // Navigate to shipping page
    navigate("/checkout-shipping");
  };

  return (
    <div className="checkout-container">
      {/* Left Side - Shipping Information */}
      <div className="checkout-left">
        <h2 className="checkout-title">Checkout</h2>
        <div className="checkout-steps">
          <span className="active-step">Address</span> —— <span>Shipping</span> —— <span>Payment</span>
        </div>

        <h3 className="section-title">Shipping Information</h3>
        <form className="shipping-form">
          <div className="input-row">
            <input
              type="text"
              placeholder="First Name"
              className="input-field"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input-field"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            placeholder="Address"
            className="input-field full-width"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Apartment, suite, etc (optional)"
            className="input-field full-width"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
          />
           <CountrySelect
                name="country"
                style={{height:"40px"}}
                value={formData.country}
                onChange={handleCountryChange}
                placeHolder='Select Country'
            />

          <div className="input-row">

            <StateSelect
                style={{height:"40px"}}
                disabled={!countryid}
                countryid={countryid}
                onChange={
                    handleStateChange
                }
                value={formData.state}
                placeHolder='Select State'
            />

            
            <CitySelect
                style={{height:"40px"}}
                disabled={!stateid}
                countryid={countryid}
                stateid={stateid}
                onChange={handleCityChange}
                value={formData.city}
                placeHolder='Select City'
		    />

            <input
              type="text"
              placeholder="Zipcode"
              className="input-field"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            placeholder="Optional"
            className="input-field full-width"
            name="optional"
            value={formData.optional}
            onChange={handleChange}
          />

          <div className="save-contact">
            <input
              type="checkbox"
              id="save-info"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
            />
            &nbsp;
            <label htmlFor="save-info">Save contact information</label>
          </div>

          <button className="continue-button" onClick={handleContinue}>
            Continue to shipping
          </button>
        </form>
      </div>

      {/* Right Side - Cart Summary */}
      <div className="checkout-right">
        <h3 className="cart-title">Review Cart</h3>
        <div>
          <CheckOutItems />
        </div>
      </div>
    </div>
  );
};

export default CheckOutAddress;
