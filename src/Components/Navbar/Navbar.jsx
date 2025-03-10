import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import favorite_icon from '../Assets/favorite_icon.png'; // Import favorite icon
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const {getTotalFavoriteItems} = useContext(ShopContext);

    useEffect(() => {
        if(localStorage.getItem('menu')){
            setMenu(localStorage.getItem('menu'));
        }
    })

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        alert('Successfully Logged Out')
    }
    
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="Shop Logo" />
                <p>JUST BUY</p>
            </div>

            <ul className="nav-menu">
                <li onClick={() => {setMenu("shop"); localStorage.setItem('menu','shop')}}>
                    <Link style={{ textDecoration: 'none' }} to='/JustBuy/'>Shop</Link> 
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => {setMenu("men"); localStorage.setItem('menu','men')}}>
                    <Link style={{ textDecoration: 'none' }} to="/JustBuy/men">Men</Link> 
                    {menu === "men" && <hr />}
                </li>
                <li onClick={() => {setMenu("women"); localStorage.setItem('menu','women')}}>
                    <Link style={{ textDecoration: 'none' }} to="/JustBuy/women">Women</Link>  
                    {menu === "women" && <hr />}
                </li>
                <li onClick={() => {setMenu("kid"); localStorage.setItem('menu','kid')}}>
                    <Link style={{ textDecoration: 'none' }} to="/JustBuy/kids">Kids</Link>
                    {menu === "kid" && <hr />}
                </li>
                <li onClick={() => {setMenu("Settings"); localStorage.setItem('menu','Settings')}}>
                    <Link style={{ textDecoration: 'none' }} to="/JustBuy/user-settings">Settings</Link>
                    {menu === "Settings" && <hr />}
                </li>
            </ul>

            <div className="nav-login-cart">
            <Link to='/JustBuy/orders'>
                <button className='nav-orders-btn'>My Orders</button>
            </Link>
                
                {/* Favorites Icon */}
                <Link to='/JustBuy/favorites'>
                    <img src={favorite_icon} alt="Favorites" className="nav-icon" />
                </Link>
                
                <div className="nav-cart-count">{getTotalFavoriteItems()}</div>

                {/* Cart Icon */}
                <Link to='/JustBuy/cart'>
                    
                <img src={cart_icon} alt="Cart" className="nav-icon" />
            
                </Link>
                
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            
                
                <Link to='/' onClick={handleLogout}>
                    <button>Logout</button>
                </Link>
            </div>
        </div>
    );
};