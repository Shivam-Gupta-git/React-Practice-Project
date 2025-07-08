import React from 'react'
import styles from './Header.module.css'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className={styles.header_container}>
      <div className={styles.logo_box}></div>
      <div className={styles.header_Elements_box}>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="Section">SECTION</Link>
          </li>
          <li>
            <Link to="Contact">CONTACTS</Link>
          </li>
          <li>
            <Link to="Feedback">FEEDBACK</Link>
          </li>
          <li>
            <Link to="About">ABOUT</Link>
          </li>
        </ul>
      </div>
      <input type="text" placeholder='Search Items...' />
      <div className={styles.login_pannel}></div>
    </div>
  )
}

export default Header;