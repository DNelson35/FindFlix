import React from 'react'
import Card from './Card'

function Catigory({ movies, title }) {

    const renderedCards = movies.map(movie => <Card key={movie.id} movie={movie} />)

  return (

    <div className='w-full h-auto bg-zinc-900'>
        <h1 className='text-white text-3xl pt-4'>{title}</h1>
        
        <div className='flex flex-no-wrap overflow-x-scroll'>
            {renderedCards}
        </div>
    </div>
  )
}

export default Catigory