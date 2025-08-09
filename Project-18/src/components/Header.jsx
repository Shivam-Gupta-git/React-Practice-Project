import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { FaBars } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function Header() {
  const { navigate } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-light bg-light shadow-sm" id="navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <NavLink to="/" className="navbar-brand fw-bold" id="navbar-brand">
            AgriConnect
          </NavLink>

          <button
            className="btn d-lg-none"
            onClick={() => setIsOpen(true)}
            id="bars-btn"
          >
            <FaBars />
          </button>

          <div className="d-none d-lg-flex align-items-center">
            <ul className="navbar-nav d-flex flex-row gap-5" id="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/farmers" className="nav-link">
                  For Farmers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/marchants" className="nav-link">
                  For Merchants
                </NavLink>
              </li>
            </ul>
            <div
              onClick={() => navigate("/login")}
              className="btn btn-primary ms-3"
              id="btn"
            >
              Login / Register
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="mobile-overlay" onClick={() => setIsOpen(false)}></div>
      )}

      <div
        className={`mobile-sidebar ${isOpen ? "open" : ""}`}
        id="mobile-sidebar"
      >
        <div className="p-3 d-flex justify-content-between align-items-center border-bottom">
          <h5 className="mb-0">Menu</h5>
          <button
            className="btn"
            onClick={() => setIsOpen(false)}
            id="bars-btn"
          >
            <MdCancel />
          </button>
        </div>
        <ul className="list-unstyled p-3">
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/farmers"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              For Farmers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/marchants"
              className="nav-link"
              onClick={() => setIsOpen(false)}
            >
              For Merchants
            </NavLink>
          </li>
          <li className="mt-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              id="btn"
            >
              Login / Register
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
