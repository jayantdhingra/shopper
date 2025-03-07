import React, {useState,useContext} from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import favoriteIcon from "../Assets/favorite_icon.png"; 
import favoriteFilledIcon from "../Assets/fav_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const Item = (props) => {
    const [fav, setFav] = useState(new Set()); //  Track favorites
    const { addToCart, addToFavorites, removeFromFavorites, favorites = [] } = useContext(ShopContext);
    const isFavorited = favorites.find((product) => product.id === Number(props.id))
    const toggleFavorite = (itemId) => {
      setFav((prevFavorites) => {
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
                className={`favorite-btn ${fav.has(props.id) ? "favorited" : ""}`}   
                onClick={() => {toggleFavorite(props.id) ;
                 isFavorited ? removeFromFavorites(props.id) : addToFavorites(props.id)}}>
                  <img src={fav.has(props.id) ? favoriteFilledIcon : favoriteIcon} alt="Favorite Icon" className="favorite-icon" />
              </button>
        </div>
    </div>
  )
}

export default Item