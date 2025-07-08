import React from 'react'
import styles from './Phase2.module.css'
import { Phase2Info } from './Data_Storage_con'


function Phase2() {
  return (
    <>
    {Phase2Info.map((items)=>(

    <div className={styles.Phase2_main_container}>
      <div className={styles.info_container1}>
        <div className={styles.icon_info_box1}>
          <div className={styles.icon_box}></div>
          <div className={styles.info_box}>
            <h1 className={styles.cheat_sheet1}>{items.heading1}</h1>
            <p className={styles.cheat_sheet2}>{items.heading2}</p>
          </div>
        </div>
        <div className={styles.icon_info_box2}>
        <div className={styles.icon_box}></div>
          <div className={styles.info_box}>
          <h1 className={styles.cheat_sheet1}>{items.heading3}</h1>
            <p className={styles.cheat_sheet2}>{items.heading4}</p>
          </div>
        </div>
        <div className={styles.icon_info_box3}>
        <div className={styles.icon_box}></div>
          <div className={styles.info_box}>
          <h1 className={styles.cheat_sheet1}>{items.heading5}</h1>
            <p className={styles.cheat_sheet2}>{items.heading4}</p>
          </div>
        </div>
        <div className={styles.icon_info_box4}>
        <div className={styles.icon_box}></div>
          <div className={styles.info_box}>
          <h1 className={styles.cheat_sheet1}>{items.heading7}</h1>
            <p className={styles.cheat_sheet2}>{items.heading8}</p>
          </div>
        </div>
        <div className={styles.icon_info_box5}>
        <div className={styles.icon_box}></div>
          <div className={styles.info_box}>
          <h1 className={styles.cheat_sheet1}>{items.heading9}</h1>
            <p className={styles.cheat_sheet2}>{items.heading10}</p>
          </div>
        </div>
      </div>
      <div className={styles.info_container2}>
        <h1 className={styles.cheat_sheet3}>{items.heading11}</h1>
        <p className={styles.cheat_sheet4}>{items.heading12}</p>
        <p className={styles.cheat_sheet4}>{items.heading13}</p>
        <p className={styles.cheat_sheet4}>{items.heading14}</p>
        <p className={styles.cheat_sheet4}>{items.heading15}</p>
        <button className={styles.button}>More</button>
      </div>
    </div>
    ))}
    </>
  )
}

export default Phase2