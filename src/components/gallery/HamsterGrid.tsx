
import { useSelector } from 'react-redux'
import { hamstersSelector } from '../../features/hamsters'



const HamsterGrid = () => {
    const { hamsters, loading, hasErrors } = useSelector(hamstersSelector)

    // error handling & map successful query data 
    const renderHamsters = () => {
        if (loading) return <p>Loading hamsters...</p>
        if (hasErrors) return <p>Cannot display hamsters...</p>


        return hamsters.map(hamster =>
            <article key={hamster.id} className="hamster-card">
                <img className="hamster-image" src={"hamsters/" + hamster.imgName} alt="hamster" />
                <h3>{hamster.name}</h3>
                <p>Ålder: {hamster.age} <br></br>
                    Favoritmat: {hamster.favFood}
                </p>
                <button className="remove-btn">Remove</button>
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