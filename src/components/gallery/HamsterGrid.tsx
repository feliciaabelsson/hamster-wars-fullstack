
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { hamstersSelector, removeHamster } from '../../features/hamsterReducer'
import "./gallery.css"
import HamsterOverlay from './HamsterOverlay';
import { Hamster } from "../../models/Hamster"


const HamsterGrid = () => {
    const dispatch = useDispatch();

    const { hamsters, loading, hasErrors } = useSelector(hamstersSelector)
    const [isShown, setIsShown] = useState(false)
    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(false)
    const [hamster, setHamster] = useState()

    //Delete hamster
    const handleDeleteClick = (hamster) => {
        console.log('You delteeeed: ', hamster.id)
        dispatch(removeHamster({ id: hamster.id }));
    }

    async function deleteHamster(id: string) {
        await fetch('http://localhost:1337/hamsters/' + id,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
        // const hamsterData = await response.json()
        // console.log("deleted: ", hamsterData)
    }



    //Overlay
    let addHamsterOverlay: any = null
    if (showAddHamsterOverlay) {
        const closeOverlay = () => setShowAddHamsterOverlay(false)
        addHamsterOverlay = <HamsterOverlay close={closeOverlay} hamster={hamster} />
        console.log('Hejhååå')
    }

    const handleShowMore = (hamster) => {
        console.log('you clickeeeed', hamster.id)
        setShowAddHamsterOverlay(true)
        setHamster(hamster)
    }


    // error handling & map successful query data 
    const renderHamsters = () => {
        if (loading) return <p>Loading hamsters...</p>
        if (hasErrors) return <p>Cannot display hamsters...</p>


        return hamsters.map(hamster =>
            <article key={hamster.id} className="hamster-card">
                <img onClick={() => { handleShowMore(hamster); }}
                    className="hamster-image" src={"hamsters/" + hamster.imgName} alt="hamster" width="300" height="300" >
                </img>
                <h3>{hamster.name}</h3>
                <p>Age: {hamster.age} <br></br>
                    Favorite food: {hamster.favFood}
                </p>
                <button onClick={() => { deleteHamster(hamster.id); handleDeleteClick(hamster); }} className="remove-btn">Remove</button>
                {/* {isShown && <div>{hamster.favFood}</div>} */}
            </article>
        )
    }


    return (
        <div className="hamster-grid">
            {renderHamsters()}
            {addHamsterOverlay}
        </div>
    )
}



export default HamsterGrid;