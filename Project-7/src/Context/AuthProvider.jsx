import React, { createContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '../Utils/LocalStorage'

export const AuthContext = createContext() 

function AuthProvider({children}) {
  // localStorage.clear()
  const[userData, setUserData] = useState(null)

  useEffect(() => {
    setLocalStorage()
    const {employees, admin} = getLocalStorage()
    setUserData(employees, admin)
  }, [])
  
  return (
    <div>
      <AuthContext.Provider value={[userData, setUserData]}>
        {children}
        </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider