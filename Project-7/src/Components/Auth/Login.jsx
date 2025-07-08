import React, { useState } from 'react'

function Login({handleLogin}) {
  
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const handelFormEvent = (event)=>{
    event.preventDefault();
    handleLogin(email, password)

    setEmail('')
    setPassword('')
  }
  return (
    <div className=' flex h-screen w-screen items-center justify-center bg-black'>
      <div className='border-2 border-gray-400 p-20 rounded-2xl'>
        <form onSubmit={handelFormEvent} className='flex flex-col items-center justify-center'>
          <input
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          required className='border-2 text-gray-300 border-gray-400 rounded-full py-2 px-4 text-xl outline-none bg-transparent' type="email" placeholder='Enter your Email'/>
          <input
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          required className='flex border-2 text-gray-300 border-gray-400 rounded-full py-2 px-4 text-xl outline-none bg-transparent mt-3' type="password" placeholder='Enter Password'/>
          <button type='submit' className='flex border-2 border-gray-400 rounded justify-center w-full py-1 px-5 text-xl bg-gray-400 mt-3 text-white cursor-pointer'>Log in</button>
        </form>
      </div>
    </div>
  )
}

export default Login