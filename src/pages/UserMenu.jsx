import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/UserMenu.css"

export default function UserMenu({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();


  // Chiudi il menu cliccando fuori
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return <Link to="/auth">Accedi/Registrati</Link>;

  return (
    <div className="navbar-user" style={{ position: "relative" }} ref={menuRef}>
      <span
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ cursor: "pointer" }}
      >
        Ciao, {user.name} ▼
      </span>

      {menuOpen && (
        <ul
          className="user-menu"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "#fff",
            listStyle: "none",
            padding: "0.5rem",
            margin: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            zIndex: 100,
          }}
        >
          <li>
            <button
              style={{ color: "black"}}
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
            >
              Area personale
            </button>
          </li>

          <li>
            <button
              style={{ color: "black" }}
              onClick={() => {
                navigate("/orders");
                setMenuOpen(false);
              }}
            >
              I tuoi ordini
            </button>
          </li>

          <li>
            <button
              style={{ color: "black" }}
              onClick={() => {
                navigate("/favorites");
                setMenuOpen(false);
              }}
            >
              Lista dei Preferiti
            </button>
          </li>
          <li>
            <button
              style={{ color: "black" }}
              onClick={() => {
                navigate("/feedback");
                setMenuOpen(false);
              }}
            >
              Lascia un feedback
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
                navigate("/auth");   // 🔥 reindirizzamento
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
