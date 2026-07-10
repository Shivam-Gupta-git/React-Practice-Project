import React, { useState } from "react";

function Conditional_Rendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-10 bg-gray-200">
      <div className="w-full bg-indigo-300 flex items-center justify-center p-2">
      <h1 className=" text-2xl font-bold text-white">Example of conditional rendering......</h1>
      </div>
      <div className="bg-gray-300 w-96 p-8 rounded-2xl shadow-2xl text-center">

        {/* Icon */}
        <div className="text-6xl mb-4">
          {isLoggedIn ? "🎉" : "🔒"}
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {isLoggedIn ? "Welcome Back!" : "Login Required"}
        </h1>

        {/* Message */}
        <p
          className={`text-lg font-medium mb-6 ${
            isLoggedIn ? "text-green-600" : "text-red-500"
          }`}
        >
          {isLoggedIn
            ? "You have successfully logged into your account."
            : "Please log in to continue."}
        </p>

        {/* Button */}
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${
            isLoggedIn
              ? "bg-red-500 hover:bg-red-600"
              : "bg-indigo-300 hover:bg-indigo-400"
          }`}
        >
          {isLoggedIn ? "🚪 Logout" : "🔑 Login"}
        </button>
      </div>
      <Example2/>
    </div>
  );
}



function Example2() {
  const [val, setVal] = useState("");

  const inputVal = () => {
    if (val >= 90) {
      alert("Grade A");
    } else if (val >= 75) {
      alert("Grade B");
    } else if (val >= 50) {
      alert("Grade C");
    } else {
      alert("Fail");
    }

    setVal(" ")
  };

  return (
    <div className="bg-gray-300 w-96 p-8 rounded-2xl shadow-2xl text-center ml-6">
      <h1 className="text-2xl font-bold mb-4">
        Example 2 of Conditional Rendering
      </h1>

      <input
        type="number"
        placeholder="Enter Your Marks"
        className="w-full border border-gray-400 rounded-lg p-2"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />

      <button
        onClick={inputVal}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </div>
  );
}



export default Conditional_Rendering;