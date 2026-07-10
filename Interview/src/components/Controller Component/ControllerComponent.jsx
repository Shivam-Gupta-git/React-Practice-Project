import React, { useState } from "react";

function ControllerComponent() {
  const [name, setName] = useState("");

  const inputVal = (e) => {
    e.preventDefault();
    console.log(name);
    alert(`Your Name is: ${name}`);
    setName(" ");
  };

  return (
    <div className="w-full flex items-center justify-center h-100 bg-gray-200 flex-col">
      <div className="w-full bg-indigo-300 flex items-center justify-center p-2">
      <h1 className=" text-2xl font-bold text-white">Example of conditional rendering......</h1>
      </div>
    <form onSubmit={inputVal} className="p-5 mt-10">
      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-400 rounded-lg p-2"
      />

      <button
        type="submit"
        className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </form>
    </div>
  );
}

export default ControllerComponent;