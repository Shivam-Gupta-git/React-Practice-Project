import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";

function Header() {
  const[isOpen, setIsOpen] = useState(false)
  const handelToggleButton = ()=> {
   setIsOpen (!isOpen)
  } 

  return (
    <div className='Header-container'>
      <div className='side-bar-button' onClick={handelToggleButton}>
      <FaBars />
      </div>
      <div className="logo-box"></div>

      <div className={`nav-items ${isOpen ? 'menuMobile' : 'menuweb'}`}>
      <ul>
        <li><a href="#">HOME</a></li>
        <li><a href="#">ABOUT US</a></li>
        <li><a href="#">CONTACT US</a></li>
        <li><a href="#">FEEDBACK</a></li>
        <li><a href="#">DASHBOARD</a></li>
      </ul>
      </div>

      <input className='input-search' type="text" placeholder='Search Items'/>

    </div>
  )
}

export default Header;