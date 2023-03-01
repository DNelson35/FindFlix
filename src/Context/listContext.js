import React, {createContext, useEffect, useState} from 'react'
import WatchList from '../Pages/WatchList'

  const  listContext = createContext() 
// GET /posts?title=json-server&author=typicode
function Provider({ children }) {
    const [movieList, setMovieList] = useState([])
    const [watchList, setWatchList] = useState([])
    const [currList, setCurrList] = useState([])

    useEffect(()=> {
        fetch('http://localhost:3000/watchLists')
        .then(resp => resp.json())
        .then(resp => setWatchList(resp))
    }, [])

    useEffect(() => {
      fetch(`http://localhost:3000/movies?watchlist_ID=${currList.id}`)
        .then(resp => resp.json())
        .then( resp => setMovieList(resp))
    }, [currList])

    const handleSelectedList = (list) => {
        setCurrList(list)
    }

    console.log(movieList)

    // const handleMoviesFetch = (id) => {
    //     fetch(`http://localhost:3000/movies?watchList_id=${id}`)
    //     .then(resp => resp.json())
    //     .then( resp => setMovieList(resp))
    

  return (
    <listContext.Provider value={[watchList, handleSelectedList]}>
        {children}
    </listContext.Provider>
  )
}

export {listContext}
export default Provider