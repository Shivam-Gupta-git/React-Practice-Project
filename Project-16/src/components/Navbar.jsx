import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoSearch, IoBagOutline } from "react-icons/io5";
import { FaRegUser, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCollections } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosContact } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropDownRef = useRef();

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleUserDropDown = () => setUserDropDown((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setUserDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // NavLinks
  const navLinks = (
    <>
      <NavLink to="/" className="text-white hover:text-yellow-300 transition">
        Home
      </NavLink>
      <NavLink
        to="/Collection"
        className="text-white hover:text-yellow-300 transition"
      >
        Collection
      </NavLink>
      <NavLink
        to="/About"
        className="text-white hover:text-yellow-300 transition"
      >
        About
      </NavLink>
      <NavLink
        to="/Contact"
        className="text-white hover:text-yellow-300 transition"
      >
        Contact
      </NavLink>
    </>
  );

  // Cart 
  const cart = (
    <Link to="/Cart" className="relative text-white">
      <IoBagOutline className="text-2xl" />
      <span className="absolute -top-2 -left-2 text-[10px] bg-black text-white w-4 h-4 rounded-full flex items-center justify-center">
        1
      </span>
    </Link>
  );

  // Wishlist
  const wishlist = (
    <Link to="/Wishlist" className="relative text-white">
      <FaRegHeart className="text-2xl" />
      <span className="absolute -top-2 -left-2 text-[10px] bg-black text-white w-4 h-4 rounded-full flex items-center justify-center">
        1
      </span>
    </Link>
  );
  // SideBar Links
  const sidebarLinks = (
    <>
      <NavLink
        to="/"
        className="text-gray-800 py-3 px-4 shadow-sm shadow-gray-300 hover:bg-blue-300 hover:text-white transition-all duration-300  flex flex-row items-center gap-2"
      >
        <IoHomeOutline />
        Home
      </NavLink>

      <Link
        to="/Cart"
        className="text-gray-800 py-3 px-4 shadow-sm shadow-gray-300 hover:bg-blue-300 hover:text-white transition-all duration-300 flex flex-row items-center gap-2 relative"
      >
        <IoBagOutline />
        Cart
        <span className="absolute top-2 left-2 text-[10px] bg-black text-white w-4 h-4 rounded-full flex items-center          justify-center">
          1
        </span>
      </Link>

      <Link
        to="/Wishlist"
        className="text-gray-800 py-3 px-4 shadow-sm shadow-gray-300 hover:bg-blue-300 hover:text-white transition-all duration-300 flex flex-row items-center gap-2 relative"
      >
        <FaRegHeart />
        Wishlist
        <span className="absolute top-2 left-2 text-[10px] bg-black  text-white w-4 h-4 rounded-full flex items-center justify-center">
          1
        </span>
      </Link>

      <NavLink
        to="/Collection"
        className="text-gray-800 py-3 px-4 shadow-sm shadow-gray-300 hover:bg-blue-300 hover:text-white transition-all duration-300 flex flex-row items-center gap-2"
      >
        <MdOutlineCollections />
        Collection
      </NavLink>

      <NavLink
        to="/About"
        className="text-gray-800 py-3 px-4 shadow-sm shadow-gray-300 hover:bg-blue-300 hover:text-white transition-all duration-300 flex flex-row items-center gap-2"
      >
        <AiOutlineInfoCircle />
        About
      </NavLink>
      <NavLink
        to="/Contact"
        className="text-gray-800 py-3 px-4 shadow-sm shadow-gray-300 hover:bg-blue-300 hover:text-white transition-all duration-300 flex flex-row items-center gap-2"
      >
        <IoIosContact />
        Contact
      </NavLink>
    </>
  );


  return (
    <>
      <nav
        ref={dropDownRef}
        className="w-full bg-blue-300 shadow-md sticky top-0 z-50"
      >

       {/*  Main Container */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-white text-blue-500 font-bold text-xl px-4 py-2 rounded-full">
              LOGO
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8 text-lg font-medium">
            {navLinks}
          </div>

          {/* Search User and Bars Section */}
          <div className="flex items-center gap-5 relative">
            <IoSearch
              onClick={toggleSearch}
              className="text-white text-2xl cursor-pointer"
            />
            <FaRegUser
              onClick={toggleUserDropDown}
              className="text-white text-2xl cursor-pointer"
            />
            {/* Add to Cart */}
            <div className="hidden md:flex">{cart}</div>

            {/* Add to Wishlist */}
            <div className="hidden md:flex">{wishlist}</div>

            {/* Hamburger Icon */}
            <div
              className="md:hidden text-white text-2xl cursor-pointer"
              onClick={toggleSidebar}
            >
              {!sidebarOpen ? <FaBars /> : null}
            </div>

            {/* User Dropdown */}
            {userDropDown && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md text-gray-800 w-40 py-2 z-50">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  My Profile
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Orders
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`fixed top-0 left-0 h-full w-[50%] bg-white z-40 transform transition-transform duration-700  ${
            sidebarOpen ? "translate-x-0 " : "-translate-x-full"
          }`}
        >
          <div className=" py-5 relative flex flex-row  items-center ">
            <div className="bg-white text-blue-500 font-bold text-xl ml-2 rounded-full">
              LOGO
            </div>
            <div onClick={toggleSidebar}>
              {sidebarOpen ? (
                <MdOutlineCancel
                  className="text-black absolute right-5 top-3 cursor-pointer hover:bg-blue-300 hover:text-white transition-all duration-300 text-3xl font-light  rounded-2xl mt-2
          "
                />
              ) : null}
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-4">{sidebarLinks}</div>
        </div>
      </nav>
      
      {/* Search Input */}
      {isSearchOpen && (
        <div className="w-full flex justify-center px-4 pb-2 mt-2">
          <form className="w-full md:w-[60%]">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 outline-none shadow-sm"
            />
          </form>
        </div>
      )}
    </>
  );
}

export default Navbar;
