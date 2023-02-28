import React from 'react'

function Modal({movie, isOpen, posterUrl}) {
  return (
    isOpen && 
      <div className='fixed top-0 left-0 right-0 z-50 bg-gray-800/50 h-screen w-full flex justify-center items-center'>
        <div className='grid bg-zinc-800 h-auto w-1/2 min-h-96 min-w-[400px] text-white place-items-center rounded-xl px-5 py-5'>
          <div className='h-auto w-1/2 text-center pb-4'>
            <img src={posterUrl} alt={movie.title} className='relative h-full w-full pb-2'/>
            <h3 className='font-bold text-xl'>{movie.title}</h3>
          </div>
          <p className='px-10'>{movie.overview}</p>
         <div className='flex h-auto w-full justify-between pt-4 px-10'>
            <button className='formButton'>Add</button>
            <button className='formButton bg-red-600'>close</button>
         </div>
        </div>
      </div>
  )
}

export default Modal