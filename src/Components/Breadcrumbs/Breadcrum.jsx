// import React from "react";
// import './Breadcrum.css';
// import arrow_icon from '../Assets/breadcrum_arrow.png';

// const Breadcrum = (props) => {
//     const {product} = props;
//     return (
//         <div className='breadcrum'>
//          HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category}<img src={arrow_icon} alt="" /> {product.name}
//         </div>
//     )
// }

// export default Breadcrum



import React from "react";
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = ({ product }) => {
  // Optional chaining and fallback handling
  if (!product) return null;

  const categoryLabel = product.Category_ID === 1
    ? "Men"
    : product.Category_ID === 2
    ? "Women"
    : product.Category_ID === 3
    ? "Kids"
    : "Category";

  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {categoryLabel} <img src={arrow_icon} alt="" /> {product.Name}
    </div>
  );
};

export default Breadcrum;
