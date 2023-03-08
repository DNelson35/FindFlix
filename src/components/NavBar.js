import React from 'react'
import { NavLink } from 'react-router-dom'
import useListContext from '../Hooks/useListContext'


function NavBar() {

  const { watchLists, handleSelectedList, currList } = useListContext()

  const WatchListOptions = watchLists.map(watchList => <option key={watchList.id} value={watchList.id}>{watchList.author}: {watchList.label}</option> )

  const handleChange = (e) => {
    handleSelectedList(e.target.value)
  };


  return (
  
    <div className='bg-black w-full h-10 flex '>
      <nav className='flex items-center pl-6 w-full truncate'>
        <h1 className='text-white pr-6 text-2xl'>Find<span className='text-red-600'>Flix</span></h1>
        <NavLink to='/' className='text-gray-300/90 pr-10' >Home</NavLink>
        <NavLink to='/create' className='text-gray-300/90 pr-10'>Create List</NavLink>
        <NavLink to='/edit' className='text-gray-300/90 pr-10' >
          Update List
        </NavLink>
        <NavLink to='/about' className='text-gray-300/90 pr-10'>About</NavLink>
        <div className='flex  justify-end w-full h-auto pr-4 '>
          <form>
            <label className='text-white pr-4'>Collections</label>
            <select value={currList} onChange={handleChange}>
              <option value='' default >Pick a Collection</option>
              {WatchListOptions}
            </select>
          </form>
        </div>
      </nav> 
    </div>
  )
}

export default NavBar