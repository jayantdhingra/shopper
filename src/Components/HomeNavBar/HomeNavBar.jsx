import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import logo from "../Assets/logo.png";
import { useState, useEffect } from "react";
import Hamburger from "../Hamburger/Hamburger";

export const HomeNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  
      const [hamburgerOpen, setHamburgerOpen] = useState(false);
  
      const toggleHamburger = () => {
          setHamburgerOpen(!hamburgerOpen);
      };
  
      useEffect(() => {
          const checkAuthStatus = () => {
              setIsLoggedIn(!!localStorage.getItem("token"));
          };
  
          // Listen for login/logout events
          window.addEventListener("authChange", checkAuthStatus);
          
          return () => {
              window.removeEventListener("authChange", checkAuthStatus);
          };
      }, []);
  
      const handleLogout = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
  
          // Emit event to notify other components
          window.dispatchEvent(new Event("authChange"));
  
          navigate("/");
      };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Shop Logo" />
        <p>JUST BUY</p>
      </div>

      <ul className={`nav-menu ${hamburgerOpen ? 'open' : ''}`}>
      <li onClick={() => setHamburgerOpen(false)}>
          <Link style={{ textDecoration: "none" }} to="/">Shop</Link>
        </li>
        <li onClick={() => setHamburgerOpen(false)}>
          <Link style={{ textDecoration: "none" }} to="/company">Company</Link>
        </li>
        <li onClick={() => setHamburgerOpen(false)}>
          <Link style={{ textDecoration: "none" }} to="/offices">Offices</Link>
        </li>
        <li onClick={() => setHamburgerOpen(false)}>
          <Link style={{ textDecoration: "none" }} to="/about">About</Link>
        </li>
        <li onClick={() => setHamburgerOpen(false)}>
          <Link style={{ textDecoration: "none" }} to="/contact-us">Contact</Link>
        </li>
        <li onClick={() => setHamburgerOpen(false)}>
          <a href="/WDM_Team8/blog/blog-for-ecommerce-website-team8/" style={{ textDecoration: "none" }}>
            Blog
          </a>
        </li>

        <div className={`nav-login-cart ${hamburgerOpen ? 'open' : ''}`}>
        {isLoggedIn ? (
              <li onClick={() => setHamburgerOpen(false)}><button onClick={handleLogout}>Logout</button></li>
          ) : (
              <li onClick={() => setHamburgerOpen(false)}><Link to='/login'><button>Login</button></Link></li>
          )}
          <li onClick={() => setHamburgerOpen(false)}>
            <Link to="/signup">
                <button>Signup</button>
              </Link>
          </li>
        </div>
      </ul>

      {/* <div className="nav-login-cart">
        {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
        ) : (
            <Link to='/login'><button>Login</button></Link>
        )}
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div> */}
      
      
      <div className="hamburger" onClick={toggleHamburger}>
          <Hamburger isOpen={hamburgerOpen} />
      </div>

      <style jsx>{`
          .hamburger {
              display: none;
              z-index: 6;
          } 

          .nav-menu.open {
              display: block;
              position: absolute;
              top: 10%; /* Adjust the top to place below the hamburger */
              left: 0;
              width: 100%;
              background-color: white;
              padding-top: 20px;
              text-align: center;
              z-index: 5;
          }
          .nav-login-cart.open{
              display: block;
              position: absolute;
              left: 0;
              width: 100%;
              background-color: white;
              padding-top: 20px;
              text-align: center;
              z-index: 5;
          }                

          .nav-menu.open li{
              margin-bottom: 10px;
              font-size: 40px;
          }

          .nav-login-cart.open li{
              margin-left:40px;
          }

          .nav-login-cart.open .links{
              margin-bottom: 10px;
          }
          

          @media (max-width: 1100px) {
              .hamburger {
                  display: block;
                  padding-top: 10px;
                  margin-left: 10px;
                  z-index: 6;
              }

              .navbar ul {
                  display: ${hamburgerOpen ? 'block' : 'none'};
                  position: absolute;
                  top: 60px;
                  width: 100%;
                  background-color: white;
                  text-align: center;
                  z-index: 5;
              }

              
          }

          @media (max-width: 770px) {
              .hamburger {
                  display: block;
                  padding-top: 10px;
                  margin-left: 40px;
                  z-index: 6;
              }

              .nav-menu.open {
                  display: block;
                  position: absolute;
                  top: 20%; /* Adjust the top to place below the hamburger */
                  left: 0;
                  width: 100%;
                  background-color: white;
                  padding-top: 20px;
                  text-align: center;
                  z-index: 5;
              }

              .nav-login-cart.open {
                  display: block;
                  position: absolute;
                  left: 0;
                  width: 100%;
                  background-color: white;
                  padding-top: 20px;
                  text-align: center;
                  z-index: 5;
              }
      }
      `}</style>
    </div>
  );
};

export default HomeNavBar;
