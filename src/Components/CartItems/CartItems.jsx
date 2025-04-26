import React, { useContext, useEffect, useState } from "react";
import './CartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import Minus from "../Assets/minus-icon.svg";
import Plus from "../Assets/plus-icon.svg";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
    const navigate = useNavigate();
    const { 
        cartItems, 
        addProduct, 
        removeFromCart, 
        getTotalCartAmount, 
        getTotalCartAmountBeforeDiscount, 
        applyPromoCode,
        promo
    } = useContext(ShopContext);

    const [cartTotal, setCartTotal] = useState("0.00");
    const [discountedAmount, setDiscountedAmount] = useState("0.00");
    const [promoCode, setPromoCode] = useState("");


    const isCartEmpty = Object.keys(cartItems).filter(key => cartItems[key].quantity > 0).length === 0;

    useEffect(() => {
        const fetchTotal = async () => {
            const total = await getTotalCartAmountBeforeDiscount();
            setCartTotal(total);
        };
        fetchTotal();

        const fetchDiscountedTotal = async () => {
            const discount = await getTotalCartAmount();
            setDiscountedAmount(discount);
        };
        fetchDiscountedTotal();
    }, [cartItems,promo]);

    const handleApplyPromo = () => {
        applyPromoCode(promoCode);
    };

    return (
        <div className='cartitems'>
            {isCartEmpty ? (
                <div className="cart-empty">
                    <h2>Your Cart is Empty</h2>
                    <p>Browse our categories and discover our best deals!</p>
                    <button onClick={() => navigate('/')}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div className="cartitems-format-main">
                        <p>Title</p>
                        <p>Price</p>
                        <p>Size</p>
                        <p>Quantity</p>
                        <p>Total</p>
                    </div>
                    <hr />

                    {Object.keys(cartItems).map((cartKey) => {
                        const cartItem = cartItems[cartKey];
                        return (
                            <div key={cartKey}>
                                <div className="cartitems-format cartitems-format-main">
                                    {/* Image removed */}
                                    <p>{cartItem.Name}</p>
                                    <p>${parseFloat(cartItem.Price).toFixed(2)}</p>
                                    <p>{cartItem.Size}</p>
                                    <div className="quantity-control">
                                        <img
                                            className='cartitems-remove-icon'
                                            src={Minus}
                                            onClick={() => removeFromCart(cartItem.Product_ID, cartItem.Size)}
                                            alt="Remove"
                                        />
                                        <button className='cartitems-quantity'>{cartItem.quantity}</button>
                                        <img
                                            className='cartitems-add-icon'
                                            src={Plus}
                                            onClick={() => addProduct(cartItem.Product_ID, cartItem.Size)}
                                            alt="Add"
                                        />
                                    </div>
                                    <p>${(parseFloat(cartItem.Price) * cartItem.quantity).toFixed(2)}</p>
                                </div>
                                <hr />
                            </div>
                        );
                    })}

                    <div className="cartitems-down">
                        <div className="cartitems-total">
                            <h1>Cart Totals</h1>
                            <div>
                                <div className="cartitems-total-item">
                                    <p>Subtotal</p>
                                    <p>${parseFloat(cartTotal).toFixed(2)}</p>
                                </div>
                                <hr />
                                {promo.applied && (
                                    <>
                                        <div className="cartitems-total-item">
                                            <p>Promo Discount</p>
                                            <p>-10%</p>
                                        </div>
                                        <hr />
                                    </>
                                )}
                                <div className="cartitems-total-item">
                                    <p>Shipping Fee</p>
                                    <p>Free</p>
                                </div>
                                <hr />
                                <div className="cartitems-total-item">
                                    <h3>Total</h3>
                                    <h3>${discountedAmount}</h3>
                                </div>
                            </div>
                            <button onClick={() => navigate('/checkout-address')}>Proceed to Checkout</button>
                        </div>

                        <div className="cartitems-promocode">
                            <p>If you have a promo code, enter it here</p>
                            <div className="cartitems-promobox">
                                <input
                                    type="text"
                                    placeholder="Enter Promo Code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    disabled={promo.applied?true:false}
                                />
                                <button onClick={handleApplyPromo}>Apply</button>
                            </div>
                            {!promo.applied && <p style={{ color: 'red' }} className="promo-error">Invalid Promo Code</p>}
                            {promo.applied && <p style={{ color: 'green' }} className="promo-success">Promo code applied successfully!</p>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartItems;
