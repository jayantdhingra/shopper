import React, { useContext, useEffect, useState } from 'react';
import './SearchNavBar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import favorite_icon from '../Assets/favorite_icon.png';
import SearchIcon from '../Assets/search-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Hamburger from '../Hamburger/Hamburger';

export const SearchNavBar = () => {
    const [menu, setMenu] = useState("shop");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { getTotalCartItems, getTotalFavoriteItems } = useContext(ShopContext);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [userId, setUserId] = useState(null);
    
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    useEffect(() => {
        const checkAuthStatus = () => setIsLoggedIn(!!localStorage.getItem("token"));
        window.addEventListener("authChange", checkAuthStatus);
        return () => window.removeEventListener("authChange", checkAuthStatus);
    }, []);

    useEffect(() => {
        if (localStorage.getItem('menu')) {
            setMenu(localStorage.getItem('menu'));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
        alert('You have logged out!');
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId || decoded.id || decoded.sub);
            setIsLoggedIn(true);
          } catch (err) {
            console.error("Invalid token:", err);
          }
        }
    }, []);

    const handleSearch = async () => {
        const cleanQuery = query.trim().toLowerCase();
        if (!cleanQuery) return;
    
        try {
            const token = localStorage.getItem("token");
            const BASE_URL = "http://localhost:8081";
    
            const searchRes = await axios.post(`${BASE_URL}/api/search`, {
                userId,
                searchQuery: cleanQuery
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log("Search response:", searchRes.data);
    
            // ✅ Check if data is an array (valid results)
            const searchData = Array.isArray(searchRes.data)
                ? searchRes.data
                : searchRes.data.products || [];
    
            const noResultsFound = !Array.isArray(searchRes.data) || searchData.length === 0;
    
            // 🔥 Enrich search results (only if we have them)
            const enrichedSearchResults = await Promise.all(
                searchData.map(async (product) => {
                    try {
                        const imgRes = await axios.get(`${BASE_URL}/api/products/images/${product.Product_ID}`);
                        const firstImage = imgRes.data.images?.[0] || null;
                        return { ...product, Image_URL: firstImage };
                    } catch (err) {
                        console.error(`Error fetching image for product ${product.Product_ID}`, err);
                        return { ...product, Image_URL: null };
                    }
                })
            );
    
            // 🔥 Always fetch recommended products
            let enrichedRecommendations = [];
            try {
                const recRes = await axios.get(`${BASE_URL}/api/recommendations/search/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                enrichedRecommendations = await Promise.all(
                    recRes.data.map(async (product) => {
                        try {
                            const imgRes = await axios.get(`${BASE_URL}/api/products/images/${product.Product_ID}`);
                            const firstImage = imgRes.data.images?.[0] || null;
                            return { ...product, Image_URL: firstImage };
                        } catch (err) {
                            console.error(`Error fetching image for product ${product.Product_ID}`, err);
                            return { ...product, Image_URL: null };
                        }
                    })
                );
            } catch (err) {
                console.error("Recommendation fetch failed:", err);
            }
    
            // ✅ Navigate with results or empty state
            navigate(`/search?query=${encodeURIComponent(cleanQuery)}`, {
                state: {
                    searchResults: enrichedSearchResults,
                    recommendedProducts: enrichedRecommendations,
                    noResultsFound
                }
            });
    
        } catch (err) {
            console.error("Search error:", err);
    
            // ✅ On search API error, still redirect with no results
            navigate(`/search?query=${encodeURIComponent(cleanQuery)}`, {
                state: {
                    searchResults: [],
                    recommendedProducts: [],
                    noResultsFound: true
                }
            });
        }
    };

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="Shop Logo" />
                <p>JUST BUY</p>
            </div>

            <ul className={`nav-menu ${hamburgerOpen ? 'open' : ''}`}>
                <li onClick={() => {setMenu("shop"); localStorage.setItem('menu','shop'); setHamburgerOpen(false); }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> 
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => {setMenu("men"); localStorage.setItem('menu','men'); setHamburgerOpen(false); }}>
                    <Link style={{ textDecoration: 'none' }} to="/men">Men</Link> 
                    {menu === "men" && <hr />}
                </li>
                <li onClick={() => {setMenu("women"); localStorage.setItem('menu','women'); setHamburgerOpen(false); }}>
                    <Link style={{ textDecoration: 'none' }} to="/women">Women</Link>  
                    {menu === "women" && <hr />}
                </li>
                <li onClick={() => {setMenu("kid"); localStorage.setItem('menu','kid'); setHamburgerOpen(false); }}>
                    <Link style={{ textDecoration: 'none' }} to="/kids">Kids</Link>
                    {menu === "kid" && <hr />}
                </li>
                <li onClick={() => {setMenu("Settings"); localStorage.setItem('menu','Settings'); setHamburgerOpen(false); }}>
                    <Link style={{ textDecoration: 'none' }} to="/user-settings">Settings</Link>
                    {menu === "Settings" && <hr />}
                </li>
                <li onClick={() => {setMenu("chat"); setHamburgerOpen(false); }}><Link style={{ textDecoration: 'none' }}  to="/chat">Chat</Link> {menu === "chat" && <hr />}</li>

                
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
                <button onClick={handleSearch}>
                    <img src={SearchIcon} alt="Search" />
                </button>
            </div>

            <ul className={`nav-login-cart ${hamburgerOpen ? 'open' : ''}`}>
                {/* <div > */}
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
                {/* </div> */}
            </ul>

            {/* <div className="nav-login-cart">
                <Link to='/orders'><button className='nav-orders-btn'>My Orders</button></Link>
                <Link to='/favorites'><img src={favorite_icon} alt="Favorites" className="nav-icon" /></Link>
                <div className="nav-cart-count">{getTotalFavoriteItems()}</div>
                <Link to='/cart'><img src={cart_icon} alt="Cart" className="nav-icon" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
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
                    top: 440px;
                    width: 100%;
                    background-color: white;
                    padding-top: 20px;
                    text-align: center;
                    z-index: 5;
                }                

                .nav-menu.open li{
                    margin-bottom: 0px;
                    font-size: 40px;
                }

                .nav-login-cart.open li{
                    margin-bottom: 20px;
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
                        top: 530px;
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


