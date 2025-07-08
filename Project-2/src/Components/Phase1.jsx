import React from 'react'
import styles from './Phase1.module.css'
import { Phase1Info } from './ProjectData';

function Phase1() {
  return (
    <>
    {Phase1Info.map((items, index)=>(
    <div key={index} className={styles.Phase1_Container}>
      <h1>{items.heading1}</h1>
      <p>{items.heading2}</p>
    </div>
    ))}
    </>
  )
}

export default Phase1;
