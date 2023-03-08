# FindFlix Code Walkthrough

Here we will walk through how each component is setup and how it works.

## index.js
```javascript
import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from './Context/listContext';

const el = document.getElementById('root')

const root = ReactDOM.createRoot(el)


root.render(
    <Provider>
        <Router >
            <App />
        </Router>
    </Provider>
)

```

This code is setting up a React application using ReactDOM to render the App component wrapped in a Router component from the react-router-dom library. Additionally, it is using a Provider component from a custom "listContext" context to provide global state management to the App and its child components.

The first line imports the CSS file for styling.

The next few lines import React and ReactDOM/client to enable React components to be rendered on the client-side.

The App component is imported from a separate file, and the BrowserRouter component is imported from react-router-dom to enable client-side routing.

The Provider component is imported from a custom context file.

Next, the code gets the DOM element with the ID of "root" and creates a root using ReactDOM.createRoot().

Finally, it renders the Provider, wrapping the Router and App components, inside the root using the root.render() method. This provides the top-level state management for the entire app, as well as enabling client-side routing.

## listContext.js

````javascript
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

````
This code defines a context object listContext using createContext from React. Then it defines a new component called Provider.

First the provider takes in a children prop 

Then inside the provider coponent we set state for watchLists, setWatchLists, currList, setCurrList, movies, and setMovies useState hooks from React. Also a function is defined called handleSelectedList that takes in a list and passes the list into setCurrList when the function is called.   

The Provider component will provide the watchLists, setWatchLists, handleSelectedList, currList, setCurrList, movies, and setMovies values to all its descendants through the context object.

The useEffect hook is used to fetch data from Json-Server at http://localhost:3000 using diffrent endpoints and store it in state using the setWatchLists and setMovies functions. The first useEffect hook is used to fetch the watchlists data when the component mounts. The second useEffect hook is used to fetch the movies data when the currList state changes.

This context and Provider is used to provide state management to the components in this application. All the components that are children of the app component will have access to the watchLists, setWatchLists, handleSelectedList, currList, setCurrList, movies, and setMovies values by using the useContext hook and passing in the listContext object as an argument.

## useListContext.js

```javascript
import { useContext } from 'react'
import { listContext } from '../Context/listContext'

function useListContext() {


  return (useContext(listContext))
}

export default useListContext
```
This is a custom hook named useListContext. The purpose of this hook is to provide an easy way to access the state and functions from the listContext without having to manually use the useContext hook and pass in the listContext every time.

## App.js 

```javascript
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './Pages/Home'
import About from './Pages/About'
import AddWatchList from './Pages/AddWatchList'
import UpdateWatchList from './Pages/UpdateWatchList'


function App() {
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<AddWatchList />} />
        <Route path='/edit' element={<UpdateWatchList />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
```

This is the main file of the React app. It renders the navigation bar and sets up the routes for the different pages. Since the navigation bar is not nested inbetween Routes in a route, the navigation bar will allways be displayed.

The Routes component is from the react-router-dom library and it takes a series of Route components as children. Each Route has a path attribute that specifies the url that should be displayed to mount the elements diffined inside of its element attribute.

For example, the Route component with path='/' will render the Home component when the user navigates to the root URL. Similarly, the Route component with path='/about' will render the About component when the user navigates to the /about URL.

## NavBar.js

```javascript
import React from 'react'
import { NavLink } from 'react-router-dom'
import useListContext from '../Hooks/useListContext'


function NavBar() {

  const { watchLists, handleSelectedList, currList } = useListContext()

  const WatchListOptions = watchLists.map(watchList => <option key={watchList.id} value={watchList.id}>{watchList.author}: {watchList.label}</option> )
  const handleChange = (e) => {
    handleSelectedList(e.target.value)
  };


  return (
  
    <div className='bg-black w-full h-10 flex '>
      <nav className='flex items-center pl-6 w-full truncate'>
        <h1 className='text-white pr-6 text-2xl'>Find<span className='text-red-600'>Flix</span></h1>
        <NavLink to='/' className='text-gray-300/90 pr-10' >Home</NavLink>
        <NavLink to='/create' className='text-gray-300/90 pr-10'>Create List</NavLink>
        <NavLink to='/edit' className='text-gray-300/90 pr-10' >
          Update List
        </NavLink>
        <NavLink to='/about' className='text-gray-300/90 pr-10'>About</NavLink>
        <div className='flex  justify-end w-full h-auto pr-4 '>
          <form>
            <label className='text-white pr-4'>Collections</label>
            <select value={currList} onChange={handleChange}>
              <option value='' default >Pick a Collection</option>
              {WatchListOptions}
            </select>
          </form>
        </div>
      </nav> 
    </div>
  )
}

export default NavBar
```
This code defines the NavBar component that displays the navigation bar at the top of the application. It imports the NavLink component from react-router-dom to create links to different pages of the application.

The useListContext hook is used to access the watchLists, handleSelectedList, and currList variables from the listContext context. These variables are used to populate  and manage the dropdown.

When a user selects a watchlist from the dropdown menu, the handleChange function is called the handleSelectedList function difined in listContext will be called with the current event targets value. in list context hadleselectedList will take in the id passed from the watchlist to setCurrList. This sets the currList to the id of the currently selected list. back in listcontext this will cause the useEffect to be called again and pass the currList to a fetch to grab all movies containing a watchlist_ID equal to the currentList. 

The navigation bar also includes the FindFlix logo and links to the home page, create list page, update list page, and about page of the application. When one of these links are clicked the nav link will set the url to the path passed to its to attribute. Since the route changes routes back on the App page will find the route that matches and mount it causing the page to be displayed that matches the route in the navLink.

## UseFetchData.js

```javascript
import {useState, useEffect} from 'react'

function useFetchData() {

    const API_KEY = process.env.REACT_APP_API_KEY

    const [trending, setTrending] = useState([])
    const [topRated, setTopRated] = useState([])
    const [newMovies, setNewMovies] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setIsLoading(true)
        Promise.all([
          fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
          .then(resp => resp.json()),

          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
          .then(resp => resp.json()),
          
          fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
          .then(resp => resp.json()),
    
          fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
          .then(resp => resp.json())

        ])
        .then(([trending, topRated, newMovies, upcoming]) => {
          setTrending(trending.results)
          setTopRated(topRated.results)
          setNewMovies(newMovies.results)
          setUpcomingMovies(upcoming.results)
          setIsLoading(false)
        })
      

    }, [API_KEY])

  return {trending, topRated, newMovies, upcomingMovies, isLoading}
}

export default useFetchData
```

This is a custom hook called useFetchData. It uses useState and useEffect hooks to fetch data from the TMDB API and return the results in state. The hook returns an object containing trending, topRated, newMovies, upcomingMovies, and isLoading. The isLoading state is used to indicate whether data is still being fetched.

Promise.all was used to reduce the amount of rerenders without Promise.all when each promise is resolved it sets state and each time state is set it causes a rerender. Promise.All with initaite all of the fetches and wait to continue untill all promises are resolved. seting the state for each fetch at the same time, reducing the amount of rerenders.

## Home.js

```javascript
import React from 'react'
import useFetchData from '../Hooks/useFetchData'
import Category from '../components/Category'
import useListContext from '../Hooks/useListContext'

function Home() {

  const { movies } = useListContext()

  const {trending, topRated, newMovies, upcomingMovies, isLoading} = useFetchData()
  
  return (
        isLoading? <div><h1>Loading......</h1></div> :
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
```
This is a component called Home which displays a list of movie categories, such as "Trending Today," "Top Rated," etc., as well as the user's own movie collection if they have any. The first category with the title collection will be displayed if the movies grabbed form context contains any movies if it does not the the collection category is not displayed.

Home imports two custom hooks, useFetchData and useListContext. useFetchData is desturcured to provide each piece of state defined in the hook. then each of those peaices of state are passed to thier own catigory component along with a title. useListContext is providing the user's movies collection. 

From useFetchData, isLoading is a boolean. if loading is true a div containg an h1 element with the text 'Loading...' is displayed and the rest will be ignored. If loading is false then the div containing all of the catigories will be displayed. the loading state is determined inside useFetchdate by the useEffect.

## Category.js

```javascript
import React, {useState} from 'react'
import Card from './Card'
import Modal from './Modal'

function Category({ movies, title }) {
  const [selectedMovie, setSelectedMovie] = useState()
  const [isOpen, setIsOpen] = useState(false)


  const handleSelectedMovie = (movie) => {
    setSelectedMovie(movie)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

    const renderedCards = movies.map(movie => <Card key={movie.id} movie={movie} onSelect={handleSelectedMovie} />)

  return (

    <div className='w-full h-auto bg-zinc-900'>
        <h1 className='text-white text-3xl pt-4'>{title}</h1>
        <div className='flex flex-no-wrap overflow-x-scroll'>
            {renderedCards}
            {isOpen && <Modal movie={selectedMovie} onClose={handleClose} title={title} />}
        </div>
    </div>
  )
}

export default Category
```

This is a component called Category that receives two props: movies and title.

The component first defines two states: selectedMovie and isOpen. selectedMovie stores the currently selected movie, and isOpen determines if the modal is open or closed.

The component then defines a function called handleSelectedMovie that takes in a movie object and sets selectedMovie to that object. Also it sets isOpen to true.

The function handleClose sets isOpen to false, which closes the modal.

The component then maps over the movies array and creates a Card component for each movie. It passes down the movie object and handleSelectedMovie function as props to the Card component. the movie prop will be used to populate the card with an image and title. The handleSelectedMovie function will be used to send the movie object back to the catagory component and setting isOpen to true by setting state when the card is clicked.

Finally, if isOpen is true, the Modal component is rendered with the selected movie and handleClose function passed down as props. The selectedMovie prop will be used to populate the modal with an image a title and description. The handleClose function will be attached to a button to close the modal by setting isOpen to false.

In the return there is renderedCards and a conditon. rendredCards will display all the movies that where mapped over previously. the conditon will show the modal if isOpen is set to true. If isOpen is true the modal will be displayed infront of the screen with the homepage blured in the background.

## Card.JS

```javascript
import React from 'react'


function Card({movie , onSelect}) {

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div className='flex-none mx-4 my-8 h-60 w-44 border rounded-lg' onClick={() => onSelect(movie)}>
        <img src={posterUrl} alt={movie.title} className='h-60 w-full' />
        <h3 className='text-white relative overflow-hidden'>{movie.title}</h3>
        
    </div>
  )
}

export default Card
```

This is a simple component called Card. It takes in a movie object and a onSelect, renamed from handleSelectedMovie function, as props.

Inside the component, it uses the poster_path property from the movie object to construct a URL for the movie poster image. It then renders an image and the title of the movie in a div element.

When the user clicks on the movie card, it calls the onSelect function with the movie object as an argument. This function is passed down from the Category component to handle the selection of a movie.

## Modal.js

```javascript
import React from 'react'
import useListContext from '../Hooks/useListContext'

function Modal({movie, onClose, title}) {

  const { currList, setMovies, movies } = useListContext()

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`


  const handleAddbtn = () => {
    if(currList){
      fetch(' http://localhost:3000/movies', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          watchlist_ID: parseInt(currList)
        })
      })
      .then(resp => resp.json())
      .then(resp => setMovies([...movies, resp]))
    } else {
      alert('pick a collection')
    }
    onClose()
  }

  const handleRemoveButton = () => {
    if(currList){
      fetch(`http://localhost:3000/movies/${movie.id}`, {
        method: 'DELETE',
      })
      .then(setMovies(movies.filter(currMovie => movie.id !== currMovie.id)))
    }
    onClose()
  }

  
  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-gray-800/50 h-screen w-full flex justify-center items-center'>
      
      <div className='grid bg-zinc-800 h-auto w-1/2 min-h-96 min-w-[400px] text-white place-items-center rounded-xl px-5 py-5'>
        <div className='h-auto w-1/2 text-center pb-4'>
          <img src={posterUrl} alt={movie.title} className='relative h-full w-full pb-2'/>
          <h3 className='font-bold text-xl'>{movie.title}</h3>
        </div>
        <p className='px-10'>{movie.overview}</p>
        <div className='flex h-auto w-full justify-between pt-4 px-10'>
          {(title === 'collection')?<button className='formButton' onClick={handleRemoveButton}>Remove</button> : <button className='formButton' onClick={handleAddbtn}>Add</button>}
          <button className='formButton bg-red-600' onClick={onClose}>close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
```

This is a component called Modal. The Modal component receives three props and three state variables:

    movie: an object that contains information about the selected movie, such as its title, poster, and overview.

    onClose: a function that is called when the user clicks on the close button to close the modal.

    title: a string that indicates the title of the category.

    currList: is the id of the currently selected Watchlist from the dropdown.

    setMovies: to set Movies when called

    movies: an array containing all of the movie objects that match the currently selected watchlist.

Inside the Modal component, the poster URL is constructed using the movie.poster_path property. The component renders the movie poster, title, and overview, along with two buttons: "Add" and "Remove" based off if the title prop is "collection" or not, and a "Close" button to close the modal.

The handleAddbtn function sends a POST request to json-server, if currList is a truthy value, adding the selected movie to the user's collection. It calls the setMovies function passing in a copy of the movies array and the data returned from the fetch. This updates the movies array in the ListContext with the newly added movie.

The handleRemoveButton function sends a DELETE request to the backend server, if currList is a truthy value, removing the selected movie from the user's collection. It uses the setMovies function to update the movies array in the ListContext by removing the movie with the same id using filter.

# End of the Home Route

Above shows the all of the components form index.js down to the last child component of the home page. the next components exist on the other routes in app.js each containing on child component which is FormWrap.js

## FormWarp.js

```javascript
import React from 'react'

function FormWrap({name, children}) {
  return (
    <section className='loginBackground'>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
           <div className="w-full rounded-lg shadow border mt-0 max-w-md xl:p-0 bg-gray-800/95  border-gray-700">
                <div className="p-6 space-y-4">
                  <div className='flex justify-center'>
                  <h1 className="font-bold text-2xl text-white">{name}</h1>
                  </div>
                    {children} 
                </div>
           </div>
        </div>
    </section>
  )
}

export default FormWrap
```
This is the FormWrap component, it renders a wrapper for forms with a title specified by the name prop and the content passed as children prop.

This FormWraper was made to keep styling consistent for the following components forms.

## AddWatchList.js

```javascript
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormWrap from '../components/FormWrap'
import useListContext from '../Hooks/useListContext'

function AddWatchList() {

  const navigate = useNavigate()
  const { watchLists, setWatchLists,} = useListContext()
  const [formInput, setFormInput] = useState({
    author: '',
    listName: ''
  })
  
  const handleFormInput = (e) => {
    setFormInput({...formInput, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
      fetch('http://localhost:3000/watchLists' ,{
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          author: formInput.author,
          label: formInput.listName
        })
      })
      .then(resp => resp.json())
      .then(resp => setWatchLists([...watchLists, resp]))
      setFormInput({
        author: '',
        listName: ''
      })
      navigate('/')
  }
    

  return (
    <div>
      <FormWrap name='Create A List'>
      <form className="space-y-4 " onSubmit={handleFormSubmit} >
          <label className='formLabel'>Author</label>
          <input required type='text' className="formInput" name='author' value={formInput.author} onChange={handleFormInput} />
          <label className="formLabel">List Name</label>
          <input required type="text" className="formInput" name='listName' value={formInput.listName} onChange={handleFormInput} />
          <div className='flex w-full justify-center'>
            <button type='submit' className='formButton m-2'>Create</button>
          </div>
      </form>
    </FormWrap>
    </div>
  )
}

export default AddWatchList
```

This is the AddWatchList component that allows users to create a new watch list by filling in a form. It imports the useState hook from React to manage the form state and useNavigate hook from the react-router-dom library to navigate to a new page after form submission. It also imports the FormWrap component and The custom useListContext hook.

Within the AddWatchList function, there is a form that is submitted when the user clicks the "Create" button. When the form is submitted, it sends a POST request to json-server with the data the user has entered in the form, which consists of an author and list name. The setWatchLists function updates the watchLists state with the newly created list.

The handleFormInput function updates the state when the user inputs data into the form. The handleFormSubmit function is called when the user submits the form. It first prevents the default form submission behavior, sends a POST request to json-server, and then navigates to the home page.

this component allows users to create new watch lists, which will then be displayed on the home page in the dropdown, where the user can select the newly created Watchlist and add movies to the list.

## UpdateWatchList.js

```javascript
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormWrap from '../components/FormWrap'
import useListContext from '../Hooks/useListContext'


function UpdateWatchList() {
    const navigate = useNavigate()
    const { currList, watchLists, setWatchLists,movies, setMovies} = useListContext()

    const [formInput, setFormInput] = useState({
      author: '',
      label: '',
    })

    useEffect(() => {
      if(!currList){
        setFormInput({
          author: '',
          label: '',
        })
        return
      }
      fetch(`http://localhost:3000/watchLists/${currList}`)
      .then(resp => resp.json())
      .then(watchList => setFormInput(watchList))
    }, [currList])
    
    const handleFormInput = (e) => {
      setFormInput({...formInput, [e.target.name]: e.target.value})
    }

    const handleUpdateBtn = () => {
     
      fetch(`http://localhost:3000/watchLists/${currList}`,{
        method: 'PATCH',
        headers: {
           'Content-Type': 'application/json' 
          },
          body: JSON.stringify(formInput)
      })
      .then(resp => resp.json())
      .then(updatedWatchList => setWatchLists(watchLists.map(watchList => {
       if(updatedWatchList.id === watchList.id){
         return updatedWatchList
       }
       return watchList
      })))
      .then(navigate('/'))
    }

    const handleDeleteBtn = () => {
      movies.forEach(movie => {
        fetch(`http://localhost:3000/movies/${movie.id}`, {
          method: `DELETE`,
        })
      })
      
      fetch(`http://localhost:3000/watchLists/${currList}`,{
        method: 'DELETE',
      })
      .then(setWatchLists(watchLists.filter(watchlist =>`${watchlist.id}` !== currList)))
      .then(setFormInput({
        author: '',
        label: '',
      }))
      
      navigate('/')
      setMovies([])
    }
  
    const handleFormSubmit = (e) => {
      e.preventDefault()
    }

  return (
    <div>
    <FormWrap name='Update A List'>
    <form className="space-y-4 " onSubmit={handleFormSubmit}  >
        <label className='formLabel'>Author</label>
        <input required type='text' className="formInput" name='author' value={formInput.author} onChange={handleFormInput} />
        <label className="formLabel">List Name</label>
        <input required type="text" className="formInput" name='label' value={formInput.label} onChange={handleFormInput} />
        <div className='flex justify-between'>
          <button type='submit' className='formButton m-2' onClick={handleUpdateBtn}>Update</button>
          <button type='submit' className='formButton bg-red-500 m-2' onClick={handleDeleteBtn}>Delete</button>
        </div>
    </form>
  </FormWrap>
  </div>
  )
}

export default UpdateWatchList
```
This is the UpdateWatchList component it is responsible for updating and deleting an existing watchlist. It is using the useListContext hook to get access to the current watchlist (currList) and the list of all watchlists (watchLists) along with their corresponding movies (movies).

When the component mounts, it fetches the current watchlist data and populates the form inputs with it. The handleFormInput function updates the formInput state whenever the user types something in the form fields.

The handleUpdateBtn function updates the watchlist on the server and updates the watchLists state in the ListContext. It then navigates back to the home page.

The handleDeleteBtn function first deletes all the movies associated with the current watchlist by looping over the movies array and deleting each one individually. Then it deletes the watchlist itself from the server and updates the watchLists state in the ListContext. It resets the formInput state and navigates back to the home page.

Finally, the handleFormSubmit function prevents the form from being submitted and triggering a page refresh.

The form itself is similar to the one in AddWatchList but with two buttons: "Update" and "Delete".

## About

About is an about page that gives a brief description of FindFlix.

# The End 