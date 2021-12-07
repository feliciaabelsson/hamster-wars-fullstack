
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Hamster } from "../../models/Hamster"
import ShowWinner from './ShowWinner'
import { hamstersSelector } from '../../features/hamsterReducer'


const RandomHamster = () => {

    const { loading, hasErrors } = useSelector(hamstersSelector)
    const [contestants, setContestants] = useState<Hamster[] | null>(null)
    const [winner, setWinner] = useState<Hamster | null>(null)
    const [/*loser*/, setLoser] = useState<Hamster | null>(null)
    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(false)

    const getRandomHamsters = async (saveData: any) => {
        //Hämtar data genom fetch
        const res1 = await fetch('/hamsters/random')
        const data1 = await res1.json()
        let res2 = await fetch('/hamsters/random')
        let data2 = await res2.json()

        //Om data1 och data2 hämtar samma hamster ska en ny fetch göras 
        while (data1.id === data2.id) {
            res2 = await fetch('/hamsters/random')
            data2 = await res2.json()
        }
        saveData([data1, data2])
    }

    useEffect(() => {
        getRandomHamsters(setContestants)
    }, [])

    const newGame = () => {
        getRandomHamsters(setContestants)
        setWinner(null)
        setLoser(null)
    }


    const updateLoser = async (loserHamster: Hamster) => {
        let defeats = loserHamster.defeats + 1
        let games = loserHamster.games + 1 
        const id = loserHamster.id

        try {
            await fetch("/hamsters/" + id,
                {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ defeats: defeats, games: games }),
                })
        } 
        catch(error) {
            console.log('error: ', error)
        }
        setLoser(loserHamster)
    }

    const updateWinner = async (winnerHamster: Hamster) => {
        const id = winnerHamster.id
        let wins = winnerHamster.wins +1
        let games = winnerHamster.games +1

        try {
            await fetch("/hamsters/" + id,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ wins: wins, games: games }),
                })
        }
        catch(error){
            console.log('error: ', error)
        }
        setWinner(winnerHamster)
    }


    const handleCutestClick = async (x: Hamster, y:Hamster) => {
        await updateWinner(x)
		await updateLoser(y)
        setShowAddHamsterOverlay(true)
    }

    //Overlay
    let addHamsterOverlay: any = null
    if (showAddHamsterOverlay) {
        const closeOverlay = () => { setShowAddHamsterOverlay(false); newGame() }
        addHamsterOverlay = <ShowWinner close={closeOverlay} hamster={winner} />
    }

    const renderHamsters = () => {
        if (loading) return <p>Loading hamsters...</p>
        if (hasErrors) return <p>Cannot display hamsters...</p>

        return (
            <div className="play-container">
                {contestants ?
                    contestants.map(hamster => (
                        <article key={hamster.id} className="hamster-card hamster-match-card" >
                            <img className="contestant-hamster-img" alt="hamster" src={"img/" + hamster.imgName} ></img>
                            <button
                                className="main-btn vote-btn"
                                onClick={() => { handleCutestClick(hamster, contestants?.filter(l=>l!==hamster)[0])  /*handleShowMore(hamster);*/ }}>
                                I'm the CUTEST 
                            </button>
                            <h3>{hamster.name}</h3>
                        </article>
                    ))
                    : null
                }
                <h1 className="vs-string"> VS.</h1>
            </div>
        )
    }

    return (
        <div >
            {renderHamsters()}
            {addHamsterOverlay}
        </div>
    )
}

export default RandomHamster