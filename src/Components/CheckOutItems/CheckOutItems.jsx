import React, { useContext, useEffect, useState } from "react";
import './CheckOutItems.css';
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const CheckOutItems = () => {
    const navigate = useNavigate();
    const {
        getTotalCartAmount,
        all_product,
        cartItems,
        promo,
        applyPromoCode,
        getTotalCartAmountBeforeDiscount
    } = useContext(ShopContext);

    const [totalAmount, setTotalAmount] = useState("0.00");
    const [discountedAmount, setDiscountedAmount] = useState("0.00");
    const [promoCode, setPromoCode] = useState("");

    useEffect(() => {
        const fetchTotal = async () => {
            const total = await getTotalCartAmountBeforeDiscount();
            setTotalAmount(total);
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

    const discountedTotal = promo.applied
        ? (parseFloat(totalAmount) - promo.discount).toFixed(2)
        : totalAmount;

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
                                <p>${parseFloat(product.new_price).toFixed(2)}</p>
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
                            <p>${parseFloat(totalAmount).toFixed(2)}</p>
                        </div>
                        <hr />
                        {promo.applied && (
                            <>
                                <div className="CheckOutItems-total-item">
                                    <p>Promo Discount:</p>
                                    <p>{promo.discount.toFixed(2)}%</p>
                                </div>
                                <hr />
                            </>
                        )}
                        <div className="CheckOutItems-total-item">
                            <p>Shipping Fee:</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="CheckOutItems-total-item">
                            <h3>Total:</h3>
                            <h3>${discountedAmount}</h3>
                        </div>
                    </div>
                </div>

                <div className="CheckOutItems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="CheckOutItems-promobox">
                        <input
                            type="text"
                            placeholder="Enter Promo Code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={promo.applied?true:false}
                        /><br /><br />
                        <button onClick={handleApplyPromo}>Apply</button>
                        {!promo.applied && <p style={{ color: 'red' }} className="promo-error">Invalid Promo Code</p>}
                        {promo.applied && <p style={{ color: 'green' }} className="promo-success">Promo code applied successfully!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutItems;
