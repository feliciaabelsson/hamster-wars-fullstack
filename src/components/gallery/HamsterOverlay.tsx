import "./gallery.css"
import { Hamster } from "../../models/Hamster"

interface OverlayProps {
    close: () => void;
    hamster: any
}

const HamsterOverlay = ({ close, hamster }: OverlayProps) => {
    return (
        <div className="overlay hamster-overlay">
            <div className="hamster-overlay-dialog">
                <img className="overlay-hamster-image" src={"hamsters/" + hamster.imgName}></img>
                <div>
                    <h4>My name is</h4>
                    <p>{hamster.name}</p>
                    <h4>I am</h4>
                    <p>{hamster.age}</p>
                    <h4>My favorite food is</h4>
                    <p>{hamster.favFood}</p>
                    <h4>Something I love</h4>
                    <p>{hamster.loves}</p>

                    <h3>Match history:</h3>
                    <p>Wins: {hamster.wins}</p>
                    <p>Defeats: {hamster.defeats}</p>
                    <p>Games: {hamster.games}</p>
                </div>
                <button className="close-btn" onClick={close}>X</button>
            </div>
        </div>
    )
}

export default HamsterOverlay;