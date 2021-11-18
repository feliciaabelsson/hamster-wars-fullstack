
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { hamsterAdded } from "../../features/hamsterReducer"
import { Hamster } from "../../models/Hamster"
import './AddHamsterOverlay.css'

interface OverlayProps {
    close: () => void;
    addHamster: (hamster: Hamster) => void;
}

const Overlay = ({ close }: OverlayProps) => {

    const dispatch = useDispatch()
    // const { hamsters, loading, hasErrors } = useSelector(hamstersSelector)
    // const [hamsters, setHamsters] = useState()

    //Inputfält 
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [imgName, setImgName] = useState<string>('')
    const [favFood, setFavFood] = useState<string>('')
    const [loves, setLoves] = useState<string>('')
    const [clickedField, setClickField] = useState<boolean>(false)
    const [ageClicked, setAgeClicked] = useState<boolean>(false)
    const [foodClicked, setFoodClicked] = useState<boolean>(false)
    const [lovesClicked, setLovesClicked] = useState<boolean>(false)

    //onChanges 
    const onNameChange = e => {
        setName(e.target.value)
        setClickField(true)
    }
    const onAgeChange = e => {
        setAge(e.target.value)
        setAgeClicked(true)
    }
    //När man skriver en siffra blir textraden som en bild i bild-mappen
    const onImgChange = e => {
        setImgName(`hamster-${e.target.value}.jpg`)
        setClickField(true)
    }

    const onFavFoodChange = e => {
        setFavFood(e.target.value)
        setFoodClicked(true)
    }
    const onLovesChange = e => {
        setLoves(e.target.value)
        setLovesClicked(true)
    }   

    //Valideringar
    const nameIsValid = isValidName(name)
    const ageIsValid = isValidAge(age)
    const imgIsValid = isImgValid(imgName)
    const foodIsValid = isValidFood(favFood)
    const lovesIsValid = isValidLove(loves)
    const formIsValid = nameIsValid && ageIsValid && foodIsValid && lovesIsValid && imgIsValid


    //Functions
    function isValidName(name: string): boolean {
        // console.log(name)
        return name.length >= 2
    }

    function isValidAge(age: number): boolean {
        if (isNaN(age)) return false
        if (age <= 0) return false
        let ageString = String(age)
        if (ageString.includes(',') || ageString.includes('.')) return false
        return true
    }

    /* Inte rätt validering */
    function isImgValid(imgName: string): boolean {
        return imgName.length >=2
    }

    function isValidFood(favFood: string): boolean {
        return favFood.length >= 2
    }

    function isValidLove(loves: string): boolean {
        return loves.length >= 2
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

    /* OBS - Måste lösas:
        Nu måste uppdatera sidan för att hamstern ska synas
    */
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
                        id="name"
                        type="text"
                        placeholder="Write a name"
                        value={name}
                        onChange={onNameChange}
                        />
                        {!nameIsValid && clickedField ?
                            <span className="input-alert"> Name must be atleast 2 signs.</span>
                            : null
                        }
                    <label htmlFor="age">Add age</label>
                    <input
                        className={ageIsValid ? 'valid' : 'invalid'}
                        id="age"
                        type="number"
                        placeholder="Insert age"
                        value={age}
                        onChange={onAgeChange}
                    />
                     {!ageIsValid && ageClicked ?
                        <span className="input-alert"> Age must be a number and higher than 0.</span>
                        : null
                    }
                    <label htmlFor="img">Pick a number between 1-40</label>
                    <input
                        className={imgIsValid ? 'valid' : 'invalid'}
                        id="img"
                        type="text"
                        placeholder="Image URL"
                        value={imgName}
                        onChange={onImgChange}
                    />
                    {!imgIsValid && clickedField ?
                        <span className="input-alert"> Must be a number and higher than 0.</span>
                        : null
                    }
                    <label htmlFor="favFood">Add favorite food</label>
                    <input
                        className={foodIsValid ? 'valid' : 'invalid'}
                        id="favFood"
                        type="text"
                        placeholder="Fave food"
                        value={favFood}
                        onChange={onFavFoodChange}
                    />
                    {!foodIsValid && foodClicked ?
                        <span className="input-alert"> Favorite food must be atleast 2 signs.</span>
                        : null
                    }
                    <label htmlFor="loves">What does it love?</label>
                    <input
                        className={lovesIsValid ? 'valid' : 'invalid'}
                        id="loves"
                        type="text"
                        placeholder="Loves"
                        value={loves}
                        onChange={onLovesChange}
                    />
                    {!lovesIsValid && lovesClicked ?
                        <span className="input-alert"> Loves must be atleast 2 signs.</span>
                        : null
                    }
                </form>
                <div>
                    <button className="main-btn" disabled={!formIsValid} onClick={() => { addNewHamster(); close(); }}> Add hamster </button>
                    <button className="close-btn" onClick={close}>X</button>
                </div>
            </div>
        </div>
    )
}

export default Overlay