import { useEffect, useState } from "react"
import { Hamster } from "../../models/Hamster"
import { useSelector } from 'react-redux'
import { hamstersSelector, removeHamster } from '../../features/hamsterReducer'

/*
    TODO:
    Om det är oavgjort mellan flera hamstrar, ska appen slumpa en av dem. 
    (Backend endpoint /hamsters/cutest.)

    Om det av någon anledning inte går att nå backend-servern så ska du visa ett användarvänligt felmeddelande här. 
    Användaren ska också få möjligheten att försöka igen.
*/

async function sendRequest(saveData: any) {
    const response = await fetch('/hamsters/cutest')
    const data = await response.json()
    console.log("the cutest hamster: ", data)
    saveData(data)
}

const CutestHamster = () => {

    const { hamsters, loading, hasErrors } = useSelector(hamstersSelector)
 
    const [hamster, setHamster] = useState<Hamster[] | null>(null);
    // console.log("HAMSTER DATA: ", hamster)
    // const dispatch = useDispatch()


    useEffect(() => {
        sendRequest(setHamster)
    }, [])



    const renderHamster = () => {
        if (loading) return <p>Loading cutest hamster...</p>
        if (hasErrors) return <p>Cannot display hamster...</p>


        return (
            <div>
            {hamster ?
                hamster.map(h => (
                    <div key={h.id}>
                        <img src={"hamsters/" + h.imgName} alt="hamster" className="cutest-hamster-img" />
                        <h4>{h.name}</h4>
                    </div>
                )) : null
            }
        </div>
        )        
    }

 

    return (
        <article className="first-place-container">
            <h2>In <span>1st</span> place</h2>
            {renderHamster()}
        </article>
    )
}

export default CutestHamster