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
import MyOrders from './Pages/MyOrders';
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
import AccountSettings from './Pages/AccountSettings';
import Company from './Components/FooterContent/Company';
import Offices from './Components/FooterContent/Offices';
import About from './Components/FooterContent/About';
import Contact from './Components/FooterContent/Contact';
import Confirmation from './Components/NewsLetter/Confirmation';
import HomeNavBar from './Components/HomeNavBar/HomeNavBar';

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <BrowserRouter basename="/WDM_Team8">
      <MainContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </BrowserRouter>
  );
}

function MainContent({ searchQuery, setSearchQuery }) {
  const location = useLocation(); 

  const searchPages = ["/JustBuy/men", "/JustBuy/women", "/JustBuy/kids"];
  const isSearchNavbar = searchPages.some((path) => location.pathname.startsWith(path));
  
  // Simulating user login status (Replace with actual authentication logic)
  const isLoggedIn = localStorage.getItem("userToken") !== null;  

  return (
    <div>
      {isLoggedIn ? (
        isSearchNavbar ? <SearchNavBar onSearch={setSearchQuery} /> : <Navbar />
      ) : (
        <HomeNavBar />
      )}
      <Routes>
      <Route path="/JustBuy/orders" element={<MyOrders/>}></Route>
        <Route path='/JustBuy/' element={<Shop searchQuery={searchQuery} />}/>
        <Route path='/JustBuy/men' element={<ShopCategory banner={men_banner} category="Men" searchQuery={searchQuery}/>}/>
        <Route path='/JustBuy/women' element={<ShopCategory banner={women_banner}category="Women" searchQuery={searchQuery}/>}/>
        <Route path='/JustBuy/kids' element={<ShopCategory banner={kid_banner} category="Kid" searchQuery={searchQuery}/>}/>
        <Route path="/JustBuy/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/JustBuy/cart' element={<Cart/>}/>
        <Route path='/JustBuy/login' element={<Login/>}/>
        <Route path='/JustBuy/signup' element={<Signup/>}/>
        <Route path='/JustBuy/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/JustBuy/reset-password' element={<ResetPassword/>}/>
        <Route path='/JustBuy/contact-us' element={<ContactUs/>}/>
        <Route path="/JustBuy/favorites" element={<Favorites />} />
        <Route path="/JustBuy/checkout-address" element={<CheckOutAddress />} />
        <Route path="/JustBuy/checkout-shipping" element={<CheckOutShipping />} />
        <Route path="/JustBuy/checkout-payment" element={<CheckOutPayment />} />
        <Route path="/JustBuy/user-settings" element={<AccountSettings />} />
        <Route path="/JustBuy/company" element={<Company />} />
        <Route path="/JustBuy/offices" element={<Offices />} />
        <Route path="/JustBuy/about" element={<About />} />
        <Route path="/JustBuy/contact" element={<Contact />} />
        <Route path="/JustBuy/confirmation" element={<Confirmation />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
