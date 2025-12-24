import React, { useRef } from "react";

function ForwardRef_3() {
  const inputRef = useRef(null);

  const handleInputButton = (e) => {
    e.preventDefault();
    inputRef.current.value = 1000;
    inputRef.current.focus();
    inputRef.current.style.color = "red";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-100 space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-700">
          Forward Ref Demo
        </h2>

        <UserInput ref={inputRef} />

        <button
          onClick={handleInputButton}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Set Input Value
        </button>
      </div>
    </div>
  );
}

export function UserInput ({ref}) {
  return (
    <input
      ref={ref}
      type="text"
      placeholder="Click button to auto-fill"
      className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default ForwardRef_3;