import React, { useContext, useState } from "react";
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from "../../Context/ShopContext";
import { ToastContainer } from "react-toastify";
import favorite_filled from '../Assets/fav_icon.png';
import favorite_outline from '../Assets/favorite_icon.png';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, addToFavorites, removeFromFavorites, favorites = [] } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState("");
    const isFavorited = favorites.includes(product);
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                <div
                    className="favorite-button"
                    onClick={() => isFavorited ? removeFromFavorites(product.id) : addToFavorites(product.id)}
                >
                    <img
                        src={isFavorited ? favorite_filled : favorite_outline}
                        alt="Favorite Icon"
                        className="favorite-icon"
                    />
                </div>
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                {/* This is star rating */}
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    {/* 122 is total rating */}
                    <p>(122)</p>
                </div>


                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweigt, usually knitted, pullover shirt, long-sleeved, collarless, with a short opening at the front.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? "selected" : ""}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (!selectedSize) {
                            alert("Please select a size before adding to cart.");
                            return;
                        }
                        addToCart(product.id, selectedSize);
                    }}
                >
                    ADD TO CART
                </button>
               
                <ToastContainer toastClassName="cart-toast" />
                <p className='productdisplay-right-category'><span>Category :</span> {product.category} , T-shirt, Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags :</span> Modern , Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay