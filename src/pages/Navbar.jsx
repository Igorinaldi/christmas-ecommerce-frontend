import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import UserMenu from "./UserMenu";

import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">🎄 XmasShop</Link>
        </div>

        
        {/* Menù */}
        <ul className="navbar-menu">
          <li><Link to="/about">Chi Siamo</Link></li>
          <li><Link to="/cart">Carrello ({cartCount})</Link></li>

          {user ? (
            <div className="navbar-user-wrapper">
              <UserMenu user={user} logout={logout} />
            </div>
          ) : (
            <li><Link to="/auth">Accedi/Registrati</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}
