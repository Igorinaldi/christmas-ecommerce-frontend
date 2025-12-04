import "../styles/About.css";
import Footer from "./Footer";
import Intro from "./Intro";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      

      <Intro />

      {/* Wrapper per centramento */}
      <div className="about-wrapper">
        <div className="about-content">
          <h3>XmasShop - La nostra Storia</h3>
          <p>
            Benvenuti su <span className="highlight">XmasShop</span>, il tuo negozio online di fiducia per trovare i migliori prodotti natalizi e regali unici. 
            La nostra missione è rendere lo shopping facile, veloce e magico, direttamente dal comfort di casa tua.
          </p>

          <div className="cards">
            <div className="card">
              <h2>Missione</h2>
              <p>
                Offrire prodotti di alta qualità che portino gioia durante le festività, con un servizio clienti sempre pronto ad aiutarti.
              </p>
            </div>
            <div className="card">
              <h2>Valori</h2>
              <p>
                Sostenibilità, trasparenza e attenzione al dettaglio: scegliamo prodotti che rispettano persone e ambiente.
              </p>
            </div>
            <div className="card">
              <h2>Visione</h2>
              <p>
                Creare un'esperienza di shopping natalizio online unica, dove ogni cliente si sente speciale e coccolato.
              </p>
            </div>
          </div>

          <p className="closing">
            Grazie per scegliere <span className="highlight">XmasShop</span>. Siamo entusiasti di accompagnarti nella magia del Natale ogni anno!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
