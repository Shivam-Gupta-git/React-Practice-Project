import React from "react";
import useToggle from "./useToggle";

function CustomeHook() {
  const [val, setVal] = useToggle(true);
  const [data, setdata] = useToggle(true);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl space-y-8">
        
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Custom Hook – useToggle Demo
        </h1>

        {/* Section 1 */}
        <div className="bg-indigo-50 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-indigo-700">
            Toggle Paragraph
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              onClick={setVal}
            >
              Toggle
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              onClick={() => setVal(true)}
            >
              Show
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              onClick={() => setVal(false)}
            >
              Hide
            </button>
          </div>

          {val && (
            <p className="mt-4 text-gray-700 bg-white rounded-lg p-3 shadow-sm">
              Custom Hook in React JS 🚀
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Section 2 */}
        <div className="bg-purple-50 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-purple-700">
            Toggle Heading
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              onClick={setdata}
            >
              Toggle
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              onClick={() => setdata(true)}
            >
              Show
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              onClick={() => setdata(false)}
            >
              Hide
            </button>
          </div>

          {data && (
            <h1 className="mt-4 text-xl font-bold text-purple-700 bg-white rounded-lg p-3 shadow-sm">
              Data is here... ✨
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomeHook;