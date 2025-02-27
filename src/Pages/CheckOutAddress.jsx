import React, { useState } from "react";
import "../Styles/CheckOutAddress.css"; // Import the CSS file
import CheckOutItems from "../Components/CheckOutItems/CheckOutItems";
import { useNavigate } from "react-router-dom";

const CheckOutAddress = () => {
    const Navigate = useNavigate();
    return (
        <div className="checkout-container">
        {/* Left Side - Shipping Information */}
        <div className="checkout-left">
            <h2 className="checkout-title">Checkout</h2>
            <div className="checkout-steps">
            <span className="active-step">Address</span> —— 
            <span> Shipping</span> —— 
            <span> Payment</span>
            </div>

            <h3 className="section-title">Shipping Information</h3>
            <form className="shipping-form">
            <div className="input-row">
                <input type="text" placeholder="First Name" className="input-field" />
                <input type="text" placeholder="Last Name" className="input-field" />
            </div>
            <input type="text" placeholder="Address" className="input-field full-width" />
            <input type="text" placeholder="Apartment, suite, etc (optional)" className="input-field full-width" />
            <input type="text" placeholder="City" className="input-field full-width" />

            <div className="input-row">
                <select className="input-field">
                <option>Country</option>
                </select>
                <select className="input-field">
                <option>City</option>
                </select>
                <input type="text" placeholder="Zipcode" className="input-field" />
            </div>

            <input type="text" placeholder="Optional" className="input-field full-width" />

            <div className="save-contact">
                <input type="checkbox" id="save-info" />
                <label htmlFor="save-info">Save contact information</label>
            </div>

            <button className="continue-button" onClick={(event) => { 
                event.preventDefault(); 
                Navigate('/checkout-shipping');
            }}>
            Continue to shipping
            </button>
            </form>
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

export default CheckOutAddress
