import React, { useState } from "react";

function UseState_4() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleFormValue = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      userName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-10 flex-col">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-200 rounded-3xl shadow-2xl p-8 mt-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl">📝</div>
          <h1 className="text-3xl font-bold text-gray-800 mt-3">
            Registration Form
          </h1>
          <p className="text-gray-500 mt-2">
            Create your account to get started.
          </p>
        </div>

        {/* Username */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="userName"
            placeholder="Enter your username"
            autoComplete="off"
            value={formData.userName}
            onChange={handleFormValue}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="off"
            value={formData.email}
            onChange={handleFormValue}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="off"
            value={formData.password}
            onChange={handleFormValue}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-400 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 active:scale-95 transition duration-300"
        >
          🚀 Register
        </button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?
          <span className="text-indigo-300 font-semibold cursor-pointer hover:underline ml-1">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default UseState_4;