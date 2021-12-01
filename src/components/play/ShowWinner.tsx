
import { Hamster } from "../../models/Hamster"

interface WinnerProps {
    close: () => void;
    hamster: any
}

const ShowWinner = ({ close, hamster }: WinnerProps) => {
    // console.log('Här ska vinnaren vara som heter: ', hamster.name)
    return (
        <div className="winner-overlay-container">
            <article className="hamster-card winner-hamster-card">
                <h1 className="winner-hamster-h1" >You woted for</h1>
                <img className="hamster-image" src={"img/" + hamster.imgName} alt="hamster" width="300" height="300" ></img>
                <h2>{hamster.name}</h2>
                <h4>Match history</h4>
                <div className="match-history">
                    <p>Wins <br /> {hamster.wins}</p>
                    <div className="vl"></div>
                    <p>Defeats <br /> {hamster.defeats}</p>
                    <div className="vl"></div>
                    <p>Games <br /> {hamster.games}</p>
                </div>
                <button className="main-btn" onClick={close}> New Game </button>
            </article>
        </div>
    )
}

export default ShowWinner