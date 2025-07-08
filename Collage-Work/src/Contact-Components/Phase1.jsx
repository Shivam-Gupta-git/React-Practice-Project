import React from 'react'
import style from './Phase1.module.css'
import { Phase1Info } from './Data_Storage_Con'

function Phase1() {
  return (
    <>
    {Phase1Info.map((items)=>(
    <div className={style.Phase1_main_container}>
      <img src={items.Image1} alt="" />
      <h1 className={style.cheat_sheet1}>{items.heading1}</h1>
      <p className={style.cheat_sheet2}>{items.heading2}</p>
    </div>
    ))}
    </>
  )
}

export default Phase1