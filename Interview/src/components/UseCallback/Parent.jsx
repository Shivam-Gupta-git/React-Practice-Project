import React, { useCallback, useState } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);
  const [countChild, setCountChild] = useState(0);

  const childHandler = useCallback(() => {
    console.log("child handler called");
  }, []);

  return (
    <div className=" flex items-center justify-center bg-gray-800 flex-col py-10">

      <div className="bg-white shadow-lg rounded-xl p-6 w-96 space-y-5 ">
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          useCallback Example
        </h1>

        {/* Parent Counter */}
        <button
          onClick={() => setCount(prev => prev + 1)}
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Parent Count: {count}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Clicking this should NOT re-render Child
        </p>

        <hr className="border-gray-200" />

        {/* Child Section */}
        <div className="space-y-2">
          <button
            onClick={() => setCountChild(prev => prev + 1)}
            className="w-full py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Child Count: {countChild}
          </button>

          <Child
            countChild={countChild}
            childHandeler={childHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default Parent;