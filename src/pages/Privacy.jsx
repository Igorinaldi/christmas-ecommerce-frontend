import React from 'react';
import Intro from './Intro';

const PrivacyPolicy = () => {
  return (
    <div>
        <Intro></Intro>
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Privacy Policy</h1>
      <p>
        La tua privacy è importante per noi. In questa pagina spieghiamo quali dati raccogliamo e come li utilizziamo.
      </p>

      <h2>1. Raccolta dei dati</h2>
      <p>
        Raccogliamo dati come nome, email, indirizzo e informazioni sugli ordini solo quando vengono forniti volontariamente dall'utente.
      </p>

      <h2>2. Uso dei dati</h2>
      <p>
        I dati raccolti vengono utilizzati per fornire i nostri servizi, elaborare ordini, migliorare l’esperienza utente e inviare comunicazioni rilevanti.
      </p>

      <h2>3. Condivisione dei dati</h2>
      <p>
        Non vendiamo i tuoi dati a terzi. Possiamo condividerli solo con partner affidabili necessari per il funzionamento del servizio (es. spedizione, pagamento).
      </p>

      <h2>4. Sicurezza</h2>
      <p>
        Adottiamo misure di sicurezza per proteggere i dati da accessi non autorizzati o perdite accidentali.
      </p>

      <h2>5. Diritti dell'utente</h2>
      <p>
        Puoi richiedere l’accesso, la modifica o la cancellazione dei tuoi dati contattandoci tramite email.
      </p>

      <h2>6. Modifiche alla privacy policy</h2>
      <p>
        Ci riserviamo il diritto di aggiornare questa pagina. Le modifiche saranno pubblicate con la data di aggiornamento.
      </p>

      <p style={{ fontSize: '0.9rem', marginTop: '2rem' }}>
        Ultimo aggiornamento: 1 Dicembre 2025
      </p>
    </div></div>
  );
};

export default PrivacyPolicy;
