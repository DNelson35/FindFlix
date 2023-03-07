import React from 'react'

function About() {
  return (
    <div className='loginBackground overflow-auto '>
      <div className='block text-center w-full h-full'>
        <h1 className='text-white text-8xl h-20 mb-20'><b>Find<span className='text-red-600'>Flix</span></b></h1>
        <div className='flex-wrap'>
          <p className='flex text-white mt-20 mx-20 text-2xl text-left w-auto'> 
          Welcome to FindFlix, the platform where you can create collections of your favorite new movies and share them with the world. Our goal is to provide a place where real people can find and share movies they enjoy, rather than relying on movie critics, ads, and social media to tell them what to watch.
          </p>
          <br />
          <p className='text-white mx-20 text-2xl text-left w-auto'> Every year, countless great movies get overlooked because of the hype surrounding other films on the market. At FindFlix, we believe that every movie deserves a chance to be discovered and enjoyed. With our platform, you can easily explore a massive library of new and trending movies from the TMDB API and share them with other movie enthusiasts.
          <br />
          If you are tired of endlessly scrolling through streaming services in search of something to watch. FindFlix makes it easy to discover new and exciting movies, curated by real people just like you. Join our community today and start sharing your love of movies with the world.
           </p>
        </div>
      </div>

    </div>
  )
}

export default About