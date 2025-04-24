import React, { useContext, useEffect, useState } from 'react';
import './SearchNavBar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import favorite_icon from '../Assets/favorite_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import SearchIcon from '../Assets/search-icon.svg'

export const SearchNavBar = ({ onSearch }) => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const { getTotalFavoriteItems } = useContext(ShopContext);
    const [query, setQuery] = useState("");
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
                <li onClick={() => {setMenu("shop"); localStorage.setItem('menu','shop')}}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> 
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => {setMenu("men"); localStorage.setItem('menu','men')}}>
                    <Link style={{ textDecoration: 'none' }} to="/men">Men</Link> 
                    {menu === "men" && <hr />}
                </li>
                <li onClick={() => {setMenu("women"); localStorage.setItem('menu','women')}}>
                    <Link style={{ textDecoration: 'none' }} to="/women">Women</Link>  
                    {menu === "women" && <hr />}
                </li>
                <li onClick={() => {setMenu("kid"); localStorage.setItem('menu','kid')}}>
                    <Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link>
                    {menu === "kid" && <hr />}
                </li>
                <li onClick={() => {setMenu("Settings"); localStorage.setItem('menu','Settings')}}>
                    <Link style={{ textDecoration: 'none' }} to="/user-settings">Settings</Link>
                    {menu === "Settings" && <hr />}
                </li>
                <li onClick={() => setMenu("chat")}><Link style={{ textDecoration: 'none' }}  to="/chat">Chat</Link> {menu === "chat" && <hr />}</li>
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
                <Link to='/orders'>
                                <button className='nav-orders-btn'>My Orders</button>
                            </Link>
                <Link to='/favorites'>
                    <img src={favorite_icon} alt="Favorites" className="nav-icon" />
                </Link>

                <div className="nav-cart-count">{getTotalFavoriteItems()}</div>

                <Link to='/cart'>
                    <img src={cart_icon} alt="Cart" className="nav-icon" />
                </Link>

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
