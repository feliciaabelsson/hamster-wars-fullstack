
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Hamster } from "../../models/Hamster"
import ShowWinner from './ShowWinner'
import { hamstersSelector } from '../../features/hamsterReducer'



const RandomHamster = () => {
    const { loading, hasErrors } = useSelector(hamstersSelector)
    const [contestants, setContestants] = useState<Hamster[] | null>(null)
    const [/*showResult*/, setShowResult] = useState<boolean>(false)
    const [winner, setWinner] = useState<Hamster | null>(null)
    const [/*loser*/, setLoser] = useState<Hamster | null>(null)
    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(false)

    const getRandomHamsters = async (saveData: any) => {
        //Hämtar data genom fetch
        const res1 = await fetch('/hamsters/random')
        //console.log("response", res1)
        const data1 = await res1.json()
        //console.log("hamster1 ", data1)
        let res2 = await fetch('/hamsters/random')
        let data2 = await res2.json()

        //Om data1 och data2 hämtar samma hamster ska en ny fetch göras 
        while (data1.id === data2.id) {
            res2 = await fetch('/hamsters/random')
            data2 = await res2.json()
        }
        setShowResult(false)
        saveData([data1, data2])
    }

    useEffect(() => {
        getRandomHamsters(setContestants)
    }, [])

    const newGame = () => {
        getRandomHamsters(setContestants)
        // setWinner(null)
        // setLoser(null)
        // setDoneLoadingUpdate(false)
    }

    const updateLoser =  async (loserHamster: Hamster) => {
        console.log("LOSER: ", loserHamster, loserHamster.id)
        // let defeats = loserHamster.defeats++
        // let games = loserHamster.games++
        // const id = loserHamster.id

         await fetch("http://localhost:1337/hamsters/" + loserHamster.id,
            {
                method: 'PUT',
                headers: { 'content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ defeats: loserHamster.defeats+1, games: loserHamster.games+1 }),
            })
        // const updatedHamster =  response.json()
        // console.log("UPPDATERAD: ", updatedHamster)
         setLoser(loserHamster)
    }

    const updateWinner = async (winnerHamster: Hamster) => {
        console.log("WINNER: ", winnerHamster)
       
        await fetch("http://localhost:1337/hamsters/" + winnerHamster.id, {
            method: 'PUT',
            body: JSON.stringify({ wins: winnerHamster.wins + 1, games: winnerHamster.games + 1 }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        setWinner(winnerHamster)
    }


    const handleCutestClick = (hamster: Hamster) => {
        //setWinner(hamster)

        //om det inte finns några tävlande
        if (!contestants) {
            return
        }

        //Om hamster id är lika med id på den man klikcade på ska förloraren vara den andra hamstern i listan
        if (hamster.id === contestants[0].id) {
            setLoser(contestants[1])
            updateLoser(contestants[1])
            updateWinner(contestants[0])
            // newGame()
        } else { //annars ska den andra vara förloraren
            setLoser(contestants[0])
            updateLoser(contestants[0])
            updateWinner(contestants[1])
            // newGame()
        }

        console.log(hamster)
        setShowAddHamsterOverlay(true)
        // showOverlay(hamster)
        // newGame()
        // await updateMatches(x, y)    
        // updateWinner(hamster)
        // setDoneLoadingUpdate(true)
    }


    //Overlay
    let addHamsterOverlay: any = null
    if (showAddHamsterOverlay) {
        const closeOverlay = () => { setShowAddHamsterOverlay(false); newGame() }
        addHamsterOverlay = <ShowWinner close={closeOverlay} hamster={winner} />
        console.log('Visar overlayen med vinnarhamstern')
    }

    const handleShowMore = (hamster) => {
        console.log('you clickeeeed', hamster.name)
        setShowAddHamsterOverlay(true)
        setWinner(hamster)
        // setHamster(hamster)
    }

    const renderHamsters = () => {
        if (loading) return <p>Loading hamsters...</p>
        if (hasErrors) return <p>Cannot display hamsters...</p>


        return (
            <div className="play-container">
                {contestants ?
                    contestants.map(hamster => (
                        <article key={hamster.id} className="hamster-card hamster-match-card" >
                            <img className="contestant-hamster-img" alt="hamster" src={"hamsters/" + hamster.imgName} ></img>
                            <button
                                className="main-btn vote-btn"
                                onClick={() => { handleCutestClick(hamster); handleShowMore(hamster); }}>
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