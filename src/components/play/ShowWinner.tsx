
import { useEffect, useState } from "react"
import { Hamster } from "../../models/Hamster"

interface WinnerProps {
    close: () => void;
    hamster: any;
}

const ShowWinner = ({ close, hamster }: WinnerProps) => {

    const [updatedData, setUpdatedData] = useState<Hamster | null>(null)

    useEffect(() => {
        async function updatedWinner() {
            let response = await fetch("/hamsters/" + hamster.id, {
                method: 'GET'
            })
            let info = await response.json()
            setUpdatedData(info)
        }
        updatedWinner()
    }, [hamster.id, hamster.games, hamster.wins, hamster.defeats])


    console.log(hamster)
    return (
        <div className="winner-overlay-container">
            <article className="hamster-card winner-hamster-card">
                <h1 className="winner-hamster-h1" >You woted for</h1>
                {
                    updatedData ? 
                        <>
                            <img className="hamster-image" src={"img/" + hamster.imgName} alt="hamster" width="300" height="300" ></img>
                            <h2>{hamster.name}</h2>
                            <h4>Match history</h4>
                            <div className="match-history">
                                <p>Wins <br /> {updatedData.wins}</p>
                                <div className="vl"></div>
                                <p>Defeats <br /> {updatedData.defeats}</p>
                                <div className="vl"></div>
                                <p>Games <br /> {updatedData.games}</p>
                            </div>
                        </> 
                : "Loading winner..."
                } 
                <button className="main-btn" onClick={close}> New Game </button>
            </article>
        </div>
    )
}

export default ShowWinner