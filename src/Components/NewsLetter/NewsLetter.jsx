import React, { useState } from 'react';
import './NewsLetter.css'
import { useNavigate } from 'react-router-dom';

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (emailRegex.test(email)){
      navigate('/confirmation', {state:{email}});
    }else{
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