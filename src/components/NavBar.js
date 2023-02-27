import React from 'react'
import { NavLink } from 'react-router-dom'


function NavBar({ user, onLogOut }) {
  return (
  
    <div className='bg-black w-full h-10 flex '>
      <nav className='flex items-center pl-6 w-full truncate'>
        <h1 className='text-white pr-6 text-2xl'>Find<span className='text-red-600'>Flix</span></h1>
        <NavLink to='/' className='text-gray-300/90 pr-10' >Home</NavLink>
        <NavLink to='/watch' className='text-gray-300/90 pr-10'>My List</NavLink>
        <NavLink to='/about' className='text-gray-300/90 pr-10'>About</NavLink>
        <NavLink to='/contact' className='text-gray-300/90 pr-4'>Contact</NavLink>
        <div className='flex w-full justify-end pr-10 items-center'>
          <h3 className='text-white text-right'>Hi, {user.name} 👋</h3>
          <button className='formButton text-xs' onClick={onLogOut}>Log Out</button>
        </div>

      </nav> 
    </div>
  )
}

export default NavBar