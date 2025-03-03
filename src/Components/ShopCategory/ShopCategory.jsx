import React, { useContext, useState, useEffect, useRef } from "react";
import "./ShopCategory.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = ({ category, banner, searchQuery }) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("default");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [category]);

  const handleExploreMore = () => {
    const currentScroll = window.scrollY;  
    setShowAll(true);
    setTimeout(() => {
      window.scrollTo(0, currentScroll); 
    }, 0);
  };

  
  const categoryProducts = all_product.filter(item =>
    item.category.toLowerCase() === category.toLowerCase()
  );

  let filteredProducts = categoryProducts.filter(item =>
    !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (sortOption === "price-low") {
    filteredProducts.sort((a, b) => a.new_price - b.new_price);
  } else if (sortOption === "price-high") {
    filteredProducts.sort((a, b) => b.new_price - a.new_price);
  } else if (sortOption === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }


  const initialProducts = filteredProducts.slice(0, 9);
  const remainingProducts = filteredProducts.slice(9);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span><strong>Showing {showAll ? filteredProducts.length : initialProducts.length}</strong></span>
          out of <strong>{categoryProducts.length}</strong> products
        </p>
        <div className="shopcategory-sort">
          <label>Sort by:</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

     
      <div className="shopcategory-products">
        {initialProducts.map((item) => (
          <div key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} />
            </Link>

            <p>{item.name}</p>
            <p>${item.new_price}</p>
          </div>
        ))}
        {showAll && remainingProducts.map((item) => (
          <div key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} />
            </Link>

            <p>{item.name}</p>
            <p>${item.new_price}</p>
          </div>
        ))}
      </div>


     
      {!showAll && remainingProducts.length > 0 && (
        <div className="shopcategory-loadmore" onClick={handleExploreMore}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
