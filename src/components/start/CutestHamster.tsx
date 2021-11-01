import { useEffect, useState } from "react"
import { Hamster } from "../../models/Hamster"
import hamsterImg from "../../hamsters/hamster-1.jpg" /* Temporary image, TODO: Fix image url */

async function sendRequest(saveData: any) {
    const response = await fetch('http://localhost:1337/hamsters/cutest')
    const data = await response.json()
    console.log("fetched data: ", data)
    saveData(data)
}

const CutestHamster = () => {
    const [hamster, setHamster] = useState<Hamster[] | null>(null);
    console.log("HAMSTER DATA: ", hamster)
    // const dispatch = useDispatch()


    useEffect(() => {
        sendRequest(setHamster)
    }, [])

    return (
        <article className="first-place-container">
            {/* TODO: Lägga till (rendera) vinnar-hamstern*/}
            <h2>In <span>1st</span> place</h2>

            {hamster ?
                hamster.map(h => (
                    <div key={h.id}>
                        <img src={hamsterImg} alt="hamster" className="cutest-hamster-img" />
                        <h4>{h.name}</h4>
                    </div>
                ))
                : 'Loading cutest hamster...'
            }




        </article>
    )
}

export default CutestHamster