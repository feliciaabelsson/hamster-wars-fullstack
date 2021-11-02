import { Link, Switch, Route } from 'react-router-dom'
import './App.css';
import Gallery from './components/gallery/Gallery';
import Play from './components/play/Play';
import Start from './components/start/Start';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/" className="nav-link">Home</Link>
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
