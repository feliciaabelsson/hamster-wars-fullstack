
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { hamstersSelector, removeHamster } from '../../features/hamsterReducer'
import "./gallery.css"
import HamsterOverlay from './HamsterOverlay';


const HamsterGrid = () => {
    const dispatch = useDispatch();

    const { hamsters, loading, hasErrors } = useSelector(hamstersSelector)
    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(false)
    const [hamster, setHamster] = useState()
      
    
    //Delete hamster in store
    const handleDeleteClick = (hamster) => {
        // console.log('You deleted: ', hamster.id)
        dispatch(removeHamster({ id: hamster.id }));
    }

    //Delete hamster in api
    async function deleteHamster(id: string) {
        await fetch('/hamsters/' + id,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
        // console.log("deleted: ", hamsterData)
    }

    //Overlay
    let addHamsterOverlay: any = null
    if (showAddHamsterOverlay) {
        const closeOverlay = () => setShowAddHamsterOverlay(false)
        addHamsterOverlay = <HamsterOverlay close={closeOverlay} hamster={hamster} />
    }

    const handleShowMore = (hamster) => {
        // console.log('you clicked', hamster.id)
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
                    className="hamster-image" src={"img/" + hamster.imgName} alt="hamster" width="300" height="300" >
                </img>
                <h3>{hamster.name}</h3>
                <p>Age: {hamster.age} <br></br>
                    Favorite food: {hamster.favFood}
                </p>
                <button onClick={() => { deleteHamster(hamster.id); handleDeleteClick(hamster); }} className="remove-btn">Remove</button>
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