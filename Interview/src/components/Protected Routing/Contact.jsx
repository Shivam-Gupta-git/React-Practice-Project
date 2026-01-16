import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 to-amber-300 flex items-center justify-center px-6">
      
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Get in Touch
        </h2>
        <p className="text-center text-gray-500 mb-8">
          We’d love to hear from you. Please fill out the form below.
        </p>

        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-600 mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition"
          >
            Send Message
          </button>
        </form>

      </div>

    </div>
  );
}

export default Contact;