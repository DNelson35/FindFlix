import React, {useState} from 'react'
import Card from './Card'
import Modal from './Modal'

function Catigory({ movies, title }) {
  const [selectedMovie, setSelectedMovie] = useState()
  const [isOpen, setIsOpen] = useState(false)


  const handleSelectedMovie = (movie) => {
    setSelectedMovie(movie)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

    const renderedCards = movies.map(movie => <Card key={movie.id} movie={movie} onSelect={handleSelectedMovie} />)

  return (

    <div className='w-full h-auto bg-zinc-900'>
        <h1 className='text-white text-3xl pt-4'>{title}</h1>
        <div className='flex flex-no-wrap overflow-x-scroll'>
            {renderedCards}
            {isOpen && <Modal movie={selectedMovie} onClose={handleClose} title={title} />}
        </div>
    </div>
  )
}

export default Catigory