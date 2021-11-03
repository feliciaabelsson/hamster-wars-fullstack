import { useEffect, useState } from "react"
import { Hamster } from "../../models/Hamster"

/*
    TODO:
    Visa den hamster som vunnit mest. Vi räknar (antal vinster) - (antal förluster). 
    Om det är oavgjort mellan flera hamstrar, ska appen slumpa en av dem. 
    (Backend endpoint /hamsters/cutest.)

    Om det av någon anledning inte går att nå backend-servern så ska du visa ett användarvänligt felmeddelande här. 
    Användaren ska också få möjligheten att försöka igen.
*/

async function sendRequest(saveData: any) {
    const response = await fetch('http://localhost:1337/hamsters/cutest')
    const data = await response.json()
    // console.log("fetched data: ", data)
    saveData(data)
}

const CutestHamster = () => {
    const [hamster, setHamster] = useState<Hamster[] | null>(null);
    // console.log("HAMSTER DATA: ", hamster)
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
                        <img src={"hamsters/" + h.imgName} alt="hamster" className="cutest-hamster-img" />
                        <h4>{h.name}</h4>
                    </div>
                ))
                : 'Loading cutest hamster...'
            }




        </article>
    )
}

export default CutestHamster