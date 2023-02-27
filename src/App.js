import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import LogInPage from './Pages/LogInPage'
import NavBar from './components/NavBar'
import Hero from './Pages/Hero'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import WatchList from './Pages/WatchList'


function App() {
  const [user, setUser]= useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogOut = () => {
    setLoggedIn(false)
  }
  

  return (
    <div>
      {loggedIn ? (
        <div>
          <NavBar user={user} onLogOut={handleLogOut}/>
          <Routes>
            <Route path='/' element={<Home user={user}/>} />
            <Route path='/watch' element={<WatchList user={user}/>} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
      ) : (

        <Routes>
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LogInPage setUser={setUser} onLogIn={setLoggedIn}/>} />
          <Route path='/' element={<Hero />} /> 
        </Routes> 
      ) 
      }
    </div>
  )
}

export default App