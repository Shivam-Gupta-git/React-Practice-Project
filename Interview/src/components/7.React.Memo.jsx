import React, { useRef, useState } from "react";

const Counts = React.memo(() => {
  const reRenderCount = useRef(0);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Memoized Child Component
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        This component does <span className="font-medium">NOT</span> re-render
        when parent state changes
      </p>

      <div className="bg-green-50 rounded-xl py-3">
        <p className="text-2xl font-bold text-green-600">
          {reRenderCount.current++}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Render count (useRef)
        </p>
      </div>
    </div>
  );
});

const ReactMemo = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          React.memo Optimization Demo
        </h1>

        {/* Parent Counter */}
        <div className="bg-indigo-50 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Parent Component State
          </p>
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            {count}
          </h2>

          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-95 transition"
          >
            Increment Parent
          </button>
        </div>

        {/* Memoized Child */}
        <Counts />
      </div>
    </div>
  );
};

export default ReactMemo;