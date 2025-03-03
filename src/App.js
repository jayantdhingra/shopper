import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Components/ShopCategory/ShopCategory';
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
import CheckOutShipping from './Pages/CheckOutShipping';
import CheckOutPayment from './Pages/CheckOutPayment';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchNavBar } from './Components/SearchNavbar/SearchNavBar';

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <BrowserRouter>
      <MainContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </BrowserRouter>
  );
}

function MainContent({ searchQuery, setSearchQuery }) {
  const location = useLocation(); 

  const searchPages = ["/men", "/women", "/kids"];
  const isSearchNavbar = searchPages.some((path) => location.pathname.startsWith(path));

  return (
    <div>
      {isSearchNavbar ? ( <SearchNavBar onSearch={setSearchQuery} />) : (<Navbar />)}
      <Routes>
        <Route path='/' element={<Shop searchQuery={searchQuery} />}/>
        <Route path='/men' element={<ShopCategory banner={men_banner} category="Men" searchQuery={searchQuery}/>}/>
        <Route path='/women' element={<ShopCategory banner={women_banner}category="Women" searchQuery={searchQuery}/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="Kid" searchQuery={searchQuery}/>}/>
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
        <Route path="/checkout-shipping" element={<CheckOutShipping />} />
        <Route path="/checkout-payment" element={<CheckOutPayment />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
