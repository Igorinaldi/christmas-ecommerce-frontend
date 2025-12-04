import { useContext, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import Intro from "./Intro";
import "../styles/Cart.css"; 
import "../styles/Orders.css";
import "../styles/Favorites.css";
import Footer from "./Footer";

export default function Favorites() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFavorites = favorites.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Intro />

      <div className="orders-header">
        <h3 className="text-3xl font-semibold">Preferiti</h3>

        <input
          type="text"
          placeholder="Cerca un prodotto..."
          className="order-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="orders-wrapper">

        {/* INTESTAZIONE TAB */}
        <div className="order-header-row px-4">
          <span>Immagine</span>
          <span>Nome</span>
          <span>Prezzo</span>
          <span>Azione</span>
          
        </div>

        <div className="px-4">
          {filteredFavorites.length === 0 ? (
            <p className="text-gray-600 text-lg mt-4">Nessun preferito aggiunto.</p>
          ) : (
            <div className="space-y-4 mt-4">
              {filteredFavorites.map(product => (
                <div key={product._id} className="order-card">

                  {/* Riga unica con tutti i dettagli */}
                  <div className="order-summary" style={{ cursor: "default" }}>
                    
                    {/* Immagine */}
                    <span>
                      <img
                        src={product.images?.[0] || "https://via.placeholder.com/70"}
                        alt={product.name}
                        className="favorite-img"
                      />
                    </span>

                    {/* Nome */}
                    <span>{product.name}</span>

                    {/* Prezzo */}
                    <span>€ {product.price}</span>

                    {/* Rimuovi dai preferiti */}
                    <span>
                        <p
                      className="button bg-red-500 hover:bg-red-600 w-auto"
                      onClick={() => toggleFavorite(product)}
                    >
                      🗑️
                    </p>

                    </span>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      <Footer></Footer>
    </div>
  );
}
