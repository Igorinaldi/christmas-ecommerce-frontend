import { Routes, Route } from "react-router-dom"; // rimuoviamo BrowserRouter qui

import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";


import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Feedback from "./pages/Feedback";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import FavoritesProvider, { FavoritesContext } from "./context/FavoritesContext";
import Favorites from "./pages/Favorites";
import PrivacyPolicy from "./pages/Privacy";

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
      <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/feedback" element={<Feedback />} />

        
        
      </Routes>
      </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
