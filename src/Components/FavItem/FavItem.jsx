import React from 'react'
import './FavItem.css'
import { Link } from 'react-router-dom'

const FavItem = (props) => {
  return (
    <div className = 'FavItem'>
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src = { props.image } alt = " "/></Link>
        <p>{props.name}</p>
        <div className="FavItem-prices">
            <div className="FavItem-price-new">
                ${props.new_price}
            </div>
            <div className="FavItem-price-old">
                ${props.old_price}
            </div>
            <img src = { props.fav_icon } alt = " " className='fav-icon'/>
        </div>
    </div>
  )
}

export default FavItem