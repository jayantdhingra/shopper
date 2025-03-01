import React, { useState, createContext } from "react";
import all_product from "../Components/Assets/all_product";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
      
    const addToCart = (itemId,size) => {
        const cartKey = `${itemId}_${size}`;
        toast.success('Item added to cart!', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
      
        // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        setCartItems((prev) => ({
            ...prev,
            [cartKey]: prev[cartKey]
            ? { ...prev[cartKey], quantity: prev[cartKey].quantity + 1 }
            : { quantity: 1, size }
        }));
    
        console.log(cartItems);
    }

    // const removeFromCart = (itemId) => {
    //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    // }

    // const removeFromCart = (itemId) => {
    //     setCartItems((prev) => {
    //         if (!prev[itemId] || prev[itemId].quantity <= 1) {
    //             // Remove item completely if quantity reaches 0
    //             const newCart = { ...prev };
    //             delete newCart[itemId];
    //             return newCart;
    //         }
    //         return {
    //             ...prev,
    //             [itemId]: { ...prev[itemId], quantity: prev[itemId].quantity - 1 }
    //         };
    //     });
    // };

    const removeFromCart = (itemId, size) => {
        const cartKey = `${itemId}_${size}`;
    
        setCartItems((prev) => {
            if (!prev[cartKey] || prev[cartKey].quantity <= 1) {
                const newCart = { ...prev };
                delete newCart[cartKey]; // Remove only the specific size
                return newCart;
            }
            return {
                ...prev,
                [cartKey]: { ...prev[cartKey], quantity: prev[cartKey].quantity - 1 }
            };
        });
    };
    
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
    
        for (const key in cartItems) {
            if (cartItems[key].quantity > 0) { // ✅ Use .quantity to check
                const [productId, size] = key.split("_"); // ✅ Extract ID and Size
                let itemInfo = all_product.find((product) => product.id === Number(productId));
    
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[key].quantity; // ✅ Multiply correctly
                }
            }
        }
    
        return totalAmount.toFixed(2); // ✅ Format to 2 decimal places
    };
    
    const getTotalCartItems = () => {
        let totalItems = 0;
    
        for (const key in cartItems) {
            if (cartItems[key].quantity > 0) { // ✅ Use .quantity
                totalItems += cartItems[key].quantity; // ✅ Add quantity correctly
            }
        }
    
        return totalItems;
    };
    
    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;