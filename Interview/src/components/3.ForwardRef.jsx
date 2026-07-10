import React, { forwardRef, useRef } from "react";

function ForwardRef_3() {
  const inputRef = useRef(null);

  const handleInputButton = () => {
    inputRef.current.value = "1000";
    inputRef.current.focus();
    inputRef.current.style.color = "#4F46E5";
    inputRef.current.style.fontWeight = "bold";
  };

  return (
    <div className=" flex items-center justify-center bg-gray-800 py-10 flex-col">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden mt-10">

        {/* Header */}
        <div className="bg-indigo-300 p-6 text-center ">
          <div className="text-6xl mb-2">🚀</div>
          <h1 className="text-3xl font-bold text-white">
            Forward Ref Demo
          </h1>
          <p className="text-indigo-100 mt-2">
            Access a child input using <span className="font-semibold">forwardRef</span>
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          <UserInput ref={inputRef} />

          <button
            onClick={handleInputButton}
            className="w-full mt-6 bg-indigo-200 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition duration-300"
          >
            ✨ Set Value & Focus
          </button>
        </div>
      </div>
    </div>
  );
}

const UserInput = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      placeholder="Click the button..."
      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition text-black"
    />
  );
});

export default ForwardRef_3;