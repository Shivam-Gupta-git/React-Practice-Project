import React from "react";

function Values() {
  return (
    <div className="bg-amber-50 p-6 rounded-2xl shadow-lg max-w-sm mx-auto mt-4 transform hover:scale-105 transition-transform">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Hello Students!
      </h1>
      <p className="text-gray-600 text-center">
        Welcome to the Lazy Loading demo. Components load only when needed.
      </p>
    </div>
  );
}

export default Values;