import React from 'react'
import useListContext from '../Hooks/useListContext'

function Modal({movie, onClose, title}) {

  const { currList, setMovies, movies } = useListContext()

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`


  // TODO: if time allowes switch form alert to a screen notification

  const handleAddbtn = () => {
    if(currList){
      fetch(' http://localhost:3000/movies', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          watchlist_ID: parseInt(currList)
        })
      })
      .then(resp => resp.json())
      .then(resp => setMovies([...movies, resp]))
    } else {
      alert('pick a collection')
    }
    onClose()
  }

  const handleRemoveButton = () => {
    if(currList){
      fetch(`http://localhost:3000/movies/${movie.id}`, {
        method: 'DELETE',
      })
      .then(setMovies(movies.filter(currMovie => movie.id !== currMovie.id)))
    }
    onClose()
  }

  
  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-gray-800/50 h-screen w-full flex justify-center items-center'>
      
      <div className='grid bg-zinc-800 h-auto w-1/2 min-h-96 min-w-[400px] text-white place-items-center rounded-xl px-5 py-5'>
        <div className='h-auto w-1/2 text-center pb-4'>
          <img src={posterUrl} alt={movie.title} className='relative h-full w-full pb-2'/>
          <h3 className='font-bold text-xl'>{movie.title}</h3>
        </div>
        <p className='px-10'>{movie.overview}</p>
        <div className='flex h-auto w-full justify-between pt-4 px-10'>
          {(title === 'collection')?<button className='formButton' onClick={handleRemoveButton}>Remove</button> : <button className='formButton' onClick={handleAddbtn}>Add</button>}
          <button className='formButton bg-red-600' onClick={onClose}>close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal