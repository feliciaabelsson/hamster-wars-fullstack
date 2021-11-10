
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { hamsterAdded } from "../../features/hamsterReducer"
import { Hamster } from "../../models/Hamster"
import './AddHamsterOverlay.css'


interface OverlayProps {
    close: () => void;
    addHamster: (hamster: Hamster) => void;
}

const Overlay = ({ close, addHamster }: OverlayProps) => {

    const dispatch = useDispatch()

    //Inputfält 
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [imgName, setImgName] = useState<string>('')
    const [favFood, setFavFood] = useState<string>('')
    const [loves, setLoves] = useState<string>('')

    //onChanges 
    const onNameChange = e => setName(e.target.value)
    const onAgeChange = e => setAge(e.target.value)
    const onImgChange = e => setImgName(e.target.value)
    const onFavFoodChange = e => setFavFood(e.target.value)
    const onLovesChange = e => setLoves(e.target.value)


    //Data som skickas till POST-requestet
    const hamsterData = {
        name: name,
        age: age,
        imgName: imgName,
        loves: loves,
        favFood: favFood,
        games: 0,
        wins: 0,
        defeats: 0
    }

    const addNewHamster = async () => {
        const response = await fetch('http://localhost:1337/hamsters/',
            {
                method: 'POST',
                headers: { Accept: 'application/json', "Content-Type": "application/json" },
                body: JSON.stringify(hamsterData)
            })

        const newHamster = await response.json()
        console.log("You added a hamster: ", newHamster);
        dispatch(hamsterAdded(newHamster))
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
                    <label htmlFor="loves">What does it love?</label>
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
                    <button className="main-btn" onClick={() => { addNewHamster(); close(); }}> Add hamster </button>
                    <button className="close-btn" onClick={close}>X</button>
                </div>
            </div>
        </div>
    )
}


export default Overlay