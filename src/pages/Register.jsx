import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // puoi usare lo stesso
import axios from "../api/axios";
import bgImage from "../assets/sfondo.jpg";
import { AuthContext } from "../context/AuthContext";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // per fare login automatico dopo la registrazione

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Le password non coincidono");
      return;
    }

    try {
      const res = await axios.post("/auth/register", 
        { name, email, password },
        { withCredentials: true }
      );

      // salva i token
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      // Login automatico dopo la registrazione
      login(res.data.user);

      localStorage.setItem("showWelcome", "true");

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Errore durante la registrazione");
    }
  };


  return (
    <div 
      className="login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-container">
        <h1>Crea un account</h1>
        <p>Registrati per continuare</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleRegister} className="login-form">

          <input 
            type="text" 
            placeholder="Nome" 
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

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

          <input
            type="password"
            placeholder="Conferma Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Registrati</button>
        </form>

        <p className="login-register">
          Hai già un account? <a href="/auth">Accedi</a>
        </p>
      </div>
    </div>
  );
}
