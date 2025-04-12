// import React from "react";
// import { useParams } from "react-router-dom";
// import ShopCategory from "../Components/ShopCategory/ShopCategory";
// import men_banner from "../Components/Assets/banner_mens.png";
// import women_banner from "../Components/Assets/banner_women.png";
// import kid_banner from "../Components/Assets/banner_kids.png";

// const ShopCategoryWrapper = ({ searchQuery }) => {
//   const { category } = useParams();

//   const getBanner = (cat) => {
//     switch (cat.toLowerCase()) {
//       case "men":
//         return men_banner;
//       case "women":
//         return women_banner;
//       case "kids":
//         return kid_banner;
//       default:
//         return men_banner;
//     }
//   };

//   return (
//     <ShopCategory
//       banner={getBanner(category)}
//       category={category}
//       searchQuery={searchQuery}
//     />
//   );
// };

// export default ShopCategoryWrapper;
