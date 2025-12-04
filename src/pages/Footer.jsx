import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {

  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col">
          <h2 className="logo">🎅 XmasShop</h2>
          <p>
            Il tuo e-commerce per regali, decorazioni e magia natalizia.
            Consegna rapida e sicura!
          </p>
        </div>

        <div className="footer-col">
          <h3>Navigazione</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Categorie</a></li>
            <li><a href="#">Offerte</a></li>
            <li><a href="#">Contatti</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Informazioni</h3>
          <ul>
            <li><a href="#">Spedizioni</a></li>
            <li><a href="#">Resi & Rimborsi</a></li>
            <li><a href="#">Termini e condizioni</a></li>
            <li><a style={{ cursor: "pointer"}} onClick={() => {navigate("/privacy")}}> Privacy </a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Newsletter</h3>
          <p>Ricevi offerte esclusive e idee regalo.</p>
          <form>
            <input type="email" placeholder="La tua email" />
            <button type="submit">Iscriviti 🎁</button>
          </form>
        </div>

      </div>

      <hr />

      <p className="footer-copy">
        © 2025 Christmas Shop — Tutti i diritti riservati 🎅✨
      </p>
    </footer>
  );
}
