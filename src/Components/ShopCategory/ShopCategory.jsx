import React, { useContext, useState, useEffect } from "react";
import "./ShopCategory.css";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import favoriteIcon from "../Assets/favorite_icon.png"; // ✅ Import favorite icon
import favoriteFilledIcon from "../Assets/fav_icon.png"; // ✅ Import filled heart icon

const ShopCategory = ({ category, banner, searchQuery }) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("default");
  const [showAll, setShowAll] = useState(false);
  const [favorites, setFavorites] = useState(new Set()); // ✅ Track favorites

  useEffect(() => {
    setShowAll(false);
  }, [category]);

  const handleExploreMore = () => {
    setShowAll(true);
  };

  // ✅ Toggle favorite status
  const toggleFavorite = (itemId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  // ✅ Filter products by category
  const categoryProducts = all_product.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  // ✅ Apply search filter
  let filteredProducts = [...categoryProducts].filter(
    (item) =>
      !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Sorting logic
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

      {/* ✅ Product List */}
      <div className="shopcategory-products">
        {[...(showAll ? filteredProducts : initialProducts)].map((item) => (
          <div key={item.id} className="product-item">
            <button 
              className={`favorite-btn ${favorites.has(item.id) ? "favorited" : ""}`} 
              onClick={() => toggleFavorite(item.id)}
            >
              <img 
                src={favorites.has(item.id) ? favoriteFilledIcon : favoriteIcon} 
                alt="Favorite" 
              />
            </button>

            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} className="product-image" />
            </Link>
            <p className="product-name">{item.name}</p>
            <div className="product-prices">
              {item.old_price && (
                <p className="product-price-old">${item.old_price.toFixed(2)}</p>
              )}
              <p className="product-price-new">${item.new_price.toFixed(2)}</p>
            </div>

          </div>
        ))}
      </div>

      {/* ✅ "Explore More" Button */}
      {!showAll && remainingProducts.length > 0 && (
        <button className="shopcategory-loadmore" onClick={handleExploreMore}>
          Explore More
        </button>
      )}
    </div>
  );
};

export default ShopCategory;
