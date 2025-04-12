import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
// import AuthProvider from './Context/AuthContext'; // ✅ import AuthContext
import { AuthProvider } from './Context/AuthContext'; // ✅ Correct


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Wrap with AuthProvider */}
      <ShopContextProvider> {/* ✅ Wrap ShopContext inside */}
        <App />
      </ShopContextProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
