
interface HeaderProps {
    addHamster: () => void;
}

const Header = ({ addHamster }: HeaderProps) => {
    return (
        <header className="gallery-header">
            <h1 className="gallery-title"> Gallery</h1>
            <p>Here is all of our hamsters. Please, fill free to upload a new one, delete a current one or click on each hamster for more information about each and every unique hamster.</p>
            <button className="main-btn" onClick={addHamster}>Add hamster</button>
        </header>
    )
}

export default Header;