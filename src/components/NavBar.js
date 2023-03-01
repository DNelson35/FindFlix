import React, {useRef, useState} from 'react'
import { NavLink } from 'react-router-dom'
import useListContext from '../Hooks/useListContext'


function NavBar() {

  const [selected, setSelected] = useState(``)

  const [ authorLists, onSelect ] = useListContext()

  const authorOptions = authorLists.map(author => <option key={author.id}>{author.author}: {author.label}</option> )

  const handleChange = (e) => {
    const selectedAuthorList = authorLists.find(
      (author) => `${author.author}: ${author.label}` === e.target.value
    );
    setSelected(e.target.value);
    onSelect(selectedAuthorList);
  };


  return (
  
    <div className='bg-black w-full h-10 flex '>
      <nav className='flex items-center pl-6 w-full truncate'>
        <h1 className='text-white pr-6 text-2xl'>Find<span className='text-red-600'>Flix</span></h1>
        <NavLink to='/' className='text-gray-300/90 pr-10' >Home</NavLink>
        <NavLink to='/watch' className='text-gray-300/90 pr-10'>Add List</NavLink>
        <NavLink to='/about' className='text-gray-300/90 pr-10'>About</NavLink>
        <NavLink to='/contact' className='text-gray-300/90 pr-4'>Contact</NavLink>
        <div className='flex  justify-end w-full h-auto pr-4 '>
          <form>
            <label className='text-white pr-4'>Collections</label>
            <select value={selected} onChange={handleChange}>
              <option value='' default >Pick a Collection</option>
              {authorOptions}
            </select>
          </form>
        </div>
      </nav> 
    </div>
  )
}

export default NavBar