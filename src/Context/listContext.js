import React, {createContext, useEffect, useState} from 'react'

  const  listContext = createContext() 

function Provider({ children }) {
    const [movies, setMovies] = useState([])
    const [watchLists, setWatchLists] = useState([])
    const [currList, setCurrList] = useState('')
    

    useEffect(()=> {
        fetch('http://localhost:3000/watchLists')
        .then(resp => resp.json())
        .then(watchLists => setWatchLists(watchLists))
    }, [])
    

    useEffect(() => {
      if(!currList){
        setMovies([])
        return
      }
      fetch(`http://localhost:3000/movies?watchlist_ID=${currList}`)
        .then(resp => resp.json())
        .then(movies => setMovies(movies))
    }, [currList])


    const handleSelectedList = (list) => {
        setCurrList(list)
    }

  return (
    <listContext.Provider value={{ watchLists, setWatchLists, handleSelectedList, currList, setCurrList, movies, setMovies }}>
        {children}
    </listContext.Provider>
  )
}

export { listContext }
export default Provider