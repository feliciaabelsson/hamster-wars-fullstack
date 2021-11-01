import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Hamster } from "../../models/Hamster"
import { RootState } from "../../store"
import hamsterImg from "../../hamsters/hamster-1.jpg" /* Temporary image, TODO: Fix image url */
import "./gallery.css"

async function sendRequest(saveData: any) {

    const response = await fetch('http://localhost:1337/hamsters/')
    const data = await response.json()
    // console.log("fetched data: ", data)
    saveData(data)
}

const Gallery = () => {
    const [hamsterData, setHamsterData] = useState<Hamster[] | null>(null);
    console.log("HAMSTER DATA: ", hamsterData)
    const dispatch = useDispatch()


    useEffect(() => {
        sendRequest(setHamsterData)
    }, [])



    // const hamsters = useSelector((state: RootState) => state.hamsters)
    // console.log(hamsters)



    return (
        <div>
            <h1 className="gallery-title"> Gallery</h1>

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
        </div>



        // <>
        // <h1> Hamsters </h1>
        // <button onClick={() => setShowAddForm(!showAddForm)}>Add Hamster</button>

        // { showAddForm ? 
        //     <AddForm show={showAddForm} set={setShowAddForm} />
        // : null}
        // <section className="gallery-container">
        // { allHamsters? 

        // allHamsters.map(x => (
        //     <Card key={x.id} hamster={x} /* deleteItem={handleDelete} showInfo={handleShowInfo}  */
        //     hamsters={allHamsters} setHamsters={setAllHamsters} /* showDisplay={showDisplayHamster} display={displayHamster} */ />

        //     ))
        //     : 'Loading hamsters...'}

        // </section>
        // </>
    )
}



export default Gallery