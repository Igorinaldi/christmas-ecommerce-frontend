import "../styles/Home.css";
import "../styles/Products.css";
import Intro from "./Intro";

import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "../api/axios";
import Footer from "./Footer";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const { addToCart } = useContext(CartContext);

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);


  useEffect(() => {
    axios.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const [welcomeVisible, setWelcomeVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("showWelcome") === "true") {
      setWelcomeVisible(true);
      localStorage.removeItem("showWelcome"); // mostri una sola volta

      setTimeout(() => {
        setWelcomeVisible(false);
      }, 3000); // chiusura automatica dopo 3s
    }
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen">
       
      <Intro></Intro>

      {welcomeVisible && (
        <div className="welcome-toast">
          👋 Bentornato su Christmas Shop!
        </div>
      )}
        
     

      {/* Barra di ricerca */}
      <div className="search-bar-container">
        <h2>Acquista ora!</h2>
        <input
          type="text"
          placeholder="Cerca un prodotto..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="search-bar-input"
        />
      </div>

      {/* Griglia prodotti */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="products-grid-container">
          <div className="products-grid">

            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">

                
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="product-image"
                />

                <h2 className="product-name">{product.name}</h2>
                {/* Cuore preferiti */}
                <div 
                    className="product-description"
                    onClick={() => toggleFavorite(product)}
                    style={{
                      cursor: "pointer"
                    }}
                >
                  Aggiungi ai preferiti {isFavorite(product._id) ? "❤️" : "🤍"}
                </div>
    
                
                <p className="product-description">
                  In store dal: {new Date(product.createdAt).toLocaleDateString()}
                </p>

                <p className="product-price">€ {product.price}</p>
                

                <button
                  className="button"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}   // ← 🔥 DISABILITA SE FINITO
                >
                  {product.stock === 0 ? "Non disponibile" : "Acquista"}
                </button>

              </div>
            ))}

          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
