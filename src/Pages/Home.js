import React from 'react'
import useFetchData from '../Hooks/useFetchData'
import Catigory from '../components/Catigory'
import useListContext from '../Hooks/useListContext'




function Home() {

  const { movieList } = useListContext()

  const {trending, topRated, newMovies, upcomingMovies} = useFetchData()
  
  console.log(movieList.length > 1)
  return (
    <div>
      {(movieList.length > 1) && <Catigory movies={movieList} title="collection" />}
      <Catigory movies={trending} title='Trending Today'/>
      <Catigory movies={topRated} title='Top Rated' />
      <Catigory movies={newMovies} title='New Movies'/>
      <Catigory movies={upcomingMovies} title='Coming Soon'/>
    </div>
    
)
    
}

export default Home