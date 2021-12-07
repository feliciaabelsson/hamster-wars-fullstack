import { useEffect, useState } from "react"
import { Hamster } from "../../models/Hamster"
import { useSelector } from 'react-redux'
import { hamstersSelector } from '../../features/hamsterReducer'


const CutestHamster = () => {

    const { loading, hasErrors } = useSelector(hamstersSelector)
    const [hamster, setHamster] = useState<Hamster[] | null>(null);

    const sendRequest = async () => {
        const response = await fetch('/hamsters/cutest')
        const data = await response.json()
        const randomizer = [data[Math.floor(Math.random() * data.length)]]
        setHamster(randomizer)
        // console.log("the cutest hamster: ", data)
    }

    useEffect(() => {
        sendRequest()
    }, [])


    const renderHamster = () => {
        if (loading) return <p>Loading cutest hamster...</p>
        if (hasErrors) return <p>Cannot display hamster...</p>

        return (
            <div>
                {hamster ?
                    hamster.map(h => (
                        <div key={h.id}>
                            <img src={"img/" + h.imgName} alt="hamster" className="cutest-hamster-img" />
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