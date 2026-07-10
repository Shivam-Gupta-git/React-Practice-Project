import React, { useMemo, useState } from "react";

function UseMemoExample() {
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  const isEven = useMemo(() => {
    console.warn("Heavy calculation...");
    let i = 1;
    while (i < 2000000000) i++;
    return counterOne % 2 === 0;
  }, [counterOne]);

  

  return (
    <div className=" flex items-center justify-center bg-gray-800 flex-col p-10">
      <div className="bg-white shadow-lg rounded-xl p-6 w-80 text-center space-y-4 ">
        
        <h1 className="text-xl font-semibold text-gray-800">
          useMemo Example
        </h1> 

        {/* Counter One */}
        <div className="space-y-2">
          <button
            onClick={() => setCounterOne(prev => prev + 1)}
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Counter One: {counterOne}
          </button>

          <p
            className={`font-semibold ${
              isEven ? "text-green-600" : "text-red-600"
            }`}
          >
            {isEven ? "Even" : "Odd"}
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Counter Two */}
        <button
          onClick={() => setCounterTwo(prev => prev + 1)}
          className="w-full py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
        >
          Counter Two: {counterTwo}
        </button>

        <p className="text-sm text-gray-500">
          Counter Two does not trigger heavy calculation
        </p>
      </div>
    </div>
  );
}

export default UseMemoExample;