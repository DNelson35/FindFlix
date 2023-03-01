import React from 'react'
import useFetchData from '../Hooks/useFetchData'
import Catigory from '../components/Catigory'




function Home() {

  const {trending, topRated, newMovies, upcomingMovies} = useFetchData()
  
  return (
    <div>
      <Catigory movies={trending} title='Trending Today'/>
      <Catigory movies={topRated} title='Top Rated' />
      <Catigory movies={newMovies} title='New Movies'/>
      <Catigory movies={upcomingMovies} title='Coming Soon'/>
    </div>
    
)
    
}

export default Home