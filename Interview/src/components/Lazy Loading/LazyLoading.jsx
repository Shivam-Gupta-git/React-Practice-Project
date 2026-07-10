import React, { Suspense, lazy, useState } from 'react';

const Values = lazy(() => import('./Values'));

function LazyLoading() {
  const [load, setLoad] = useState(false);

  return (
    <div className=" bg-gray-800 flex flex-col items-center justify-center px-6 py-10">

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Lazy Loading Demo</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to load the component dynamically.
        </p>

        <button
          onClick={() => setLoad(true)}
          className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition mb-6"
        >
          Get User
        </button>

        {/* Lazy-loaded component */}
        {load && (
          <Suspense fallback={<h4 className="text-gray-700">Loading...</h4>}>
            <Values />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default LazyLoading;