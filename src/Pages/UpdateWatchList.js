import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormWrap from '../components/FormWrap'
import useListContext from '../Hooks/useListContext'


function UpdateWatchList() {
    const navigate = useNavigate()
    const { watchList, setWatchList,} = useListContext()
    const [formInput, setFormInput] = useState({
      author: '',
      listName: ''
    })
    
    // TODO: figure out how to access the current watch list to get its id.
    const handleFormInput = (e) => {
      setFormInput({...formInput, [e.target.name]: e.target.value})
    }
  
    // const handleFormSubmit = (e) => {
    //   e.preventDefault()
    //     fetch('http://localhost:3000/watchLists' ,{
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         author: formInput.author,
    //         label: formInput.listName
    //       })
    //     })
    //     .then(resp => resp.json())
    //     .then(resp => setWatchList([...watchList, resp]))
    //     setFormInput({
    //       author: '',
    //       listName: ''
    //     })
    //     navigate('/')
    // }

  return (
    <div>
    <FormWrap name='Update A List'>
    <form className="space-y-4 " onSubmit={handleFormSubmit} >
        <label className='formLabel'>Author</label>
        <input required type='text' className="formInput" name='author' value={formInput.author} onChange={handleFormInput} />
        <label className="formLabel">List Name</label>
        <input required type="text" className="formInput" name='listName' value={formInput.listName} onChange={handleFormInput} />
        <button type='submit' className='formButton m-2'>Create</button>
    </form>
  </FormWrap>
  </div>
  )
}

export default UpdateWatchList