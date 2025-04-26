import React, { useEffect, useState } from "react";
import '../Components/ComplementaryProducts.css';
import Item from "../Components/Item/Item";
import axios from "axios";

const ComplementaryProducts = ({ productId }) => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const BASE_URL = "http://localhost:8081";

  useEffect(() => {
    const fetchComplementary = async () => {
      if (!productId) return;

      try {
        const res = await axios.get(`${BASE_URL}/api/products/${productId}/complementary`);
        setSuggestedProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch complementary products:", err.message);
        setSuggestedProducts([]);
      }
    };

    fetchComplementary();
  }, [productId]);

  return (
    <div className='complementaryproducts'>
      <h1>Suggested Bundle Items</h1>
      <hr />
      <div className="complementaryproducts-item">
        {suggestedProducts.length > 0 ? (
          suggestedProducts.map((item) => (
            <Item
              key={item.Product_ID}
              id={item.Product_ID}
              name={item.Name}
              image={item.Image_URL}
              new_price={item.Price}
              old_price={Math.round(item.Price * 1.2)}
            />
          ))
        ) : (
          <p>No complementary items found.</p>
        )}
      </div>
    </div>
  );
};

export default ComplementaryProducts;
