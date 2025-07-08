import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className={styles.Header_container}>
      <div className={styles.Logo_box}></div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  )
}

export default Header