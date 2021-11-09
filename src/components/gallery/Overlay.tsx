
import { Hamster } from "../../models/Hamster"
import { useState } from 'react'
import './Overlay.css'

import { useDispatch } from 'react-redux'
import { hamsterAdded } from "../../features/hamsterReducer"
import { nanoid } from '@reduxjs/toolkit'
// import { useFirestore } from 'react-redux-firebase'


interface OverlayProps {
    close: () => void;
    addHamster: (hamster: Hamster) => void;
}

const Overlay = ({ close, addHamster }: OverlayProps) => {

    // const firebase = useFirebase()
    // const firestore = useFirestore()
    const dispatch = useDispatch()

    const [name, setName] = useState<string>('')
    // const [id, setId] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [imgName, setImgName] = useState<string>('')
    const [favFood, setFavFood] = useState<string>('')
    const [loves, setLoves] = useState<string>('')
    // const [wins, setWins] = useState<number>(0)
    // const [defeats, setDefeats] = useState<number>(0)
    // const [games, setGames] = useState<number>(0)


    const onNameChange = e => setName(e.target.value)
    const onAgeChange = e => setAge(e.target.value)
    const onImgChange = e => setImgName(e.target.value)
    const onFavFoodChange = e => setFavFood(e.target.value)
    const onLovesChange = e => setLoves(e.target.value)

    const onAddHamsterClicked = () => {
        if (name && age && imgName && favFood && loves) {
            dispatch(
                hamsterAdded({
                    id: nanoid(),
                    name,
                    age,
                    imgName,
                    favFood,
                    loves
                })
            )
            setName('')
            setAge(0)
            setImgName('')
            setFavFood('')
            setLoves('')
        }
        // return firestore.collection('hamsters').add(hamsterAdded)
    }


    const handleAddHamster = () => {
        // förbered Hamster-objekt och anropa addMovie-funktionen
        let hamster: Hamster = {
            // Hämta riktiga värden från formuläret
            name: name, age: 0, imgName: imgName, favFood: favFood, loves: loves, wins: 0, defeats: 0, games: 0
        }
        addHamster(hamster)
        close()
    }



    return (
        <div className="overlay">
            <div className="dialog">
                <h2>Add a new hamster</h2>
                <form>
                    <label htmlFor="name">Write a name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Write a name"
                        value={name}
                        onChange={onNameChange}
                    />
                    <label htmlFor="age">Add age</label>
                    <input
                        id="age"
                        type="number"
                        placeholder="Insert age"
                        value={age}
                        onChange={onAgeChange}
                    />
                    <label htmlFor="img">Add image url</label>
                    <input
                        id="img"
                        type="text"
                        placeholder="Image URL"
                        value={imgName}
                        onChange={onImgChange}
                    />
                    <label htmlFor="favFood">Add favorite food</label>
                    <input
                        id="favFood"
                        type="text"
                        placeholder="Fave food"
                        value={favFood}
                        onChange={onFavFoodChange}
                    />
                    <label htmlFor="loves">Add favorite food</label>
                    <input
                        id="loves"
                        type="text"
                        placeholder="Loves"
                        value={loves}
                        onChange={onLovesChange}
                    />

                </form>
                <div>
                    {/* När jag klickar på Add hamster ska jag dispatcha till funktionen (aka, skicka actionet till store) */}
                    <button className="main-btn" onClick={onAddHamsterClicked}> Add hamster </button>
                    <button className="close-btn" onClick={close}>X</button>
                </div>



            </div>
        </div>
    )
}


export default Overlay