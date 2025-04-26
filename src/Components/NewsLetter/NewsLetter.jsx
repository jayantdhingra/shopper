import React, { useState } from 'react';
import './NewsLetter.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  
    if (emailRegex.test(email)) {
      try {
        const res = await axios.post("http://localhost:8081/api/auth/subscribe", { email });
       
        if (res.data.success) {
          alert(res.data.message); // "Subscription successful and email sent!"
          navigate('/confirmation', { state: { email } });
        } else {
          alert(res.data.message); // "User not found with this email" or any other custom message
        }
      } catch (err) {
        console.error("Failed to subscribe:", err);
        alert("Subscription failed. Please try again later.");
      }
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input 
            type="email" 
            placeholder='Your Email ID'
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
             />
            <button onClick={handleSubscribe}>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter