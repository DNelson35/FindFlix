import React from 'react'
import useFetchData from '../Hooks/useFetchData'
import Category from '../components/Category'
import useListContext from '../Hooks/useListContext'




function Home() {

  const { movies } = useListContext()

  const {trending, topRated, newMovies, upcomingMovies, isLoading} = useFetchData()
  
  return (
    isLoading? 
    <div className='flex h-screen w-full justify-center items-center bg-zinc-900'>
      <h1 className='text-white text-5xl'>Loading......</h1>
    </div> 
    :
    <div>
      {(movies.length > 0) && <Category movies={movies} title="collection" />}
      <Category movies={trending} title='Trending Today'/>
      <Category movies={topRated} title='Top Rated' />
      <Category movies={newMovies} title='New Movies'/>
      <Category movies={upcomingMovies} title='Coming Soon'/>
    </div>
    
)
    
}

export default Home