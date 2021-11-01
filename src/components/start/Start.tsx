import Hamsterlogo from "../../assets/hamster-logo.png"
import "./start.css";

const Start = () => {
    return (
        <section className="hero-container">
            <article className="introduction-container">
                <div>
                    <h1>Hamster </h1>
                    <h1 className="wars-h1"><span><img className="hamster-logo-h1" src={Hamsterlogo} alt="Hamster-wars logotype" /></span>wars</h1>
                </div>
                <h3>How to play?</h3>
                <p>Simple. Just click on the hamster that you think is the cutest.</p>
                <button className="main-btn">Play</button>
            </article>
            <article className="first-place-container">
                {/* TODO: Lägga till (rendera) vinnar-hamstern*/}
                <h2>In <span>1st</span> place</h2>
                <div>
                    img
                    <h4>Namn på hamster</h4>
                </div>
            </article>
        </section>
    )
}

export default Start