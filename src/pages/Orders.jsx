import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../api/axios";
import "../styles/Cart.css"; 
import "../styles/Orders.css";
import Intro from "./Intro";
import Footer from "./Footer";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const token = localStorage.getItem("accessToken");

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [token]);

  const filteredOrders = orders.filter(order => {
    const orderNumber = order._id.slice(-6);
    const orderDate = new Date(order.createdAt).toLocaleDateString();
    return (
      orderNumber.includes(searchTerm) ||
      orderDate.includes(searchTerm)
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Intro />

      <div className="orders-header">
        <h3 className="text-3xl font-semibold">Ordini effettuati</h3>

        <input
          type="text"
          placeholder="Cerca per numero ordine o data"
          className="order-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="orders-wrapper">
      {/* 👉 INTESTAZIONE LISTA ORDINI */}
      <div className="order-header-row px-4">
        <span>Data Creazione</span>
        <span>Numero Ordine</span>
        <span>Totale</span>
        <span></span>
      </div>

      {/* 👉 LISTA ORDINI */}
      <div className="px-4">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-600 text-lg mt-4">Nessun ordine trovato.</p>
        ) : (
          <div className="space-y-4 mt-4">
            {filteredOrders.map(order => (
              <div key={order._id} className="order-card">

                <div className="order-summary" onClick={() => toggleOrder(order._id)}>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span>{order._id.slice(-6)}</span>
                  <span>€ {order.totalPrice.toFixed(2)}</span>
                  <span className="arrow">
                    {expandedOrder === order._id ? "▲" : "▼"}
                  </span>
                </div>

                {expandedOrder === order._id && (
                  <div className="order-details">
                    {order.products.map(p => (
                      <div key={p.product._id} className="product-row">
                        <img
                          src={p.product.images?.[0] || "https://via.placeholder.com/50"}
                          alt={p.product.name}
                        />
                        <span className="product-name">{p.product.name}</span>
                        <span>Quantita: {p.quantity}</span>
                        <span>Prezzo  : {p.product.price}</span>
                      </div>
                    ))}
                  </div>
                )}

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
