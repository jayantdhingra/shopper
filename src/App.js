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
import Confirmation from './Components/NewsLetter/Confirmation';
import HomeNavBar from './Components/HomeNavBar/HomeNavBar';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import SearchPage from './Components/SearchNavbar/SearchPage';
import ChatApp from './Pages/ChatApp';
import ProtectedRoute from './ProtectedRoute';

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

  const searchPages = ["/men", "/women", "/kids", "/search"];
  const isSearchNavbar = searchPages.some((path) => location.pathname.startsWith(path));
  
  // Simulating user login status (Replace with actual authentication logic)
  const isLoggedIn = localStorage.getItem("token") !== null;  

  return (
    <div>
      {isLoggedIn ? (
        isSearchNavbar ? <SearchNavBar onSearch={setSearchQuery} /> : <Navbar />
      ) : (
        <HomeNavBar />
      )}
      <Routes>
      <Route path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}></Route>
        <Route path='/' element={<Shop searchQuery={searchQuery} />}/>
        <Route path='/men' element={<ProtectedRoute><ShopCategory banner={men_banner} category="Men" searchQuery={searchQuery}/></ProtectedRoute>}/>
        <Route path='/women' element={<ProtectedRoute><ShopCategory banner={women_banner}category="Women" searchQuery={searchQuery}/></ProtectedRoute>}/>
        <Route path='/kids' element={<ProtectedRoute><ShopCategory banner={kid_banner} category="Kids" searchQuery={searchQuery}/></ProtectedRoute>}/>
        <Route path="/product" element={<ProtectedRoute><Product/></ProtectedRoute>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/checkout-address" element={<ProtectedRoute><CheckOutAddress /></ProtectedRoute>} />
        <Route path="/checkout-shipping" element={<ProtectedRoute><CheckOutShipping /></ProtectedRoute>} />
        <Route path="/checkout-payment" element={<ProtectedRoute><CheckOutPayment /></ProtectedRoute>} />
        <Route path="/user-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        <Route path="/company" element={<Company />} />
        <Route path="/offices" element={<Offices />} />
        <Route path="/about" element={<About />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatApp /></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;