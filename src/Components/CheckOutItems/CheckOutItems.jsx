import React, { useContext, useEffect, useState } from "react";
import './CheckOutItems.css';
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const CheckOutItems = () => {
    const navigate = useNavigate();
    const { getTotalCartAmount, all_product, cartItems } = useContext(ShopContext);
    const [totalAmount, setTotalAmount] = useState("0.00");

    useEffect(() => {
        const fetchTotal = async () => {
            const total = await getTotalCartAmount();
            setTotalAmount(total);
        };
        fetchTotal();
    }, [cartItems]);

    return (
        <div className='CheckOutItems'>
            <div className="CheckOutItems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Size</p>
                <p>Quantity</p>
                <p>Total</p>
            </div>
            <hr />

            {Object.keys(cartItems)
                .filter((cartKey) => cartItems[cartKey].quantity > 0)
                .map((cartKey) => {
                    const [productId, size] = cartKey.split("_");
                    const product = all_product.find((p) => p.id === Number(productId));
                    if (!product) return null;

                    return (
                        <div key={cartKey}>
                            <div className="CheckOutItems-format CheckOutItems-format-main">
                                <img src={product.image} alt={product.name} className='carticon-product-icon' />
                                <p>{product.name}</p>
                                <p>${product.new_price}</p>
                                <p>{size}</p>
                                <button className='CheckOutItems-quantity'>{cartItems[cartKey].quantity}</button>
                                <p>${(product.new_price * cartItems[cartKey].quantity).toFixed(2)}</p>
                            </div>
                            <hr />
                        </div>
                    );
                })}

            <div className="CheckOutItems-down">
                <div className="CheckOutItems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="CheckOutItems-total-item">
                            <p>Subtotal:</p>
                            <p>${totalAmount}</p>
                        </div>
                        <hr />
                        <div className="CheckOutItems-total-item">
                            <p>Shipping Fee:</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="CheckOutItems-total-item">
                            <h3>Total</h3>
                            <h3>${totalAmount}</h3>
                        </div>
                    </div>
                </div>

                <div className="CheckOutItems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="CheckOutItems-promobox">
                        <input type="text" placeholder='Enter Promo Code' /><br /><br />
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutItems;
