import { useState } from "react"
import { Hamster } from "../../models/Hamster"
import "./gallery.css"
import Overlay from "./Overlay"
import Header from "./Header"
import HamsterGrid from "./HamsterGrid"



const Gallery = () => {

    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(false)

    const addHamster = (hamster: Hamster) => {
        // TODO: anropa setMovies
        console.log('App.addHamster anropad med hamster=', hamster)
    }

    /* TODO: Fråga angående error när jag tar bort :any */
    let addHamsterOverlay: any = null
    if (showAddHamsterOverlay) {
        const closeOverlay = () => setShowAddHamsterOverlay(false)
        addHamsterOverlay = <Overlay close={closeOverlay} addHamster={addHamster} />
    }

    const showOverlay = () => {
        // visa overlay
        setShowAddHamsterOverlay(true)
    }

    return (
        <div className="gallery-container">
            <Header addHamster={showOverlay} />
            <HamsterGrid />
            {addHamsterOverlay}
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