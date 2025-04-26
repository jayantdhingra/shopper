// import React, {useContext, useEffect} from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';
// import Breadcrum from '../Components/Breadcrumbs/Breadcrum';
// import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
// import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
// import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

// const Product = () => {
//   const { all_product } = useContext(ShopContext);
//   const { productId } = useParams();
//   const product = all_product.find((e) => e.id === Number(productId));
//   const location=useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   return (
//     <div>
//     <Breadcrum product={product}/>
//     <ProductDisplay product={product}/> 
//     <DescriptionBox/>
//     <RelatedProducts/>
//     </div>
//   )
// }

// export default Product




import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrumbs/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import ComplementaryProducts from '../Components/ComplementaryProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts productId={productId} />
      <ComplementaryProducts productId={productId} />
    </div>
  );
};

export default Product;
