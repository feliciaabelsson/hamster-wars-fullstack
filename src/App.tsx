import { Link, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
 import { fetchHamsters } from './features/hamsterReducer'
import { Hamster } from "./models/Hamster"
import Gallery from './components/gallery/Gallery';
import Play from './components/play/Play';
import Start from './components/start/Start';
import './App.css';


function App() {

  const dispatch = useDispatch()

  //dispatch our thunk when component first mounts
  useEffect(() => {
    dispatch(fetchHamsters())
  }, [dispatch])


  // useEffect(() => {
  //   sendRequest(setData)
  // }, [])

 
  // const [data, setData] = useState<Hamster[] | null>(null)

  // async function sendRequest(saveData: any) {
  //   const response = await fetch('/hamsters') 
  //   const data = await response.json()
  //   saveData(data)
  //   console.log("I fetched the hamsters ", data)

   
  // }


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
