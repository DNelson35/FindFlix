import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './Pages/Home'
import About from './Pages/About'
import AddWatchList from './Pages/AddWatchList'


function App() {

  // TODO: add new routes for updating the movie list. most likely add the remove feture directly in the card

  // TODO: add new routes for Creating a watchList or update the existing routes
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<AddWatchList />} />
        <Route path='/edit' element={<AddWatchList />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App