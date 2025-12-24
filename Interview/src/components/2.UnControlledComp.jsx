import React, { useRef } from 'react'

function UnControlledComp_2() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handelSubmitButton = (e)=>{
    e.preventDefault()
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password)

   
  } 
  return (
<div className="min-h-screen w-full bg-gray-300 from-slate-100 to-slate-300 flex items-center justify-center p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
    
    {/* Heading */}
    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
      Uncontrolled Component
    </h1>

    {/* Form */}
    <form
      method="POST"
      onSubmit={handelSubmitButton}
      className="flex flex-col gap-4"
    >
      <input
        type="email"
        placeholder="Enter Your Email"
        ref={emailRef}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none
                   focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
      />

      <input
        type="password"
        placeholder="Enter Your Password"
        ref={passwordRef}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none
                   focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
      />

      <button
        type="submit"
        className="mt-3 bg-purple-500 text-white py-2 rounded-lg font-medium
                   hover:bg-purple-600 active:scale-95 transition"
      >
        Submit
      </button>
    </form>

  </div>
</div>
  )
}

export default UnControlledComp_2