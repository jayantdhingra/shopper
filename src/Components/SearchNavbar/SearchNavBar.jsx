import React, { useContext, useEffect, useState } from 'react';
import './SearchNavBar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import favorite_icon from '../Assets/favorite_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import SearchIcon from '../Assets/search-icon.svg'

export const SearchNavBar = ({ onSearch }) => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const { getTotalFavoriteItems } = useContext(ShopContext);
    const [query, setQuery] = useState("");


    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value.trim());
    };

    useEffect(()=>{        
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

            <div className="searchbar">
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Search for products"
                        value={query}
                        onChange={handleInputChange}
                    />
                </div>
                <button onClick={() => onSearch(query.trim())}><img src={SearchIcon} alt=""/></button>
                
            </div>

            <div className="nav-login-cart">
                <Link to='/JustBuy/orders'>
                                <button className='nav-orders-btn'>My Orders</button>
                            </Link>
                <Link to='/JustBuy/favorites'>
                    <img src={favorite_icon} alt="Favorites" className="nav-icon" />
                </Link>

                <div className="nav-cart-count">{getTotalFavoriteItems()}</div>

                <Link to='/JustBuy/cart'>
                    <img src={cart_icon} alt="Cart" className="nav-icon" />
                </Link>

                <div className="nav-cart-count">{getTotalCartItems()}</div>

                
                <Link to='/JustBuy/' onClick={handleLogout}>
                    <button>Logout</button>
                </Link>
            </div>
        </div>
    );
};
