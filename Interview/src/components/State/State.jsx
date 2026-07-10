import React, { useState } from "react";

function State() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-200">
      <div className="w-full bg-indigo-300 flex items-center justify-center p-2">
      <h1 className=" text-2xl font-bold text-white">Example of state......</h1>
      </div>
      <div className="bg-gray-200 p-10 rounded-2xl shadow-2xl w-80 text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Counter App
        </h1>

        <p className="text-gray-500 mb-6">
          React <span className="font-semibold">useState</span> Example
        </p>

        <div className="w-32 h-32 mx-auto rounded-full bg-indigo-200 flex items-center justify-center mb-8">
          <span className="text-5xl font-bold text-indigo-400">
            {count}
          </span>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCount(count - 1)}
            disabled={count === 0}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              count === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            ➖ Decrement
          </button>

          <button
            onClick={() => setCount(count + 1)}
            className="px-5 py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition"
          >
            ➕ Increment
          </button>
        </div>

        <button
          onClick={() => setCount(0)}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default State;