import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.Image_URL} alt={product.Name} />
            <h3>{product.Name}</h3>
            <p>${product.Price}</p>
        </div>
    );
};

export default ProductCard;
