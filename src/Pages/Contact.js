import React from 'react'

function Contact() {
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

export default Contact