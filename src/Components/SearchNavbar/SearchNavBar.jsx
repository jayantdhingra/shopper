import React, { useContext, useState } from 'react';
import './SearchNavBar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import favorite_icon from '../Assets/favorite_icon.png';
import { Link} from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

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

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="Shop Logo" />
                <p>JUST BUY</p>
            </div>

            <ul className="nav-menu">
                <li onClick={() => setMenu("shop")}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => setMenu("men")}>
                    <Link style={{ textDecoration: 'none' }} to="/men">Men</Link>
                    {menu === "men" && <hr />}
                </li>
                <li onClick={() => setMenu("women")}>
                    <Link style={{ textDecoration: 'none' }} to="/women">Women</Link>
                    {menu === "women" && <hr />}
                </li>
                <li onClick={() => setMenu("kid")}>
                    <Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link>
                    {menu === "kid" && <hr />}
                </li>
            </ul>

            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Search for products"
                    value={query}
                    onChange={handleInputChange} 
                />
                <button onClick={() => onSearch(query.trim())}>Search</button>
            </div>

            <div className="nav-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/favorites'>
                    <img src={favorite_icon} alt="Favorites" className="nav-icon" />
                </Link>
                
                <div className="nav-cart-count">{getTotalFavoriteItems()}</div>

                <Link to='/cart'>
                    <img src={cart_icon} alt="Cart" className="nav-icon" />
                </Link>

                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
};
