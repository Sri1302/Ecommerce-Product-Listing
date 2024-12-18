import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("user"))

    if(!user){
        return <Navigate to ='/signup' />
    }
    //if logged in render the children components
  return children
}

export default ProtectedRoute