// components/Hero.jsx
import React from "react";
import Navbar from "./Navbar";


function Intro() {
  return (
    <div className="hero-container">
        
        <Navbar></Navbar>
        <div className="hero-ratio">
            <img
            src="https://www.hutschenreuther.com/dw/image/v2/BGMT_PRD/on/demandware.static/-/Library-Sites-hut-library-shared/default/dwc193ba10/homepage/25_xmas/hut_hero_christmas.jpg?sw=1920&sh=823"
            alt="Natale"
            className="hero-image"
            />
            <div className="hero-overlay">
            <h1 className="hero-text">🎄 Natale è arrivato! 🎁</h1>
            </div>
        </div>
    </div>
  );
}

export default Intro;
