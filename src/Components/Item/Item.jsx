import React, {useState,useContext, useEffect} from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import favoriteIcon from "../Assets/unfilled-favIcon.svg"; 
import favoriteFilledIcon from "../Assets/filled-heart.svg";
import { ShopContext } from '../../Context/ShopContext';

const Item = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(); //  Track favorites
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

    useEffect(()=>{
      setIsLoggedIn(localStorage.getItem("userToken") !== null);  
    })

  return (
    <div className = 'item'>
        {isLoggedIn && <Link to={`/JustBuy/product/${props.id}`}><img src = { props.image } alt = " "/></Link> }
        {!isLoggedIn && <Link to={'/JustBuy/login'}><img src = { props.image } alt = " "/></Link> }
        <p>{props.name}</p>
        <div className="item-prices">
        <div className="item-price-old">
                ${props.old_price}
            </div>
            <div className="item-price-new">
                ${props.new_price}
            </div>
            {isLoggedIn && <button type="button" 
                className={`favorite-btn ${fav.has(props.id) ? "favorited" : ""}`}   
                onClick={() => {toggleFavorite(props.id) ;
                 isFavorited ? removeFromFavorites(props.id) : addToFavorites(props.id)}}>
                  <img src={fav.has(props.id) ? favoriteFilledIcon : favoriteIcon} alt="Favorite Icon" className="favorite-icon" />
              </button>
            }
        </div>
    </div>
  )
}

export default Item