import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import LogInPage from './Pages/LogInPage'
import NavBar from './components/NavBar'
import Hero from './Pages/Hero'
import Home from './Pages/Home'


function App() {
  const [user, setUser]= useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  

  return (
    <div>
      {loggedIn ? (
        <div>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home user={user}/>} />
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