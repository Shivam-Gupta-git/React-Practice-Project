import { useMemo, useState } from "react";

const ExpensiveComponent = () => {
  const total = useMemo(() => {
    console.log("Calculating Sum...");
    let i;
    for (i = 0; i <= 1000000000; i++) {}
    return i;
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Expensive Calculation
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Memoized using <span className="font-medium text-indigo-600">useMemo</span>
      </p>

      <div className="bg-indigo-50 rounded-xl py-4">
        <p className="text-2xl font-bold text-indigo-700">
          {total}
        </p>
        <p className="text-xs text-gray-500 mt-1">Calculated only once</p>
      </div>
    </div>
  );
};

const MemoParentComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          useMemo Optimization Demo
        </h1>

        <ExpensiveComponent />

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-95 transition"
          >
            Re-render Parent
          </button>

          <p className="text-gray-600 text-sm">
            Parent re-renders:{" "}
            <span className="font-semibold text-indigo-600">{count}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoParentComponent;