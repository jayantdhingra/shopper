import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Footer from './Components/Footer/Footer';
import Signup from './Pages/Signup';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import ContactUs from './Pages/ContactUs'
import Favorites from "./Pages/Favorites"; // Import Favorites Page
import CheckOutAddress from './Pages/CheckOutAddress';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/men' element={<ShopCategory banner={men_banner} category="Men"/>}/>
        <Route path='/women' element={<ShopCategory banner={women_banner}category="Women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="Kid"/>}/>
        <Route path='/men' element={<ShopCategory banner={men_banner} category="Men"/>}/>
        <Route path='/women' element={<ShopCategory banner={women_banner}category="Women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="Kid"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/checkout-address" element={<CheckOutAddress />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
