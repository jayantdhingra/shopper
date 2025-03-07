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
    const [favorites, setFavorites] = useState([]); // ✅ Initialize favorites as an empty array

    const addToFavorites = (productId) => {
        console.log("Adding to favorites:", productId);
        toast.success('Item added to favorites!', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        if (!favorites.includes(productId)) {
            setFavorites([...favorites,  all_product.find((product) => product.id === Number(productId)) ]);
        }
        
    };

    const removeFromFavorites = (productId) => {
        console.log("Removing from favorites:", productId);
        setFavorites(favorites.filter((product) => product.id !== productId));
    };


    const addToCart = (itemId, size) => {
        const cartKey = `${itemId}_${size}`;

        toast.success('Item added to cart!', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

        setCartItems((prev) => {
            const updatedCart = {
                ...prev,
                [cartKey]: prev[cartKey]
                    ? { ...prev[cartKey], quantity: prev[cartKey].quantity + 1 }
                    : { quantity: 1, size }
            };

            console.log("Updated Cart Items:", updatedCart);
            return updatedCart;
        });
    };


    const removeFromCart = (itemId, size) => {
        const cartKey = `${itemId}_${size}`;

        setCartItems((prev) => {
            if (!prev[cartKey]) return prev;

            const updatedCart = { ...prev };

            if (updatedCart[cartKey].quantity > 1) {
                updatedCart[cartKey] = { ...updatedCart[cartKey], quantity: updatedCart[cartKey].quantity - 1 };
            } else {
                delete updatedCart[cartKey];
            }

            return updatedCart;
        });
    };



    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const key in cartItems) {
            if (cartItems[key].quantity > 0) {
                const [productId, size] = key.split("_");
                let itemInfo = all_product.find((product) => product.id === Number(productId));

                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[key].quantity;
                }
            }
        }

        return totalAmount.toFixed(2); // ✅ Format to 2 decimal places
    };

    const getTotalCartItems = () => {
        let totalItems = 0;

        for (const key in cartItems) {
            if (cartItems[key].quantity > 0) {
                totalItems += cartItems[key].quantity;
            }
        }

        return totalItems;
    };

    const getTotalFavoriteItems = () => {
        return favorites.length; // ✅ Returns total favorite items count
    };
    

    const contextValue = {
        getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, favorites,           // ✅ Expose favorites
        addToFavorites, removeFromFavorites, getTotalFavoriteItems
    };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;