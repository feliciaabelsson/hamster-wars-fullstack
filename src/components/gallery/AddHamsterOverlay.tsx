
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
    const [clickedField, setClickField] = useState<boolean>(false)

    //onChanges 
    const onNameChange = e => {
        setName(e.target.value)
        setClickField(true)
    }
    const onAgeChange = e => setAge(e.target.value)
    const onImgChange = e => setImgName(e.target.value)
    const onFavFoodChange = e => setFavFood(e.target.value)
    const onLovesChange = e => setLoves(e.target.value)

    //Valideringar
    // ett godkänt namn är en sträng med minst två tecken
    const nameIsValid = isValidName(name)
    const ageIsValid = isValidAge(age)

    const formIsValid = nameIsValid && ageIsValid

    // const nameClass = nameIsValid ? 'valid' : 'invalid'


    function isValidName(name: string): boolean {
        // console.log(name)
        return name.length >= 2
    }

    function isValidAge(age: number): boolean {
        if (isNaN(age)) return false
        if (age < 0) return false
        let ageString = String(age)
        if (ageString.includes(',') || ageString.includes('.')) return false
        // Alternativa sätt att kontrollera om ett tal har decimaler: x % 1 !=== 0, (x - Math.floor(x)) !== 0
        return true
    }


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
                        className={nameIsValid ? 'valid' : 'invalid'}
                        // {!nameIsValid && clickedField ?
                        //     <span className="input-alert" >Namnet måste vara minst två tecken.</span>
                        //     : null
                        // }
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
                    {/* När jag klickar på Add hamster ska jag dispatcha till funktionen (aka, skicka actionet till store) 
                    TODO: När jag lägger till får jag ett felmeddelande med GET, försöker fetcha med angivet namn?*/}
                    <button className="main-btn" disabled={!formIsValid} onClick={() => { addNewHamster(); close(); }}> Add hamster </button>
                    <button className="close-btn" onClick={close}>X</button>
                </div>
            </div>
        </div>
    )
}





export default Overlay