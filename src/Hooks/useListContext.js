import React, { useContext } from 'react'
import { listContext } from '../Context/listContext'

function useListContext() {


  return (useContext(listContext))
}

export default useListContext