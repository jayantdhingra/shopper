import React, { useContext } from "react";
import './CheckOutItems.css';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from "react-router-dom";

const CheckOutItems = () => {
    const Navigate = useNavigate();
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    return (
        <div className='CheckOutItems'>
            <div className="CheckOutItems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Size</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {Object.keys(cartItems)
                .filter((cartKey) => cartItems[cartKey].quantity > 0) // ✅ Filter out unselected items
                .map((cartKey) => {
                    const [productId, size] = cartKey.split("_"); // ✅ Extract product ID and size
                    const product = all_product.find((p) => p.id === Number(productId));

                    if (!product) return null; // ✅ Ensure product exists

                    return (
                        <div key={cartKey}>
                            <div className="CheckOutItems-format CheckOutItems-format-main">
                                <img src={product.image} alt="" className='carticon-product-icon' />
                                <p>{product.name}</p>
                                <p>${product.new_price}</p>
                                <p>{size}</p> {/* ✅ Display selected size */}
                                <button className='CheckOutItems-quantity'>{cartItems[cartKey].quantity}</button>
                                <p>${(product.new_price * cartItems[cartKey].quantity).toFixed(2)}</p>
                                <img
                                    className='CheckOutItems-remove-icon'
                                    src={remove_icon}
                                    onClick={() => removeFromCart(product.id, size)}
                                    alt="Remove"
                                />
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
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="CheckOutItems-total-item">
                            <p>Shipping Fee:</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="CheckOutItems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    {/* <button onClick={() => Navigate('/checkout-address')}>Proceed to Checkout</button> */}
                </div>
                <div className="CheckOutItems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="CheckOutItems-promobox">
                        <input type="text" placeholder='Enter Promo Code' /><br/><br/>
                        <button>Apply</button>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default CheckOutItems