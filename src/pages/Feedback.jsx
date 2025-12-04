import "../styles/Feedback.css";
import Footer from "./Footer";
import Intro from "./Intro";
import Navbar from "./Navbar";

const Feedback = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    console.log("Feedback inviato:", feedback);
    e.target.reset();
  };

  return (
    <div>
      <Intro></Intro>
      {/* Feedback Card */}
      <div className="feedback-wrapper">
        <div className="feedback-card">
          <h1>Lascia un feedback</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              name="feedback"
              placeholder="Scrivi qui il tuo feedback..."
              required
            ></textarea>
            <button type="submit">Invia</button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Feedback;
