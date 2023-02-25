import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './Pages/SignUpPage'
import LogInPage from './Pages/LogInPage'
import ShoppingPage from './Pages/ShoppingPage'


function App() {
  const [user, setUser]= useState({})
  console.log(user)
  

  return (
    <Routes>
        <Route path='/shop' element={<ShoppingPage user={user}/>} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<LogInPage setUser={setUser}/>} />
    </Routes> 
   
  )
}

export default App