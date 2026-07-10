import React, { useEffect, useState } from "react";

function UseEffect() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex items-center justify-center bg-gray-800 flex-col py-10">
      <div className="bg-white w-96 p-8 rounded-3xl shadow-2xl text-center mt-10">

        {/* Clock Icon */}
        <div className="text-7xl mb-4">⏰</div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">
          Digital Clock
        </h1>

        <p className="text-gray-500 mt-2">
          React <span className="font-semibold">useEffect</span> Example
        </p>

        {/* Time */}
        <div className="mt-8 bg-indigo-100 rounded-2xl p-6 shadow-inner">
          <h2 className="text-5xl font-bold text-indigo-300 tracking-wider">
            {time}
          </h2>
        </div>

        {/* Footer */}
        <p className="mt-6 text-gray-500 text-sm">
          Time updates automatically every second.
        </p>
      </div>
    </div>
  );
}

export default UseEffect;