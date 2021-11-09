
import Hamsterlogo from "../../assets/hamster-logo.png"
import "./play.css"
import RandomHamster from "./RandomHamster"


/*
    TODO: Rendera två random bilder som ska tävlas mellan

    När battle-vyn visas ska du slumpa två hamstrar, som visas för användaren.
    Användaren ska klicka för att rösta på den sötaste. Man ska kunna se bild och namn för varje hamster.
    När man har röstat ska mer information om hamstern visas, bland annat hur många vinster och förluster den har.
    (Det kan påverka hur man röstar!)

    När användaren klickar ska båda hamster-objekten uppdateras: vinnaren får +1 vinst och förloraren +1 förlust.
    Nu ska du visa hur många vinster och förluster respektive hamster har. Användaren ska få möjligheten att starta en ny match,
    med två slumpade hamstrar.

*/


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





