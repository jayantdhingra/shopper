import React, {useState} from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import favoriteIcon from "../Assets/favorite_icon.png"; 
import favoriteFilledIcon from "../Assets/fav_icon.png";

const Item = (props) => {
    const [favorites, setFavorites] = useState(new Set()); //  Track favorites
    const toggleFavorite = (itemId) => {
      setFavorites((prevFavorites) => {
        const newFavorites = new Set(prevFavorites);
        if (newFavorites.has(itemId)) {
          newFavorites.delete(itemId);
        } else {
          newFavorites.add(itemId);
        }
        return new Set(newFavorites);
      });
    };

  return (
    <div className = 'item'>
        <Link to={`/product/${props.id}`}><img src = { props.image } alt = " "/></Link>
        <p>{props.name}</p>
        <div className="item-prices">
        <div className="item-price-old">
                ${props.old_price}
            </div>
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <button type="button" 
                className={`favorite-btn ${favorites.has(props.id) ? "favorited" : ""}`}   
                onClick={() => toggleFavorite(props.id)}>
                  <img src={favorites.has(props.id) ? favoriteFilledIcon : favoriteIcon} alt="Favorite Icon" className="favorite-icon" />
              </button>
        </div>
    </div>
  )
}

export default Item