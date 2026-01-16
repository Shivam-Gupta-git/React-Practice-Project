import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const navigate = useNavigate()

  const handelLogoutButton = () => {
     setToken(null)
     navigate('/Login')
  }
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-white bg-black/80 px-4 py-2 rounded-lg"
      : "text-black px-4 py-2 rounded-lg hover:bg-black/20 transition";

  return (
    <header className="w-full h-16 bg-amber-400 flex items-center justify-between px-8 z-50 shadow-md">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-black tracking-wide">
        MyApp
      </h1>

      {/* Navigation */}
      <nav className="flex gap-4 font-medium">
        <NavLink to="/" className={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkStyle}>
          About
        </NavLink>
        <NavLink to="/contact" className={linkStyle}>
          Contact
        </NavLink>
        {
          token ?  (<button onClick={handelLogoutButton} className="text-black px-4 py-2 rounded-lg hover:bg-black/20 transition">Logout</button>) : (<NavLink to="/login" className={linkStyle}>
          Login
        </NavLink>)
        }
        
       
      </nav>
    </header>
  );
}

export default Header;