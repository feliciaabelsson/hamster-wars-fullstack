import { Link, Switch, Route } from 'react-router-dom'
import './App.css';
import Gallery from './components/gallery/Gallery';
import Play from './components/play/Play';
import Start from './components/start/Start';

import { useDispatch, /*useSelector*/ } from 'react-redux'
import { useEffect, useState } from 'react'
// import our recipes selector & fetchHamsters thunk
import { fetchHamsters } from './features/hamsterReducer'
import { Hamster } from "./models/Hamster"


function App() {

  const dispatch = useDispatch()
  // const { hamsters } = useSelector(hamstersSelector)
  // log the data we have pulled into the recipes variable
  // console.log('Hamsters: ', hamsters);

  // dispatch our thunk when component first mounts
  useEffect(() => {
    dispatch(fetchHamsters())
  }, [dispatch])


  useEffect(() => {
    sendRequest(setData)
  }, [])

  //Attempt 2 att fetcha alla hamstrar från api
  // const [allHamsters, setAllHamsters] = useState<Hamster[] | null>(null)
  const [data, setData] = useState<Hamster[] | null>(null)

  async function sendRequest(saveData: any) {
    const response = await fetch('/hamsters/') //Det funkar bra med ex: /hamsters/random men inte endast /hamsters
    const data = await response.text()
    saveData(data)
    console.log("I fetched the hamsters ", data)
  }


  return (
    <div className="App">
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/play" className="nav-link">Play</Link>
        <Link to="/gallery" className="nav-link">Gallery</Link>
      </nav>
      <main>
        <Switch>
          <Route path="/" exact><Start /></Route>
          <Route path="/gallery" exact><Gallery /></Route>
          <Route path="/play" exact><Play /></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
