import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "../api/axios";
import bgImage from "../assets/sfondo.jpg";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { login } = useContext(AuthContext); // <-- usa login dal context


  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/auth/login", 
      { email, password },  
      { withCredentials: true });

    // ⬇️ SALVA I TOKEN QUI
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    // salva utente nel context
    login(res.data.user);

    // 🔥 Flag per mostrare la notifica in Home
    localStorage.setItem("showWelcome", "true");

    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Errore login");
  }
};


  return (

    <div 
      className="login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-container">
        <h1>XmasShop</h1>
        <p>Accedi al tuo account</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Accedi</button>
        </form>
        <p className="login-register">
          Non hai un account? <a href="/register">Registrati</a>
        </p>
      </div>
    </div>
  );
}
