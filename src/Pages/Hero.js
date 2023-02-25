import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }

  return (
    <div className='bg-[url(https://i.pinimg.com/originals/95/ea/f8/95eaf8f43b75d58122081002ebf31d61.jpg)] bg-cover bg-center h-screen w-full'>
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <h1 className=' text-white font-bold text-9xl'>Find<span className='text-red-600'>Flix</span></h1>
            <button className='formButton text-2xl' onClick={handleClick}>Log In</button>
        </div>
    </div>
  )
}

export default Hero