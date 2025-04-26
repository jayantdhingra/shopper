// import React from "react";
// import './RelatedProducts.css';
// import data_product from "../Assets/data";
// import Item from "../Item/Item";
// const RelatedProducts = () => {
//   return (
//     <div className='relatedproducts'>
//       <h1>Related Products</h1>
//       <hr />
//       <div className="relatedproducts-item">
//         {data_product.map((item, i) => {
//           return <Item key={i}
//             id={item.id}
//             name={item.name}
//             image={item.image}
//             new_price={item.new_price}
//             old_price={item.old_price} />
//         })}
//       </div>
//     </div>
//   )
// }

// export default RelatedProducts













import React, { useEffect, useState } from "react";
import './RelatedProducts.css';
import Item from "../Item/Item";
import axios from "axios";

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const BASE_URL = "http://localhost:8081"; // Adjust if needed

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!productId) return; // No product selected

      try {
        const res = await axios.get(`${BASE_URL}/api/products/${productId}/related`);
        setRelatedProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch related products:", err.message);
        setRelatedProducts([]);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((item) => (
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
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
