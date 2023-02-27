import React from 'react'

function Card({movie}) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div className='flex-none mx-4 my-8 h-60 w-44 border rounded-lg'>
        <img src={posterUrl} alt={movie.title} className='h-60 w-full' />
        <h3 className='text-white relative overflow-hidden'>{movie.title}</h3>
    </div>
  )
}

export default Card