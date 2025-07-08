import React, { useContext } from 'react'
import styles from './Phase1.module.css'
import { FoodItems } from '../Storage/Project3-storage'
import Phase2 from './Phase2'

function Phase1() {
  const{foodItems} = useContext(FoodItems)
  return (
    <>
    <div className={styles.Phase1_container}>
      <div className={styles.items_container}>
          {foodItems.map((items)=>(
            <Phase2 key={items.id} items = {items}></Phase2>
          ))}
      </div>
    </div>
    </>
  )
}

export default Phase1