import {useState, useEffect} from 'react'

function useFetchData() {

    const API_KEY = process.env.REACT_APP_API_KEY

    const [trending, setTrending] = useState([])
    const [topRated, setTopRated] = useState([])
    const [newMovies, setNewMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])

  
  console.log(API_KEY)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
        .then(resp => resp.json())
        .then(resp => setTrending(resp.results))

        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
        .then(resp => resp.json())
        .then(resp => setTopRated(resp.results))
        
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
        .then(resp => resp.json())
        .then(resp => setNewMovies(resp.results))
        
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
        .then(resp => resp.json())
        .then(resp => setUpcomingMovies(resp.results))

    }, [API_KEY])

  return {trending, topRated, newMovies, upcomingMovies}
}

export default useFetchData