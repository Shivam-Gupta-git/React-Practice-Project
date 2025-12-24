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
      userName: '',
      email: '',
      password: ''
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-100 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center text-gray-700">
          Registration Form
        </h1>

        <input
          type="text"
          name="userName"
          placeholder="Enter your name"
          autoComplete="off"
          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.userName}
          onChange={handleFormValue}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          autoComplete="off"
          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.email}
          onChange={handleFormValue}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="off"
          className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.password}
          onChange={handleFormValue}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UseState_4;