import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { useNavigate } from "react-router-dom"; // For navigation

const Footer = () => {
  const navigate = useNavigate(); // Initialize navigation
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src = {footer_logo} alt = "" />
            <p>JUST BUY</p>
        </div>
        <ul className='footer-links'>
            <li onClick={() => navigate("/company")}>Company</li>
            {/* <li onClick={() => navigate("/company")}>Products</li> */}
            <li onClick={() => navigate("/offices")}>Offices</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container" onClick={() => window.open("https://www.instagram.com/", "_blank")}>
                <img src = {instagram_icon} alt = "" />
            </div>
            <div className="footer-icons-container" onClick={() => window.open("https://www.pinterest.com/", "_blank")}>
                <img src = {pintester_icon} alt = "" />
            </div>
            <div className="footer-icons-container" onClick={() => window.open("https://www.whatsapp.com/", "_blank")}>
                <img src = {whatsapp_icon} alt = "" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2025 - All Right Reserved</p>
        </div>

    </div>
  )
}

export default Footer