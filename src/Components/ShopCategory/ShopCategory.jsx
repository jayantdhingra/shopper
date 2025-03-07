import React, { useContext, useState, useEffect } from "react";
import "./ShopCategory.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from '../Item/Item'

const ShopCategory = ({ category, banner, searchQuery }) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("default");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [category]);

  const handleExploreMore = () => {
    setShowAll(true);
  };


  //  Filter products by category
  const categoryProducts = all_product.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  //  Apply search filter
  let filteredProducts = [...categoryProducts].filter(
    (item) =>
      !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //  Sorting logic
  switch (sortOption) {
    case "price-low":
      filteredProducts.sort((a, b) => a.new_price - b.new_price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.new_price - a.new_price);
      break;
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  const initialProducts = filteredProducts.slice(0, 9);
  const remainingProducts = filteredProducts.slice(9);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={banner} alt="Category Banner" />

      <div className="shopcategory-indexSort">
        <p>
          <strong>
            Showing {showAll ? filteredProducts.length : initialProducts.length}
          </strong>
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

      {/*  Product List */}
      <div className="shopcategory-products">
        {[...(showAll ? filteredProducts : initialProducts)].map((item,i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}


      </div>

      {/*  "Explore More" Button */}
      {!showAll && remainingProducts.length > 0 && (
        <button className="shopcategory-loadmore" onClick={handleExploreMore}>
          Explore More
        </button>
      )}
    </div>
  );
};

export default ShopCategory;
