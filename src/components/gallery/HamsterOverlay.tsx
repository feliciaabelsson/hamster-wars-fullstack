import "./gallery.css"
import { Hamster } from "../../models/Hamster"
import  heart  from "../../assets/heart.png"
import  cutlery  from "../../assets/cutlery.png"

interface OverlayProps {
    close: () => void;
    hamster: any
}

const HamsterOverlay = ({ close, hamster }: OverlayProps) => {


    
    const checkAge =(hamster) => {
        console.log(hamster.age)

        if(hamster.age <= 1) {
            return `${hamster.age} year old`
        } else {
            return `${hamster.age} years old`
        }

    }

    return (
        <div className="overlay hamster-overlay">
            <div className="hamster-overlay-dialog">
                <img className="overlay-hamster-image" src={"hamsters/" + hamster.imgName}></img>
                <div> 
                    <div className="overlay-information-box">
                        <h2>{hamster.name}, <span>{checkAge(hamster)}</span> </h2>
                        <span className="span-container">
                            <img className=" overlay-icon heart-icon" src={cutlery} alt="heart"/>
                            <p>{hamster.favFood}</p>
                        </span>
                        <span className="span-container">
                            <img className=" overlay-icon heart-icon" src={heart} alt="heart"/>
                            <p>{hamster.loves}</p>
                        </span>
                    </div>
                    <h3>Match history</h3>
                    <div className="match-history">
                        <p>Wins <br/> {hamster.wins}</p>
                        <div className="vl"></div>
                        <p>Defeats  <br/> {hamster.defeats}</p>
                        <div className="vl"></div>
                        <p>Games  <br/> {hamster.games}</p>
                    </div>
                </div>
                <button className="close-btn" onClick={close}>X</button>
            </div>
        </div>
    )
}

export default HamsterOverlay;