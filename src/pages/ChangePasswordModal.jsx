import { useState } from "react";

export default function ChangePasswordModal({ email, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("Le nuove password non coincidono.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("La nuova password deve avere almeno 6 caratteri.");
      return;
    }

    try {
      setLoading(true);

      // 🔧 CHIAMATA API — modificare l'endpoint in base al tuo backend
      const res = await fetch("http://localhost:4000/api/auth/editPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            email,
            oldPassword,
            newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Errore durante il cambio password.");
      } else {
        setSuccessMsg("Password cambiata con successo!");
        
        setTimeout(() => {
          onClose();
        }, 1200);
      }

    } catch (err) {
      setErrorMsg("Errore di connessione al server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Cambia Password</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <label>Password attuale</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <label>Nuova password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label>Conferma nuova password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {errorMsg && <p style={styles.error}>{errorMsg}</p>}
          {successMsg && <p style={styles.success}>{successMsg}</p>}

          <div style={styles.buttons}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Annulla
            </button>

            <button type="submit" disabled={loading} style={styles.saveBtn}>
              {loading ? "Salvataggio..." : "Salva"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------- STILI INLINE --------
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  modal: {
    width: "400px",
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelBtn: {
    padding: "8px 14px",
    background: "#aaa",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  saveBtn: {
    padding: "8px 14px",
    background: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "5px",
  },
  success: {
    color: "green",
    marginTop: "5px",
  },
};
