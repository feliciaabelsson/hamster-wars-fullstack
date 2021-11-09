
import { useEffect, useState } from 'react'
import { Hamster } from "../../models/Hamster"


const RandomHamster = () => {
    const [contestants, setContestants] = useState<Hamster[] | null>(null)

    const getRandomHamsters = async (saveData: any) => {
        //Hämtar data genom fetch
        const res1 = await fetch('http://localhost:1337/hamsters/random')
        console.log("response", res1)
        const data1 = await res1.json()
        console.log("hamster1 ", data1)
        let res2 = await fetch('http://localhost:1337/hamsters/random')
        let data2 = await res2.json()

        //Om data1 och data2 hämtar samma hamster ska en ny fetch göras 
        while (data1.id === data2.id) {
            res2 = await fetch('http://localhost:1337/hamsters/random')
            data2 = await res2.json()
        }

        saveData([data1, data2])
    }

    useEffect(() => {
        getRandomHamsters(setContestants)
    }, [])


    return (

        <div className="play-container">
            {contestants ?
                contestants.map(hamster => (
                    <article key={hamster.id} className="hamster-card hamster-match-card" >
                        <img className="contestant-hamster-img" alt="hamster" src={"hamsters/" + hamster.imgName} ></img>
                        <h3>{hamster.name}</h3>
                        <button
                            className="main-btn vote-btn">I'm the CUTEST</button>
                    </article>
                ))
                : 'Loading hamsters...'
            }
            <h1 className="vs-string"> VS.</h1>
        </div>
    )
}

export default RandomHamster