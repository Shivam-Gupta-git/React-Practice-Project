import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 to-amber-300 flex items-center justify-center px-6">
      
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-3xl">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-6 text-center">
          We are passionate about building modern, user-friendly web applications
          using React and the latest front-end technologies.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          
          <div className="bg-amber-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm">
              To create fast, secure, and scalable web solutions.
            </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm">
              Empower developers with clean UI and strong architecture.
            </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Values
            </h3>
            <p className="text-gray-600 text-sm">
              Simplicity, performance, and user-first design.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;