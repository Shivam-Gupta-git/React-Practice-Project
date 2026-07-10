import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleFormValue = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormData = (event) => {
    event.preventDefault();
    if(!formData.email || !formData.password){
      alert('Please enter email and password')
      return
    }
    console.log(formData); 
    localStorage.setItem('token', 'userLoggedIn');
    navigate('/about')
    setFormData({
      email: '',
      password: ''
    })
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 to-amber-300 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Please login to your account
        </p>

        <form onSubmit={handleFormData} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormValue}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormValue}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <span className="text-amber-500 font-semibold cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;