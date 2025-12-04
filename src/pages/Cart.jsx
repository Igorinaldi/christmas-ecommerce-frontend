import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "./Navbar";
import axios from "../api/axios";
import "../styles/Cart.css";
import Intro from "./Intro";
import Footer from "./Footer";

export default function Cart() {
  const { cart = [], removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
    useContext(CartContext);

  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (!token) {
      alert("Devi effettuare il login per completare l'ordine");
      return;
    }

    try {
      const productsToSend = cart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));

      await axios.post(
        "/orders",
        {
          products: productsToSend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Ordine creato con successo!");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Errore durante la creazione dell'ordine");
    }
  };

  return (
    <div className="cart-page">
      <Intro></Intro>

      <div className="cart-title">
        <h1>🛒 Il tuo Carrello</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-lg">Il carrello è vuoto.</p>
        ) : (
          <>
            {/* Lista prodotti */}
            <div className="cart-wrapper">
              {cart.map(item => (
                <div className="cart-item" key={item._id}>
                  <div className="flex items-center gap-4 item-info">
                    <img
                      src={item.images?.[0] || "https://via.placeholder.com/100"}
                      alt={item.name}
                    />
                    <div>
                      <h2>{item.name}</h2>
                      <p>€{item.price}</p>
                    </div>
                  </div>

                  <div className="quantity-box">
                    <button
                      className="quantity-btn"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      -
                    </button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Rimuovi
                  </button>
                </div>
              ))}
            </div>

            {/* Totale */}
            <div className="cart-wrapper">
              <h2>Totale: €{totalPrice.toFixed(2)}</h2>
              <button className="order-btn" onClick={handleOrder}>
                Procedi all'Ordine
              </button>
            </div>
          </>
        )}
      </div>
      <Footer></Footer>

    </div>
  );
}
