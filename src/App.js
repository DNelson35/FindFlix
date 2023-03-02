import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import WatchList from './Pages/WatchList'


function App() {

  // TODO: add new routes for updating the movie list. most likely add the remove feture directly in the card

  // TODO: add new routes for Creating a watchList or update the existing routes
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/watch' element={<WatchList />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App