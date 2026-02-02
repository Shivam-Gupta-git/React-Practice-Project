import React, { memo } from "react";

function Child({ countChild, childHandeler }) {
  console.log("Child component rerendering");

  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-80 text-center space-y-3 mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">Child Component</h2>

      <p className="text-gray-600 font-medium">
        Count: <span className="text-blue-600">{countChild}</span>
      </p>

      <button
        onClick={childHandeler}
        className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
      >
        Call Child Handler
      </button>

      <p className="text-sm text-gray-400">
        Check console to see if it rerenders
      </p>
    </div>
  );
}

export default memo(Child);