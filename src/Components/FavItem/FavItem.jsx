// import React from 'react'
// import { useContext } from 'react'
// import './FavItem.css'
// import { Link } from 'react-router-dom'
// import { ShopContext } from '../../Context/ShopContext'
// import favorite_filled from '../Assets/filled-heart.svg';
// import favorite_outline from '../Assets/unfilled-favIcon.svg';

// const FavItem = (props) => {
//   const { product } = props;
//   console.log('HERE: ',props)
//     const { addToCart, addToFavorites, removeFromFavorites, favorites = [] } = useContext(ShopContext);
//     // const isFavorited = favorites.includes(props);
//     const isFavorited = favorites.find((product) => product.id === Number(props.id))
//     console.log('isFavorited: ',isFavorited)
//   return (
//     <div className = 'FavItem'>
//         {/* <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src = { props.image } alt = " "/>        
//           <div className="favorite-button"
//               onClick={() => isFavorited ? removeFromFavorites(product.id) : addToFavorites(product.id)}
//           >
//               <img
//                   src={isFavorited ? favorite_filled : favorite_outline}
//                   alt="Favorite Icon"
//                   className="favorite-icon"
//               />
//           </div>
//         </Link> */}
//         <div className="productdisplay-img">
//           <div
//               className="favorite-button"
//               onClick={() => isFavorited ? removeFromFavorites(props.id) : addToFavorites(props.id)}
//           >
//               <img
//                   src={isFavorited ? favorite_filled : favorite_outline}
//                   alt="Favorite Icon"
//                   className="favorite-icon"
//               />
//           </div>
//           <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src = { props.image } alt = " "/></Link>
//         </div>
//         <p>{props.name}</p>
//         <div className="FavItem-prices">
//             <div className="FavItem-price-new">
//                 ${props.new_price}
//             </div>
//             <div className="FavItem-price-old">
//                 ${props.old_price}
//             </div>
//             {/* <img src = { props.fav_icon } alt = " " className='fav-icon'/> */}
//         </div>
//     </div>
//   )
// }

// export default FavItem



import React, { useContext } from "react";
import "./FavItem.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import favorite_filled from "../Assets/filled-heart.svg";
import favorite_outline from "../Assets/unfilled-favIcon.svg";

const FavItem = (props) => {
  const { id, name, image, new_price, old_price } = props;
  const {
    addToFavorites,
    removeFromFavorites,
    favorites = [],
  } = useContext(ShopContext);

  const isFavorited = favorites.some(
    (product) => product.Product_ID === Number(id)
  );

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  return (
    <div className="FavItem">
      <div className="productdisplay-img">
        <div className="favorite-button" onClick={toggleFavorite}>
          <img
            src={isFavorited ? favorite_filled : favorite_outline}
            alt="Favorite Icon"
            className="favorite-icon"
          />
        </div>
        <Link to={`/product/${id}`}>
          <img onClick={() => window.scrollTo(0, 0)} src={image} alt={name} />
        </Link>
      </div>

      <p>{name}</p>

      <div className="FavItem-prices">
        <div className="FavItem-price-new">${new_price}</div>
        <div className="FavItem-price-old">${old_price}</div>
      </div>
    </div>
  );
};

export default FavItem;
