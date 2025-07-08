import React from 'react'

function Header() {
  return (
   <div className='Header-container'>
    <div className='Logo-box'></div>
    <ul>
      <li><a href="#">Menu</a></li>
      <li><a href="#">Location</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>

    <button className='Login-button'>Login</button>
   </div>
  )
}

export default Header