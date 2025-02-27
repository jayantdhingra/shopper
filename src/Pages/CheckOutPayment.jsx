import React, { useState } from "react";
import "../Styles/CheckOutPayment.css"; // Import the CSS file
import CheckOutItems from "../Components/CheckOutItems/CheckOutItems";
import PayPal from "../Components/Assets/PayPal.png"

const CheckOutPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");

  return (
    <div className="checkout-container">
      {/* Left Side - Payment Options */}
      <div className="checkout-left">
        <h2 className="checkout-title">Checkout</h2>
        <div className="checkout-steps">
          <span>Address</span> —— 
          <span> Shipping</span> —— 
          <span className="active-step"> Payment</span>
        </div>

        {/* Payment Method Selection */}
        <div className="payment-method">
          <button 
            className={paymentMethod === "paypal" ? "active" : ""} 
            onClick={() => setPaymentMethod("paypal")}
          >
            <img src={PayPal} alt="PayPal Logo" className="paypal-logo" />
          </button>
          <button 
            className={paymentMethod === "credit" ? "active" : ""} 
            onClick={() => setPaymentMethod("credit")}
          >
            Credit Card
          </button>
        </div>

        {/* Payment Form for PayPal */}
        {paymentMethod === "paypal" && (
          <div className="payment-form">
            <h3 className="section-title">Payment Details</h3>
            <input type="email" placeholder="Email" className="input-field full-width" />
            <input type="text" placeholder="Card Number" className="input-field full-width" />
            <button className="pay-button">Pay Now</button>
          </div>
        )}

        {/* Payment Form for Credit Card */}
        {paymentMethod === "credit" && (
          <div className="payment-form">
            <h3 className="section-title">Payment Details</h3>
            <input type="text" placeholder="Cardholder Name" className="input-field full-width" />
            <input type="text" placeholder="Card Number" className="input-field full-width" />

            <div className="input-row">
              <select className="input-field">
                <option>Month</option>
              </select>
              <select className="input-field">
                <option>Year</option>
              </select>
              <input type="text" placeholder="CVC" className="input-field" />
            </div>

            <div className="save-card">
              <label>Save card data for future payments</label>
              <input type="checkbox" className="toggle-switch" />
            </div>

            <button className="pay-button">Pay with card</button>
          </div>
        )}
      </div>

      {/* Right Side - Cart Summary */}
      <div className="checkout-right">
        <h3 className="cart-title">Your cart</h3>
        <CheckOutItems />
      </div>
    </div>
  );
};

export default CheckOutPayment;
