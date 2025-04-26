// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import ProductCard from '../ProductCard.jsx';
// import '../SearchPage.css';

// const SearchPage = () => {
//     const location = useLocation();
//     const { searchResults = [], recommendedProducts = [] } = location.state || {};

//     return (
//         <div className="search-results-wrapper">
//             <h2>Search Results</h2>
//             <div className="product-grid">
//                 {searchResults.length > 0 ? (
//                     searchResults.map(product => (
//                         <ProductCard key={product.Product_ID} product={product} />
//                     ))
//                 ) : (
//                     <p>No products found.</p>
//                 )}
//             </div>

//             <h3>Recommended for You</h3>
//             <div className="product-grid">
//                 {recommendedProducts.length > 0 ? (
//                     recommendedProducts.map(product => (
//                         <ProductCard key={product.Product_ID} product={product} />
//                     ))
//                 ) : (
//                     <p>No recommendations available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchPage;



import React from 'react';
import { useLocation } from 'react-router-dom';
import Item from '../Item/Item.jsx';
import '../SearchPage.css';

const SearchPage = () => {
    const location = useLocation();
    const { searchResults = [], recommendedProducts = [] } = location.state || {};

    return (
        <div className="search-results-wrapper">
            <h2>Search Results</h2>
            <div className="product-grid">
                {searchResults.length > 0 ? (
                    searchResults.map(product => (
                        <Item
                            key={product.Product_ID}
                            id={product.Product_ID}
                            name={product.Name}
                            image={product.Image_URL}
                            new_price={product.Price}
                            old_price={product.Original_Price || (product.Price + 20)} // fallback
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            <h3>Recommended for You</h3>
            <div className="product-grid">
                {recommendedProducts.length > 0 ? (
                    recommendedProducts.map(product => (
                        <Item
                            key={product.Product_ID}
                            id={product.Product_ID}
                            name={product.Name}
                            image={product.Image_URL}
                            new_price={product.Price}
                            old_price={product.Original_Price || (product.Price + 20)} // fallback
                        />
                    ))
                ) : (
                    <p>No recommendations available.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
