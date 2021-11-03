import hamsterImg from "../../hamsters/hamster-1.jpg"
import Hamsterlogo from "../../assets/hamster-logo.png"
import "./play.css"
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'

/*
    TODO: Rendera två random bilder som ska tävlas mellan
    
    När battle-vyn visas ska du slumpa två hamstrar, som visas för användaren. 
    Användaren ska klicka för att rösta på den sötaste. Man ska kunna se bild och namn för varje hamster. 
    När man har röstat ska mer information om hamstern visas, bland annat hur många vinster och förluster den har. 
    (Det kan påverka hur man röstar!)

    När användaren klickar ska båda hamster-objekten uppdateras: vinnaren får +1 vinst och förloraren +1 förlust. 
    Nu ska du visa hur många vinster och förluster respektive hamster har. Användaren ska få möjligheten att starta en ny match, 
    med två slumpade hamstrar.



    // GET random hamster
    router.get("/random", async (req, res) => {
    let array = await getAllHamsters();
    let randomHamster =
    array[Math.floor(Math.random() * array.length)]
    res.status(200).send(randomHamster)
    });
*/
// async function sendRequest(saveData: any) {
//     const response = await fetch('http://localhost:1337/hamsters/cutest')
//     const data = await response.json()
//     console.log("fetched data: ", data)
//     saveData(data)
// }


const Play = () => {
    const hamsters = useSelector((state: RootState) => state.hamsters)
    console.log(hamsters)

    return (
        <div className="play-match-container">
            <div className="hamster-wars-intro-logo">
                <h1>Hamster </h1>
                <h1 className="wars-h1"><span><img className="hamster-logo-h1" src={Hamsterlogo} alt="Hamster-wars logotype" /></span>wars</h1>
            </div>

            <div className="hamster-match-container">
                <article className="hamster-card hamster-match-card" >
                    <img className="cutest-hamster-img" alt="hamster" src={hamsterImg} />
                    <h3>Namn på hamster</h3>
                    <button className="main-btn vote-btn">I'm the CUTEST</button>
                </article>
                <h1>VS.</h1>
                <article className="hamster-card hamster-match-card" >
                    <img className="cutest-hamster-img" alt="hamster" src={hamsterImg} />
                    <h3>Namn på hamster</h3>
                    <button className="main-btn vote-btn">I'm the CUTEST</button>
                </article>
            </div>

            {/*
            <div className="hamster-grid">
            {hamsterData ?
                hamsterData.map(hamster => (
                    <article key={hamster.id} className="hamster-card">
                        <img className="hamster-image" src={hamsterImg} alt="hamster" />
                        <h3>{hamster.name}</h3>
                        <p>Ålder: {hamster.age} <br></br>
                            Favoritmat: {hamster.favFood}
                        </p>
                        <button className="remove-btn">Remove</button>
                    </article>

                ))
                : 'Loading hamsters...'
            }
        </div>
        */}

        </div>
    )
};

export default Play