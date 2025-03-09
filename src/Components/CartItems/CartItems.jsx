import React, { useContext } from "react";
import './CartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import Minus from "../Assets/minus-icon.svg"
import Plus from "../Assets/plus-icon.svg"
import { useNavigate } from "react-router-dom";

const CartItems = () => {
    const Navigate = useNavigate();
    const { getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart } = useContext(ShopContext);
    const isCartEmpty = Object.keys(cartItems).filter(key => cartItems[key].quantity > 0).length === 0;


    console.log(isCartEmpty)

    return (
        <div className='cartitems'>
            {isCartEmpty ? (
                //  Display this when cart is empty
                <div className="cart-empty">
                    <h2>Your Cart is Empty</h2>
                    <p>Browse our categories and discover our best deals!</p>
                    <button onClick={() => Navigate('/')}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div className="cartitems-format-main">
                        <p>Products</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Size</p>
                        <p>Quantity</p>
                        <p>Total</p>
                    </div>
                    <hr />

                    {Object.keys(cartItems).map((cartKey) => {
                        const [productId, size] = cartKey.split("_"); // Extract product ID and size
                        const product = all_product.find((p) => p.id === parseInt(productId));

                        if (!product || !cartItems[cartKey] || cartItems[cartKey].quantity <= 0) return null;

                        return (
                            <div key={cartKey}>
                                <div className="cartitems-format cartitems-format-main">
                                    <img src={product.image} alt="" className='carticon-product-icon' />
                                    <p>{product.name}</p>
                                    <p>${product.new_price}</p>
                                    <p>{size}</p>
                                    <div className="quantity-control">
                                        <img
                                            className='cartitems-remove-icon'
                                            src={Minus}
                                            onClick={() => removeFromCart(product.id, size)}
                                            alt="Remove"
                                        />
                                        <button className='cartitems-quantity'>{cartItems[cartKey].quantity}</button>
                                        <img className='cartitems-add-icon'
                                            src={Plus}
                                            onClick={() => addToCart(product.id, size)}
                                            alt="Add"
                                        />
                                    </div>
                                    <p>${(product.new_price * cartItems[cartKey].quantity).toFixed(2)}</p>
                                </div>
                                <hr />
                            </div>
                        );
                    })}


                    <div className="cartitems-down">
                        <div className="cartitems-total">
                            <h1>cart Totals</h1>
                            <div>
                                <div className="cartitems-total-item">
                                    <p>Subtotal</p>
                                    <p>${getTotalCartAmount()}</p>
                                </div>
                                <hr />
                                <div className="cartitems-total-item">
                                    <p>Shipping Fee</p>
                                    <p>Free</p>
                                </div>
                                <hr />
                                <div className="cartitems-total-item">
                                    <h3>Total</h3>
                                    <h3>${getTotalCartAmount()}</h3>
                                </div>
                            </div>
                            <button onClick={() => Navigate('/checkout-address')}>Proceed to Checkout</button>
                        </div>
                        <div className="cartitems-promocode">
                            <p>If you have a promo code, Enter it here</p>
                            <div className="cartitems-promobox">
                                <input type="text" placeholder='Enter Promo Code' />
                                <button>Apply</button>
                            </div>
                        </div>
                    </div >
                </>
            )}
        </div>
    )
}

export default CartItems