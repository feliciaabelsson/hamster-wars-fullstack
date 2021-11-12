
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Hamster } from "../../models/Hamster"
import ShowWinner from './ShowWinner'
import { hamstersSelector, removeHamster } from '../../features/hamsterReducer'



const RandomHamster = () => {
    const { hamsters, loading, hasErrors } = useSelector(hamstersSelector)
 
    const [contestants, setContestants] = useState<Hamster[] | null>(null)
    const [showResult, setShowResult] = useState<boolean>(false)
    const [winner, setWinner] = useState<Hamster | null>(null)
    const [loser, setLoser] = useState<Hamster | null>(null)
    const [showAddMovieOverlay, setShowAddMovieOverlay] = useState<boolean>(true)  // ändra till false när vi testat klart
    const dispatch = useDispatch();

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


    // const updateLoser = async (hamster: Hamster) => {
    //     setLoser(hamster)
    //     await fetch("http://localhost:1337/hamsters/" + hamster.id, {
    //         method: 'PUT',
    //         body: JSON.stringify({ defeats: hamster.defeats + 1, games: hamster.games + 1 }),
    //         headers: { "Content-Type": "application/json" }
    //     })
    // }

    // const updateWinner = async (x: Hamster) => {
    //     setWinner(x)
    //     //PUT update wins ++, games ++
    //     await fetch("http://localhost:1337/hamsters/" + x.id, {
    //         method: 'PUT',
    //         body: JSON.stringify({ wins: x.wins + 1, games: x.games + 1 }),
    //         headers: { "Content-Type": "application/json" }
    //     })
    // }



    const handleCutestClick = (hamster: Hamster) => {
        setWinner(hamster)


        if (!contestants) {
            return
        }

        if (hamster.id === contestants[0].id) {
            setLoser(contestants[1])
        } else {
            setLoser(contestants[0])
        }

        console.log(hamster)
        // showOverlay(hamster)
        // newGame()
        // await updateMatches(x, y)

        // updateLoser(hamster)
        // updateWinner(hamster)
        // setDoneLoadingUpdate(true)


    }




    // let addHamsterOverlay: any = null
    // if (showAddMovieOverlay) {
    //     const closeOverlay = () => setShowAddMovieOverlay(false)
    //     addHamsterOverlay = <ShowWinner close={closeOverlay} winner={winner} />
    // }

    const showOverlay = () => {
        // console.log('The winner', hamster)
        // visa overlay
        setShowAddMovieOverlay(true)
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
                            onClick={() => handleCutestClick(hamster)}>
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
        </div>
    )
}

export default RandomHamster