import React, { useContext, useEffect, useState } from "react";
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from "../../Context/ShopContext";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Must import the styles

import favorite_filled from '../Assets/filled-heart.svg';
import favorite_outline from '../Assets/unfilled-favIcon.svg';
import { jwtDecode } from 'jwt-decode';

const ProductDisplay = () => {
  const { addToCart, addToFavorites, removeFromFavorites,addItemToCartLocal, favorites = [] } = useContext(ShopContext);
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

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

  const isFavorited = favorites.some(product => product.Product_ID === Number(productId));

  const toggleFavorite = async () => {
    if (!userId) {
      alert("Please login to add to favorites.");
      return;
    }

    if (isFavorited) {
      removeFromFavorites(Number(productId));
      try {
        await fetch('http://localhost:8081/api/favourites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ User_ID: userId, Product_ID: Number(productId) }),
        });
      } catch (err) {
        console.error("Error removing favorite:", err);
      }
    } else {
      addToFavorites({ Product_ID: Number(productId) });
      try {
        await fetch('http://localhost:8081/api/favourites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ User_ID: userId, Product_ID: Number(productId) }),
        });
      } catch (err) {
        console.error("Error adding favorite:", err);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);

        const sizes = data.Size ? data.Size.split(",").map(s => s.trim()) : [];
        const colors = data.Color ? data.Color.split(",").map(c => c.trim()) : [];

        if (sizes.length) setSelectedSize(sizes[0]);
        if (colors.length) setSelectedColor(colors[0]);

        const imgRes = await fetch(`http://localhost:8081/api/products/images/${productId}`);
        const imgData = await imgRes.json();
        if (imgData.images && imgData.images.length > 0) {
          setImages(imgData.images);
          setMainImage(imgData.images[0]);
        }
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select both size and color.");
      return;
    }
  
    const payload = {
      User_ID: userId,
      Product_ID: parseInt(productId),
      Quantity: 1,
      Size: selectedSize,
      Color: selectedColor
    };
  
    try {
      const res = await fetch('http://localhost:8081/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (res.ok) {
              toast.success("🛒 Item added to cart!", {
                position: "top-right",
                autoClose: 1000,
                style: { width: "450px", height: "50px", marginRight: "-100px" },
              });
              addItemToCartLocal(parseInt(productId), selectedSize, selectedColor);
      } else {
        const error = await res.json();
        toast.error(`❌ ${error.message || "Add to cart failed"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Server error. Try again.");
    }
  };
  

  if (!product) return <div>Loading product...</div>;

  const sizes = product.Size ? product.Size.split(",").map(s => s.trim()) : [];
  const colors = product.Color ? product.Color.split(",").map(c => c.trim()) : [];

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`thumb-${index}`}
              onClick={() => setMainImage(imgUrl)}
            />
          ))}
        </div>
        <div className="productdisplay-img">
          {isLoggedIn && (
            <div
              className="favorite-button"
              onClick={toggleFavorite}
            >
              <img
                src={isFavorited ? favorite_filled : favorite_outline}
                alt="Favorite Icon"
                className="favorite-icon"
              />
            </div>
          )}
          <img className="productdisplay-main-img" src={mainImage} alt="main" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.Name}</h1>

        <div className="productdisplay-right-star">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={i < Math.floor(product.Rating || 0) ? star_icon : star_dull_icon}
              alt="star"
            />
          ))}
          <p>({Math.floor(product.Rating || 0)})</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${Math.round(product.Price * 1.25)}
          </div>
          <div className="productdisplay-right-price-new">${product.Price}</div>
        </div>

        <div className="productdisplay-right-description">
          {product.Description}
        </div>

        {/* Sizes */}
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {sizes.map((size) => (
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

        {/* Colors */}
        <div className="productdisplay-right-size">
          <h1>Select Color</h1>
          <div className="productdisplay-right-sizes">
            {colors.map((color) => (
              <div
                key={color}
                className={`size-option ${selectedColor === color ? "selected" : ""}`}
                onClick={() => {
                  setSelectedColor(color);
                  const matchedImage = images.find(img =>
                    img.includes(`color=${encodeURIComponent(color)}`)
                  );
                  if (matchedImage) setMainImage(matchedImage);
                }}
              >
                {color}
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleAddToCart}>ADD TO CART</button>

        <ToastContainer toastClassName="cart-toast" />

        <p className="productdisplay-right-category">
          <span>Category :</span> {product.Category_ID}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>{" "}
          {(() => {
            try {
              const tagObj = JSON.parse(product.AI_Tagging);
              return tagObj.tags?.join(", ");
            } catch {
              return "N/A";
            }
          })()}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
