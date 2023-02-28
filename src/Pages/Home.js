import React, { useEffect, useState } from 'react'
import useFetchData from '../Hooks/useFetchData'
import Catigory from '../components/Catigory'
import Modal from '../components/Modal'

// 2 forms 1 form to create watchlist 
// 1 form to add to watchlist.... put in modal?
// modal for adding to list from dropdown
// 
// add a form that creates a watchlist author and watchlist type when the watchlist. when a user clicks on a card open a modal with a dropdown to select witch watchlist they want to add to. when they select a watchlist the watchlist id will be passed inot a fecth looking at the movies list when the movies list creates the movie it will add a watchlistID equal to the watchlist id. the post will add the movie to that list. when retriving the list you select witch list you want to view and a get request will then find any movie that has a watchlistID equal to the watchlist and display it.
// 
// GET /posts?title=json-server&author=typicode


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