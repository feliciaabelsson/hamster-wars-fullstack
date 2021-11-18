
import Hamsterlogo from "../../assets/hamster-logo.png"
import "./play.css"
import RandomHamster from "./RandomHamster"


const Play = () => {


    return (
        <div className="play-match-container">
            <div className="hamster-wars-intro-logo">
                <h1>Hamster </h1>
                <h1 className="wars-h1"><span><img className="hamster-logo-h1" src={Hamsterlogo} alt="Hamster-wars logotype" /></span>wars</h1>
            </div>
            <div className="hamster-match-container">
                <RandomHamster />
            </div>
        </div>
    )
};

export default Play





