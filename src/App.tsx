import { Link, Switch, Route } from 'react-router-dom'
import './App.css';
import Gallery from './components/gallery/Gallery';
import Play from './components/play/Play';
import Start from './components/start/Start';

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import our recipes selector & fetchHamsters thunk
import { fetchHamsters, hamstersSelector } from './features/hamsterReducer'


function App() {

  const dispatch = useDispatch()
  const { hamsters } = useSelector(hamstersSelector)
  // log the data we have pulled into the recipes variable
  console.log('Hamsters: ', hamsters);

  // dispatch our thunk when component first mounts
  useEffect(() => {
    dispatch(fetchHamsters())
  }, [dispatch])

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
