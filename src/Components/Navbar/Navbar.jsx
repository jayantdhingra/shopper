import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import favorite_icon from '../Assets/favorite_icon.png';
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const { getTotalFavoriteItems } = useContext(ShopContext);
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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

    useEffect(()=>{        
            if(localStorage.getItem('menu')){
                setMenu(localStorage.getItem('menu'));
            }
    })
        
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        // Emit event to notify other components
        window.dispatchEvent(new Event("authChange"));

        navigate("/login");
        alert('You have logged out!')
    };

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="Shop Logo" />
                <p>JUST BUY</p>
            </div>

            <ul className="nav-menu">
                <li onClick={() => setMenu("shop")}><Link style={{ textDecoration: 'none' }}  to='/'>Shop</Link> {menu === "shop" && <hr />}</li>
                <li onClick={() => setMenu("men")}><Link style={{ textDecoration: 'none' }}  to="/men">Men</Link> {menu === "men" && <hr />}</li>
                <li onClick={() => setMenu("women")}><Link style={{ textDecoration: 'none' }}  to="/women">Women</Link> {menu === "women" && <hr />}</li>
                <li onClick={() => setMenu("kid")}><Link style={{ textDecoration: 'none' }}  to="/kids">Kids</Link> {menu === "kid" && <hr />}</li>
                <li onClick={() => {setMenu("Settings"); localStorage.setItem('menu','Settings')}}>
                    <Link style={{ textDecoration: 'none' }} to="/user-settings">Settings</Link>
                    {menu === "Settings" && <hr />}
                </li>
                
                <li onClick={() => setMenu("chat")}><Link style={{ textDecoration: 'none' }}  to="/chat">Chat</Link> {menu === "chat" && <hr />}</li>
            </ul>

            <div className="nav-login-cart">
                <Link to='/orders'>
                    <button className='nav-orders-btn'>My Orders</button>
                </Link>
                
                <Link to='/favorites'><img src={favorite_icon} alt="Favorites" className="nav-icon" /></Link>
                <div className="nav-cart-count">{getTotalFavoriteItems()}</div>

                <Link to='/cart'><img src={cart_icon} alt="Cart" className="nav-icon" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
