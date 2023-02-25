import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormWrap from '../components/FormWrap'

function SignUpPage() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')

    const navigate = useNavigate()

    const handleSignUp = (e)=> {
        switch(e.target.name){
            case 'userName':
                setUserName(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            case 'verify':
                setVerifyPassword(e.target.value)
                break
            default:
                break
        }
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        if(password === verifyPassword) {
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    admin: false,
                    password: password,
                    cart: []
                })
            })
            .then(resp => resp.json())
            .then(resp => (resp.name === userName)? navigate('/') : null)
            .catch(error => console.log(error))
            navigate('/')
        }
    }


  return (
    
        <FormWrap name='Sign Up'>
            <form className='space-y-4' onSubmit={(e) => HandleSubmit(e)}>
                <label className='formLabel'>Create a UserName</label>
                <input type="text" value={userName} name='userName' onChange={handleSignUp} required className="formInput"/>
                <label className='formLabel'>Create A Password</label>
                <input type="password" value={password} name='password' required onChange={handleSignUp} className="formInput"/>
                <label className='formLabel'>verify your password</label>
                <input type="password" value={verifyPassword} name='verify' required onChange={handleSignUp} className="formInput" />
                <button type='submit' className='formButton'>Submit</button>
            </form>
        </FormWrap>
    )
}

export default SignUpPage