import React, { useState, createContext } from "react";
import all_product from "../Components/Assets/all_product";

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


    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        console.log(cartItems);
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    const getTotalCartAmount = () => {
        let totalAmount=0;
        for (const key in cartItems) {
            if(cartItems[key]>0){
                let itemInfo = all_product.find((product) => product.id === Number(key));
            totalAmount += itemInfo.new_price * cartItems[key];
            }
            
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const key in cartItems) {
            if(cartItems[key]>0){
            totalItems += cartItems[key];
            }
        }
        return totalItems;
    }
    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;