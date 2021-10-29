
import './App.css';
import Hamsterlogo from "./assets/hamster-logo.png"

function App() {
  return (
    <div className="App">
      <nav>
        Home
        Gallery
      </nav>
      <article className="introduction-container">
        <div>
          <h1>Hamster </h1>
          <h1 className="wars-h1"><span><img className="hamster-logo-h1" src={Hamsterlogo} /></span>wars</h1>
        </div>
        <h3>How to play?</h3>
        <p>Simple. Just click on the hamster that you think is the cutest.</p>
        <button>Play</button>
      </article>
      <article className="first-place-container">
        <h2>In 1st place</h2>
        <div>
          img
          <h4>Mr. Collins</h4>
        </div>
      </article>
    </div>
  );
}

export default App;
