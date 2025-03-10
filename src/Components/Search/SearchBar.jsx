import React, { useState } from "react";
import "./SearchBar.css"; //  Import CSS file
import SearchIcon from "../Assets/search-icon.svg"

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query.toLowerCase()); //  Pass search query to parent
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
            <button onClick={handleSearch} className="search-button">
                <img src={SearchIcon} alt=""/>
            </button>
        </div>
    );
};

export default SearchBar;
