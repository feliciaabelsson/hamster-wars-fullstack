
import { Hamster } from "../../models/Hamster"
import { useState } from 'react'
import './Overlay.css'




interface OverlayProps {
    close: () => void;
    addHamster: (hamster: Hamster) => void;
}

const Overlay = ({ close, addHamster }: OverlayProps) => {
    const [name, setName] = useState<string>('')
    // const [id, setId] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [imgName, setImgName] = useState<string>('')
    const [favFood, setFavFood] = useState<string>('')
    const [loves, setLoves] = useState<string>('')
    const [wins, setWins] = useState<number>(0)
    const [defeats, setDefeats] = useState<number>(0)
    const [games, setGames] = useState<number>(0)


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
                    <input id="name" type="text" placeholder="Write a name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <label htmlFor="age">Add age</label>
                    <input id="age" type="number" placeholder="Insert age" />
                    <label htmlFor="img">Add image url</label>
                    <input id="img" type="text" placeholder="Image URL" />

                </form>
                <div>
                    {/* När jag klickar på Add hamster ska jag dispatcha till funktionen (aka, skicka actionet till store) */}
                    <button className="main-btn" onClick={handleAddHamster}> Add hamster </button>
                    <button className="close-btn" onClick={close}>X</button>
                </div>



            </div>
        </div>
    )
}


export default Overlay