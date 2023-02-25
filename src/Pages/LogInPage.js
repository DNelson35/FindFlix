import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormWrap from '../components/FormWrap'

function LogInPage({ setUser, onLogIn }) {
  const [userSignin, setuserSignin] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  

  const navigate = useNavigate()

  const handleLoginInput = (e) => {
    if(e.target.name === "user"){
      setuserSignin(e.target.value)
    } else if(e.target.name === 'password'){
      setSignInPassword(e.target.value)
    }
  }

  const handleLogIn = (resp) => {
    setUser(resp[0])
    onLogIn(true)
    navigate('/')
  }


  const HandleSubmit =(e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/users/?name=${userSignin}`)
    .then(resp => resp.json())
    .then(resp => (resp[0].password === signInPassword)? handleLogIn(resp) : null )
    .catch(error => console.log(error))
  }

  return (

    <FormWrap name='Sign In'>
        <form className="space-y-4 " onSubmit={HandleSubmit}>
            <label className='formLabel'>UserName</label>
            <input type='text' className="formInput" name='user' value={userSignin} onChange={handleLoginInput}/>
            <label className="formLabel">Password</label>
            <input type="password" className="formInput" name='password' value={signInPassword} onChange={handleLoginInput}/>
            <button type='submit' className='formButton m-2'>Log In</button>
            <Link to="/signup"><span className='formButton pt-1.5 pb-1.5'>Sign Up</span></Link>
        </form>
    </FormWrap>
    
  )
}

export default LogInPage