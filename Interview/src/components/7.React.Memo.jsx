import React, { useRef, useState } from "react";

// Memoized Child Component
const Counts = React.memo(() => {
  const renderCount = useRef(0);

  // Count how many times this component renders
  renderCount.current++;

  console.log("Child Rendered");

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800">
        Memoized Child Component
      </h2>

      <p className="text-gray-500 mt-2">
        This component will not re-render when the parent state changes.
      </p>

      <div className="mt-5 bg-green-100 rounded-xl p-4">
        <h1 className="text-5xl font-bold text-green-600">
          {renderCount.current}
        </h1>

        <p className="text-gray-600 mt-2">
          Child Render Count
        </p>
      </div>
    </div>
  );
});

function ReactMemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center py-10">


      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Parent Component
        </h2>

        {/* Parent Counter */}
        <div className="bg-indigo-100 rounded-2xl p-6 text-center">

          <p className="text-gray-500">
            Parent Counter
          </p>

          <h1 className="text-5xl font-bold text-indigo-600 my-4">
            {count}
          </h1>

          <button
            onClick={() => setCount(count + 1)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 active:scale-95 transition"
          >
            Increment Parent
          </button>
        </div>

        {/* Child */}
        <div className="mt-8">
          <Counts />
        </div>

      </div>
    </div>
  );
}

export default ReactMemo;