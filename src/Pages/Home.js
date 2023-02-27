import React, { useEffect, useState } from 'react'
import Catigory from '../components/Catigory'


function Home() {
    const [trending, setTrending] = useState([])
    const [topRated, setTopRated] = useState([])
    const [newMovies, setNewMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=926d6e61797b91844179bbb78d29e2ee')
        .then(resp => resp.json())
        .then(resp => setTrending(resp.results))
        
    }, [])

    useEffect(() => {
      fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=926d6e61797b91844179bbb78d29e2ee&language=en-US&page=1')
      .then(resp => resp.json())
      .then(resp => setTopRated(resp.results))
    }, [])

    useEffect(() => {
      fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=926d6e61797b91844179bbb78d29e2ee&language=en-US&page=1')
      .then(resp => resp.json())
      .then(resp => setNewMovies(resp.results))
    },[])

    useEffect(() => {
      fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=926d6e61797b91844179bbb78d29e2ee&language=en-US&page=1')
      .then(resp => resp.json())
      .then(resp => setUpcomingMovies(resp.results))
    },[])

  
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