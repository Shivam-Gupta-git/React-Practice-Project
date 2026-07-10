import React, { useRef } from 'react'

function Ref() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  }

  return (
<div className=" flex items-center justify-center bg-gray-800 flex-col p-10">

  <div className="bg-white w-96 p-8 rounded-2xl shadow-2xl text-center mt-10">

    {/* Icon */}
    <div className="text-6xl mb-4">📝</div>

    {/* Heading */}
    <h1 className="text-3xl font-bold text-gray-800">
      useRef Example
    </h1>

    <p className="text-gray-500 mt-2 mb-6">
      Click the button to focus on the input field.
    </p>

    {/* Input */}
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter your name"
      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition text-black"
    />

    {/* Button */}
    <button
      onClick={handleFocus}
      className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition duration-300"
    >
      🎯 Focus Input
    </button>

  </div>
</div>
  )
}

export default Ref