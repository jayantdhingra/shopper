import React, { useState } from "react";
import "../Styles/CheckOutShipping.css"; // Import the CSS file
import CheckOutItems from "../Components/CheckOutItems/CheckOutItems";
import { useNavigate } from "react-router-dom";

const CheckOutShipping = () => {
  const Navigate = useNavigate();
  const [selectedShipping, setSelectedShipping] = useState("usps");

  return (
    <div className="checkout-container">
      {/* Left Side - Shipping Options */}
      <div className="checkout-left">
        <h2 className="checkout-title">Checkout</h2>
        <div className="checkout-steps">
          <span>Address</span> —— 
          <span className="active-step"> Shipping</span> —— 
          <span> Payment</span>
        </div>

        <h3 className="section-title">Shipping Method</h3>

        <div className="shipping-option" onClick={() => setSelectedShipping("usps")}>
          <input type="radio" id="usps" name="shipping" checked={selectedShipping === "usps"} readOnly />
          <label htmlFor="usps">
            <strong>UPS/USPS Surepost</strong>
            <p>4-7 Business Days</p>
          </label>
        </div>

        <div className="shipping-option" onClick={() => setSelectedShipping("ground")}>
          <input type="radio" id="ground" name="shipping" checked={selectedShipping === "ground"} readOnly />
          <label htmlFor="ground">
            <strong>UPS Ground Shipping</strong>
            <p>3-5 Business Days</p>
          </label>
        </div>

        <button className="continue-button" onClick={() => Navigate('/checkout-payment')}>Continue to payment</button>
      </div>

      {/* Right Side - Cart Summary */}
      <div className="checkout-right">
        <h3 className="cart-title">Your cart</h3>
        <div>
            <CheckOutItems/>
        </div>
      </div>
    </div>
  )
}

export default CheckOutShipping