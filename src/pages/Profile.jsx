import React, { useEffect, useState } from "react";
import "../styles/About.css";
import "../styles/Profile.css";
import EditModal from"./EditModal.jsx";
import ChangePasswordModal from"./ChangePasswordModal.jsx";
import Intro from "./Intro";
import Footer from "./Footer.jsx";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null); // 👈 NUOVO STATE
  const [openModal, setOpenModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("TOKEN →", token);

    if (!token) {
      console.warn("Token mancante");
      return;
    }

    // ------- FETCH USER -------
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("STATUS →", res.status);

        const text = await res.text();
        console.log("BODY →", text);

        if (!res.ok) {
          console.error("Errore:", text);
          return;
        }

        const data = JSON.parse(text);

        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    // ------- FETCH ADDRESS -------
    const fetchAddress = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/address", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const text = await res.text();
        console.log("ADDRESS BODY →", text);

        if (!res.ok) {
          console.warn("Nessun indirizzo trovato");
          return;
        }

        const data = JSON.parse(text);
        setAddress(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    fetchAddress();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      
      <Intro></Intro>
      
      <div className="about-wrapper">
        <div className="about-content">
          
          <h3>AREA PERSONALE</h3>

          {!user ? (
            <p>Caricamento...</p>
          ) : (
            <table className="info-table">
              <tbody>
                <tr>
                  <td><strong>ID</strong></td>
                  <td>{user.user._id}</td>
                </tr>
                <tr>
                  <td><strong>Nome</strong></td>
                  <td>{user.user.name}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>{user.user.email}</td>
                </tr>
               <tr>
                <td><strong>Password</strong></td>
                <td>
                  <button 
                    onClick={() => setOpenPasswordModal(true)} 
                    style={{ color: "blue", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
                  >
                    cambia
                  </button>
                </td>
              </tr>
                <tr>
                  <td><strong>Registrato</strong></td>
                  <td>{new Date(user.user.createdAt).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          )}
          <h3 style={{ marginTop: "20px" }}>Indirizzo di spedizione</h3>

          {!address ? (
            <p>Nessun indirizzo associato all'utente.</p>
          ) : (
            <table className="info-table">
              <tbody>
                <tr>
                  <td><strong>Via</strong></td>
                  <td>{address.street}</td>
                </tr>
                <tr>
                  <td><strong>Città</strong></td>
                  <td>{address.city}</td>
                </tr>
                <tr>
                  <td><strong>CAP</strong></td>
                  <td>{address.zipCode}</td>
                </tr>
                {address.phoneNumber && (
                  <tr>
                    <td><strong>Telefono</strong></td>
                    <td>{address.phoneNumber}</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {openPasswordModal && 
          (
            <ChangePasswordModal 
              email={user?.user?.email}
              onClose={() => setOpenPasswordModal(false)} 
            />
          )}
          
          <button style={{ marginTop: "40px" }} onClick={() => setOpenModal(true)}>
            Modifica
          </button>

          {openModal && (
            <EditModal
              user={user?.user}
              address={address}
              onClose={() => setOpenModal(false)}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
