import React, { useEffect, useState } from 'react'
import FormWrap from '../components/FormWrap'

function WatchList() {
  const [formInput, setFormInput] = useState({
    author: '',
    listName: ''
  })
  
console.log(formInput.author, formInput.listName)

  const handleFormInput = (e) => {
    setFormInput({...formInput, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = () => {
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
  }
    

  return (
    <div>
      <FormWrap name='Create A List'>
      <form className="space-y-4 " onSubmit={handleFormSubmit} >
          <label className='formLabel'>Author</label>
          <input type='text' className="formInput" name='author' value={formInput.author} onChange={handleFormInput} />
          <label className="formLabel">List Name</label>
          <input type="text" className="formInput" name='listName' value={formInput.listName} onChange={handleFormInput} />
          <button type='submit' className='formButton m-2'>Create</button>
      </form>
    </FormWrap>
    </div>
  )
}

export default WatchList