import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom'
import React, {lazy,Suspense,useTransition} from 'react'
import { NavBar } from './components/navbar';

const Home = lazy(() => import('./pages/home').then( module => {
  return {default:module.Home}
}))
const Player = lazy(() => import('./pages/player').then( module => {
  return {default:module.Player}
}))



function App() {

  return (
      <div id='background'>
        <NavBar/>
        <Suspense>
          <Routes>
                <Route path = '/' element = {<Home/>}/>
                <Route path = '/player/:searchedName/:searchedTag' element = {<Player/>}/>
          </Routes>
        </Suspense>
      </div>
  );
}

export default App;
