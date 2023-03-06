import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import FormWrap from '../components/FormWrap'
import useListContext from '../Hooks/useListContext'


function UpdateWatchList() {
    // const navigate = useNavigate()
    const { currList, watchLists, setWatchLists,movies, setMovies} = useListContext()

    const [formInput, setFormInput] = useState({
      author: '',
      label: '',
    })

    useEffect(() => {
      if(!currList){
        setFormInput({
          author: '',
          label: '',
        })
        return
      }
      fetch(`http://localhost:3000/watchLists/${currList}`)
      .then(resp => resp.json())
      .then(watchList => setFormInput(watchList))
    }, [currList])
    
    const handleFormInput = (e) => {
      setFormInput({...formInput, [e.target.name]: e.target.value})
    }

    const handleUpdateBtn = () => {
     
      fetch(`http://localhost:3000/watchLists/${currList}`,{
        method: 'PATCH',
        headers: {
           'Content-Type': 'application/json' 
          },
          body: JSON.stringify(formInput)
      })
      .then(resp => resp.json())
      .then(updatedWatchList => setWatchLists(watchLists.map(watchList => {
       if(updatedWatchList.id === watchList.id){
         return updatedWatchList
       }
       return watchList
      })))
    }
    console.log(movies)

    const handleDeleteBtn = () => {
      movies.forEach(movie => {
        fetch(`http://localhost:3000/movies/${movie.id}`, {
          method: `DELETE`,
        })
      })
      
      fetch(`http://localhost:3000/watchLists/${currList}`,{
        method: 'DELETE',
      })
      .then(setWatchLists(watchLists.filter(watchlist =>`${watchlist.id}` !== currList)))
      .then(setFormInput({
        author: '',
        label: '',
      }))
      
      setMovies([])
    }
  
    const handleFormSubmit = (e) => {
      e.preventDefault()
    }

  return (
    <div>
    <FormWrap name='Update A List'>
    <form className="space-y-4 " onSubmit={handleFormSubmit}  >
        <label className='formLabel'>Author</label>
        <input required type='text' className="formInput" name='author' value={formInput.author} onChange={handleFormInput} />
        <label className="formLabel">List Name</label>
        <input required type="text" className="formInput" name='label' value={formInput.label} onChange={handleFormInput} />
        <button type='submit' className='formButton m-2' onClick={handleUpdateBtn}>Update</button>
        <button type='submit' className='formButton bg-red-500 m-2' onClick={handleDeleteBtn}>Delete</button>
    </form>
  </FormWrap>
  </div>
  )
}

export default UpdateWatchList