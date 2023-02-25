import React from 'react'
import { NavLink } from 'react-router-dom'


function NavBar() {
  return (
  
    <div className='bg-black w-full h-10 flex'>
      <nav className='flex items-center pl-6'>
        <h1 className='text-white pr-6 text-2xl'>Find<span className='text-red-600'>Flix</span></h1>
        <NavLink to='/' className='text-gray-300/90 pr-4' >Home</NavLink>
        <NavLink to='/watch' className='text-gray-300/90 pr-4'>Watch List</NavLink>
        <NavLink to='/about' className='text-gray-300/90 pr-4'>About</NavLink>
        <NavLink to='/contact' className='text-gray-300/90 pr-4'>Contact</NavLink>
      </nav> 
    </div>
  )
}

export default NavBar