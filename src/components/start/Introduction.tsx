import { Link } from "react-router-dom";
import Hamsterlogo from "../../assets/hamster-logo.png"

const Introduction = () => {

    return (
        <article className="introduction-container">
            <div>
                <h1>Hamster </h1>
                <h1 className="wars-h1"><span><img className="hamster-logo-h1" src={Hamsterlogo} alt="Hamster-wars logotype" /></span>wars</h1>
            </div>
            <h3>How to play?</h3>
            <p>Simple. Just click on the hamster that you think is the cutest.</p>

            <Link to="/play"> <button className="main-btn">Play</button></Link>
        </article>
    )
}

export default Introduction