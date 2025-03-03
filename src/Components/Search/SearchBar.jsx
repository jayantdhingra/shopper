import React, { useState } from "react";
import "./SearchBar.css"; // ✅ Import CSS file

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query.toLowerCase()); // ✅ Pass search query to parent
    };

    return (
        <div className="search-container">
            <input 
                type="text" 
                placeholder="Search for products" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
        </div>
    );
};

export default SearchBar;
