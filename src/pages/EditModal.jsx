import React, { useState, useEffect, useContext } from "react";
import "../styles/EditModal.css";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const EditModal = ({ user, address, onClose }) => {
  const { login } = useContext(AuthContext); // aggiornare dati utente nel context

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (address) {
      setStreet(address.street || "");
      setCity(address.city || "");
      setZip(address.zipCode || "");
      setPhone(address.phoneNumber || "");
    }
  }, [user, address]);

  const handleSave = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("accessToken");

    try {
      // 1️⃣ Aggiorna dati utente (solo nome/email)
      const userRes = await axios.put(
        "/auth/me", // assicurati che questo endpoint esista
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      login(userRes.data); // aggiorna context

      // 2️⃣ Aggiorna o crea indirizzo
      const addressRes = await axios.put(
        "/address",
        {
          street,
          city,
          zipCode: zip,
          phoneNumber: phone
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Indirizzo aggiornato:", addressRes.data);

      onClose(); // chiude la modale
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Errore durante il salvataggio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Modifica profilo</h2>

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-section">
          <label>Nome</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <h3 style={{ marginTop: "1rem" }}>Indirizzo</h3>

        <div className="modal-section">
          <label>Via</label>
          <input value={street} onChange={(e) => setStreet(e.target.value)} />

          <label>Città</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} />

          <label>CAP</label>
          <input value={zip} onChange={(e) => setZip(e.target.value)} />

          <label>Telefono</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>Annulla</button>
          <button className="modal-btn save" onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Salva"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
