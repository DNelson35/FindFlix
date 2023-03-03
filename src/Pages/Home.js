import React from 'react'
import useFetchData from '../Hooks/useFetchData'
import Category from '../components/Category'
import useListContext from '../Hooks/useListContext'




function Home() {

  const { movieList } = useListContext()

  const {trending, topRated, newMovies, upcomingMovies} = useFetchData()

  console.log(movieList)
  
  return (
    <div>
      {(movieList.length > 0) && <Category movies={movieList} title="collection" />}
      <Category movies={trending} title='Trending Today'/>
      <Category movies={topRated} title='Top Rated' />
      <Category movies={newMovies} title='New Movies'/>
      <Category movies={upcomingMovies} title='Coming Soon'/>
    </div>
    
)
    
}

export default Home