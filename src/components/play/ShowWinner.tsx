import { Hamster } from "../../models/Hamster"

interface OverlayProps {
    // close: () => void;
    // winner: Hamster
}

const ShowWinner = () => {
    console.log('Här ska vinnaren vara')
    return (
        <div className="winner-overlay-container">
            <h1>Hamster</h1>
            <button ></button>
        </div>
    )
}

export default ShowWinner