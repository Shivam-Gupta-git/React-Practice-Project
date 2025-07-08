import React from 'react'
import styles from './Navbar.module.css'
import { FaFileAlt } from "react-icons/fa";

function Navbar() {
  return (
    <div className={styles.Navbar_container}>
      <div className={styles.navbar_section}>
      <FaFileAlt color='orange' fontSize={'25px'}/>
        <h1>Firebase Contact App</h1>
      </div>
    </div>
  )
}

export default Navbar