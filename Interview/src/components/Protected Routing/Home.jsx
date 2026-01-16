import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 to-amber-300 flex items-center justify-center px-6">
      
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl text-center">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-amber-500">MyApp</span>
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          A simple React application with modern UI and protected routing.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition">
            Get Started
          </button>

          <button className="px-6 py-3 border border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-100 transition">
            Learn More
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;