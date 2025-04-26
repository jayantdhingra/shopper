// import React, { useState } from "react";
// import "./SearchBar.css"; //  Import CSS file
// import SearchIcon from "../Assets/search-icon.svg"

// const SearchBar = ({ onSearch }) => {
//     const [query, setQuery] = useState("");

//     const handleSearch = () => {
//         onSearch(query.toLowerCase()); //  Pass search query to parent
//     };

//     return (
//         <div className="search-container">
//             <input 
//                 type="text" 
//                 placeholder="Search for products" 
//                 value={query} 
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="search-input"
//             />
//             <button onClick={handleSearch} className="search-button">
//                 <img src={SearchIcon} alt=""/>
//             </button>
//         </div>
//     );
// };

// export default SearchBar;



// import React, { useState } from "react";
// import "./SearchBar.css";
// import SearchIcon from "../Assets/search-icon.svg";
// import axios from "axios";

// const SearchBar = ({ userId, setSearchResults, setRecommendedProducts }) => {
//     const [query, setQuery] = useState("");
//     console.log(userId, setSearchResults);

//     const handleSearch = async () => {
//         const cleanQuery = query.trim().toLowerCase();
//         if (!cleanQuery) return;

//         try {
//             // 🔍 Step 1: Perform search
//             const searchRes = await axios.post("/api/search", {
//                 userId,
//                 searchQuery: cleanQuery
//             });

//             setSearchResults(searchRes.data);
//             console.log(searchRes.data);

//             // 🎯 Step 2: Fetch recommendations based on search history
//             const recRes = await axios.get(`/api/recommend/search/${userId}`);
//             if (recRes.data && Array.isArray(recRes.data)) {
//                 setRecommendedProducts(recRes.data);
//             } else {
//                 setRecommendedProducts([]);
//             }

//         } catch (err) {
//             console.error("Search error:", err);
//             setSearchResults([]);
//             setRecommendedProducts([]);
//         }
//     };

//     return (
//         <div className="search-container">
//             <input 
//                 type="text" 
//                 placeholder="Search for products" 
//                 value={query} 
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="search-input"
//             />
//             <button onClick={handleSearch} className="search-button">
//                 <img src={SearchIcon} alt="Search" />
//             </button>
//         </div>
//     );
// };

// export default SearchBar;
