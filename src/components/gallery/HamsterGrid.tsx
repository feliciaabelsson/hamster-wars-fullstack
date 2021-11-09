
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { hamstersSelector, removeHamster } from '../../features/hamsterReducer'

import "./gallery.css"



const HamsterGrid = () => {
    const { hamsters, loading, hasErrors } = useSelector(hamstersSelector)
    const [isShown, setIsShown] = useState(false)
    const dispatch = useDispatch();

    // const [editingAnimalId, setEditingAnimalId] = useState<string>('')

    const handleDeleteClick = (hamster) => {
        console.log('You delteeeed: ', hamster.id)
        dispatch(removeHamster({ id: hamster.id }));
    }


    const handleShowMore = (hamster) => {
        console.log('you clickeeeed', hamster.id)
        setIsShown(true)

        let addHamsterOverlay: any = null
        if (isShown) {
            const closeOverlay = () => setIsShown(false)
            addHamsterOverlay = <div className="overlay-hamster">{hamster.favFood} <button onClick={() => closeOverlay()}></button></div>
            console.log('Hejhååå')
        }
    }

    // error handling & map successful query data 
    const renderHamsters = () => {
        if (loading) return <p>Loading hamsters...</p>
        if (hasErrors) return <p>Cannot display hamsters...</p>


        return hamsters.map(hamster =>
            <article key={hamster.id} className="hamster-card">
                <img onClick={() => handleShowMore(hamster)}
                    className="hamster-image" src={"hamsters/" + hamster.imgName} alt="hamster" width="300" height="300" >
                </img>
                <h3>{hamster.name}</h3>
                <p>Ålder: {hamster.age} <br></br>
                    Favoritmat: {hamster.favFood}
                </p>
                <button onClick={() => handleDeleteClick(hamster)} className="remove-btn">Remove</button>
                {isShown && <div>{hamster.favFood}</div>}
            </article>
        )
    }


    return (
        <div className="hamster-grid">
            {renderHamsters()}
        </div>
    )
}

export default HamsterGrid;