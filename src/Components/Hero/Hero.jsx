import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    const handleLatestCollection = () =>{
        if(localStorage.getItem("userToken")){
            navigate("/JustBuy/men")
        }
        else{
            navigate("/JustBuy/login")
        }
    }

  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>New Arrivals</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt ="" />
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <div className="hero-latest-btn" onClick={handleLatestCollection}>
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>

        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />

        </div>
    </div>
  )
}

export default Hero