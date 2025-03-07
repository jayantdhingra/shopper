import React from 'react'
import { useContext } from 'react'
import '../Styles/Favorites.css'
import FavItem from '../Components/FavItem/FavItem'
import { ShopContext } from '../Context/ShopContext'


const Favorites = () => {

  const { all_product, favorites, removeFromFavorites } = useContext(ShopContext);
  console.log('FAV: ',favorites)
  return (
    <div className='favorites-list'>
        <h1>Favorites</h1>
        <hr />
        <div className="favorites">
            {favorites.map((item, i)=>{
                return <FavItem key={i} id={item.id} name={item.name} image={item.image} new_price = {item.new_price} old_price={item.old_price} fav_icon={item.fav_icon}/>

            })}
        </div>

    </div>
  )
}

export default Favorites