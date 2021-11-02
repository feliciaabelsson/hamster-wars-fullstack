import { useEffect, useState } from "react"
import hamsterImg from "../../hamsters/hamster-1.jpg" /* Temporary image, TODO: Fix image url */
import { Hamster } from "../../models/Hamster"
// import { RootState } from "../../store"

async function sendRequest(saveData: any) {
    const response = await fetch('http://localhost:1337/hamsters/')
    const data = await response.json()
    // console.log("fetched data: ", data)
    saveData(data)
}

//console.log("HAMSTER DATA: ", hamsterData)
// const dispatch = useDispatch()

// const hamsters = useSelector((state: RootState) => state.hamsters)
// console.log(hamsters)

const HamsterGrid = () => {
    const [hamsterData, setHamsterData] = useState<Hamster[] | null>(null);

    useEffect(() => {
        sendRequest(setHamsterData)
    }, [])

    return (
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
    )
}

export default HamsterGrid;