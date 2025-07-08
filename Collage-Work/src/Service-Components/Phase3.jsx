import React from 'react'
import styles from './Phase3.module.css'

function Phase3() {
  return (
    <div className={styles.Phase3_main_container}>
      <div className={styles.info_container1}>
        <div className={styles.icon_box}></div>
        <div className={styles.info_box}>
          <h1 className={styles.cheat_sheet1}>Online</h1>
          <h1 className={styles.cheat_sheet2}>Certifications</h1>
        </div>
      </div>
      <div className={styles.info_container1}>
      <div className={styles.icon_box}></div>
        <div className={styles.info_box}>
        <h1 className={styles.cheat_sheet1}>Top</h1>
          <h1 className={styles.cheat_sheet2}>Instructors</h1>
        </div>
      </div>
      <div className={styles.info_container1}>
      <div className={styles.icon_box}></div>
        <div className={styles.info_box}>
        <h1 className={styles.cheat_sheet1}>Unlimited</h1>
          <h1 className={styles.cheat_sheet2}>Notes</h1>
        </div>
      </div>
      <div className={styles.info_container1}>
      <div className={styles.icon_box}></div>
        <div className={styles.info_box}>
        <h1 className={styles.cheat_sheet1}>Experienced</h1>
          <h1 className={styles.cheat_sheet2}>Members</h1>
        </div>
      </div>
    </div>
  )
}

export default Phase3