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

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        // Emit event to notify other components
        window.dispatchEvent(new Event("authChange"));

        navigate("/");
    };

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="Shop Logo" />
                <p>JUST BUY</p>
            </div>

            <ul className="nav-menu">
                <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link> {menu === "shop" && <hr />}</li>
                <li onClick={() => setMenu("men")}><Link to="/men">Men</Link> {menu === "men" && <hr />}</li>
                <li onClick={() => setMenu("women")}><Link to="/women">Women</Link> {menu === "women" && <hr />}</li>
                <li onClick={() => setMenu("kid")}><Link to="/kids">Kids</Link> {menu === "kid" && <hr />}</li>
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
