import React, { useState } from 'react'
import { setLocalStorage } from '../../Utils/LocalStorage'

function Header({setUser, data}) {

  // const[userName, setUserName] = useState('')

  // if(!data){
  //   setUserName('Admin')
  // }else{
  //   setUserName(data.firstName)
  // }

  const logOutUser = ()=>{
   localStorage.setItem('loggedInUser','')
   setUser('')
  }
  return (
    
    <div className='flex items-end justify-between  py-2 sticky top-0 left-0' >
      <h1 className='text-2xl'>Hello <br /><span className='text-2xl font-semibold'>UserName</span></h1>
      <button onClick={logOutUser}  className='bg-red-500  px-4 py-2 rounded-s-sm'>Log Out</button>
    </div>
  )
}

export default Header