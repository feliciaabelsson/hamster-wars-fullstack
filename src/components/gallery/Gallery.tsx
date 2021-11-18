import { useState } from "react"
import { Hamster } from "../../models/Hamster"
import "./gallery.css"
import Overlay from "./AddHamsterOverlay"
import Header from "./Header"
import HamsterGrid from "./HamsterGrid"


const Gallery = () => {

    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(false)

    const addHamster = (hamster: Hamster) => {
        console.log('App.addHamster anropad med hamster=', hamster)
    }

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

    )
}




export default Gallery