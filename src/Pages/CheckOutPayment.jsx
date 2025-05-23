import React, { useContext, useState, useEffect } from "react";
import "../Styles/CheckOutPayment.css";
import CheckOutItems from "../Components/CheckOutItems/CheckOutItems";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const CheckOutPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
              const token = localStorage.getItem("token");
              if (token) {
                try {
                  const decoded = jwtDecode(token);
                  setUserId(decoded.userId || decoded.id || decoded.sub);
                  setIsLoggedIn(true);
                } catch (err) {
                  console.error("Invalid token:", err);
                }
              }
            }, []);

  const { cartItems, all_product, getTotalCartAmount,promo,clearCart } = useContext(ShopContext);
  // const userId = 1;

  const validateCardDetails = () => {
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvc) {
      setError("All fields are required.");
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      setError("Card number must be 16 digits.");
      return false;
    }
    if (!/^\d{3}$/.test(cvc)) {
      setError("CVC must be 3 digits.");
      return false;
    }
    setError("");
    return true;
  };

  const handlePay = async () => {
    if (!validateCardDetails()) return;

    const total = await getTotalCartAmount();
    const Order_Items = Object.keys(cartItems).map((cartKey) => {
      const [Product_ID, Size] = cartKey.split("_");
      const item = cartItems[cartKey];
      return {
        Product_ID: parseInt(Product_ID),
        Quantity: item.quantity,
        Size,
        Color: item.Color || "Default",
      };
    });

    try {
      const shippingResponse = await fetch(`http://localhost:8081/api/shipping/${userId}`);
      const shippingData = await shippingResponse.json();

      if (!shippingData.Shipping_ID) {
        setError("Shipping information is missing.");
        return;
      }

      const orderRes = await fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          User_ID: userId,
          Order_Items,
          Total_Amount: total,
          Shipping_ID: shippingData.Shipping_ID,
        }),
      });

      const result = await orderRes.json();

      if (orderRes.ok) {
        try {
            const res = await axios.post(
              "http://localhost:8081/api/auth/deactivate-promoCode",
              {
                promocode: promo.code,
              }
            );
      
            await clearCart(); // ✅ Empty cart after order
//toast.success("✅ Order placed successfully! Your cart is now empty!");
             navigate("/orders");

            console.log("Response:", res.data);
          } catch (err) {
            console.error("Update failed:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Something went wrong.");
          }
      } else {
        alert("❌ Order placement failed: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while placing the order.");
    }
  };

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

        <div className="payment-method">         
          <button className={paymentMethod === "credit" ? "active" : ""} onClick={() => setPaymentMethod("credit")}>
            Credit Card
          </button>
        </div>
        {paymentMethod === "credit" && (
          <div className="payment-form">
            <h3 className="section-title">Payment Details</h3>
            <input
              type="text"
              placeholder="Cardholder Name"
              className="input-field full-width"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Card Number"
              className="input-field full-width"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="input-row">
              <select className="input-field" value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)}>
                <option value="">Month</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1}>{String(i + 1).padStart(2, "0")}</option>
                ))}
              </select>
              <select className="input-field" value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)}>
                <option value="">Year</option>
                {[...Array(10)].map((_, i) => {
                  const year = new Date().getFullYear() + i;
                  return <option key={year}>{year}</option>;
                })}
              </select>
              <input
                type="text"
                placeholder="CVC"
                className="input-field"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>

            <div className="save-card">
              <label>Save card data for future payments</label>
              <input type="checkbox" className="toggle-switch" />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button className="pay-button" onClick={handlePay}>Pay with card</button>
          </div>
        )}
      </div>

      {/* Right Side - Cart Summary */}
      <div className="checkout-right">
        <h3 className="cart-title">Your Cart</h3>
        <CheckOutItems />
      </div>
    </div>
  );
};

export default CheckOutPayment;
