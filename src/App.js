import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './Pages/Home'
import About from './Pages/About'
import AddWatchList from './Pages/AddWatchList'
import UpdateWatchList from './Pages/UpdateWatchList'


function App() {


  // TODO: add the remove feture directly in the card
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<AddWatchList />} />
        <Route path='/edit' element={<UpdateWatchList />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App