import React, { useState } from 'react'

function ControlledComp_1() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handelOnSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, password)

    setName('')
    setEmail('')
    setPassword('')
  }

  return (
<div className="min-h-screen w-full bg-gray-300 from-gray-100 to-gray-300 flex items-center justify-center p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
    
    {/* Heading */}
    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
      Controlled Component
    </h1>

    {/* Form */}
    <form
      onSubmit={handelOnSubmit}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />

      <input
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />

      <input
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />

      <button
        type="submit"
        className="mt-3 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 active:scale-95 transition"
      >
        Submit
      </button>
    </form>

  </div>
</div>
  )
}

export default ControlledComp_1