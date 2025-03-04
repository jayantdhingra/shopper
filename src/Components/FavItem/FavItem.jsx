import React from 'react'
import { useContext } from 'react'
import './FavItem.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import favorite_filled from '../Assets/fav_icon.png';
import favorite_outline from '../Assets/favorite_icon.png';

const FavItem = (props) => {
  const { product } = props;
  console.log('HERE: ',props)
    const { addToCart, addToFavorites, removeFromFavorites, favorites = [] } = useContext(ShopContext);
    // const isFavorited = favorites.includes(props);
    const isFavorited = favorites.find((product) => product.id === Number(props.id))
    console.log('isFavorited: ',isFavorited)
  return (
    <div className = 'FavItem'>
        {/* <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src = { props.image } alt = " "/>        
          <div className="favorite-button"
              onClick={() => isFavorited ? removeFromFavorites(product.id) : addToFavorites(product.id)}
          >
              <img
                  src={isFavorited ? favorite_filled : favorite_outline}
                  alt="Favorite Icon"
                  className="favorite-icon"
              />
          </div>
        </Link> */}
        <div className="productdisplay-img">
          <div
              className="favorite-button"
              onClick={() => isFavorited ? removeFromFavorites(props.id) : addToFavorites(props.id)}
          >
              <img
                  src={isFavorited ? favorite_filled : favorite_outline}
                  alt="Favorite Icon"
                  className="favorite-icon"
              />
          </div>
          <img src={props.image} alt="" />
        </div>
        <p>{props.name}</p>
        <div className="FavItem-prices">
            <div className="FavItem-price-new">
                ${props.new_price}
            </div>
            <div className="FavItem-price-old">
                ${props.old_price}
            </div>
            {/* <img src = { props.fav_icon } alt = " " className='fav-icon'/> */}
        </div>
    </div>
  )
}

export default FavItem