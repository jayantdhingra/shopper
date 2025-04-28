import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import favorite_icon from '../Assets/favorite_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import Hamburger from '../Hamburger/Hamburger';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const { getTotalFavoriteItems } = useContext(ShopContext);
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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

    useEffect(() => {
        if(localStorage.getItem('menu')) {
            setMenu(localStorage.getItem('menu'));
        }
    });

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        // Emit event to notify other components
        window.dispatchEvent(new Event("authChange"));

        navigate("/login");
        alert('You have logged out!');
    };

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="Shop Logo" />
                <p>JUST BUY</p>
            </div>

            <ul className={`nav-menu ${hamburgerOpen ? 'open' : ''}`}>
                <li onClick={() => {setMenu("shop"); setHamburgerOpen(false); }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> {menu === "shop" && <hr />}</li>
                <li onClick={() => {setMenu("men"); setHamburgerOpen(false); }}><Link style={{ textDecoration: 'none' }} to="/men">Men</Link> {menu === "men" && <hr />}</li>
                <li onClick={() => {setMenu("women"); setHamburgerOpen(false); }}><Link style={{ textDecoration: 'none' }} to="/women">Women</Link> {menu === "women" && <hr />}</li>
                <li onClick={() => {setMenu("kid"); setHamburgerOpen(false); }}><Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link> {menu === "kid" && <hr />}</li>
                <li onClick={() => { {setMenu("Settings"); localStorage.setItem('menu', 'Settings');  setHamburgerOpen(false); }}}>
                    <Link style={{ textDecoration: 'none' }} to="/user-settings">Settings</Link>
                    {menu === "Settings" && <hr />}
                </li>
                <li onClick={() => {setMenu("chat");  setHamburgerOpen(false);}}><Link style={{ textDecoration: 'none' }} to="/chat">Chat</Link> {menu === "chat" && <hr />}</li>

                <div className={`nav-login-cart ${hamburgerOpen ? 'open' : ''}`}>
                    <li onClick={() => setHamburgerOpen(false)}><Link to='/orders' className='links'>
                        <button className='nav-orders-btn'>My Orders</button>
                    </Link></li>
                    
                    <li onClick={() => setHamburgerOpen(false)}><Link to='/favorites' className='links'><img src={favorite_icon} alt="Favorites" className="nav-icon" /></Link></li>
                    <div className="nav-cart-count">{getTotalFavoriteItems()}</div>

                    <li onClick={() => setHamburgerOpen(false)}><Link to='/cart' className='links'><img src={cart_icon} alt="Cart" className="nav-icon" /></Link></li>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                    
                    {isLoggedIn ? (
                        <li onClick={() => setHamburgerOpen(false)}><button onClick={handleLogout} className='links'>Logout</button></li>
                    ) : (
                        <li onClick={() => setHamburgerOpen(false)}><Link to='/login' className='links'><button>Login</button></Link></li>
                    )}
                </div>
                
            </ul>

            {/* <div className={`nav-login-cart ${hamburgerOpen ? 'open' : ''}`}>
                <Link to='/orders' className='links'>
                    <button className='nav-orders-btn'>My Orders</button>
                </Link>
                
                <Link to='/favorites' className='links'><img src={favorite_icon} alt="Favorites" className="nav-icon" /></Link>
                <div className="nav-cart-count">{getTotalFavoriteItems()}</div>

                <Link to='/cart' className='links'><img src={cart_icon} alt="Cart" className="nav-icon" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                
                {isLoggedIn ? (
                    <button onClick={handleLogout} className='links'>Logout</button>
                ) : (
                    <Link to='/login' className='links'><button>Login</button></Link>
                )}
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
                    top: 15%; /* Adjust the top to place below the hamburger */
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
                        top: 25%; /* Adjust the top to place below the hamburger */
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

export default Navbar;
