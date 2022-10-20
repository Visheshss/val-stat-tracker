import {Home} from './pages/home'
import {Player} from './pages/player'
import {
  Routes,
  Route
} from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/player/:name/:tag' element = {<Player/>}/>
      </Routes>
    </div>
  );
}

export default App;
