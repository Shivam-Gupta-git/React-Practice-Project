import React from 'react'
import styles from './Phase2.module.css'

function Phase2({items}) {
  return (
    // Containers.....
      <div className={styles.FoodItems_card}>
        <div className={styles.foodItem_info}>
          <div className={styles.foodItem_Img}><img src={items.image} alt="" /></div>
          <div className={styles.foodItem_text}>
            <h1 className={styles.items_name}>{items.name}</h1>
            <p className={styles.text}>{items.text}</p>
            <div className={styles.price_box}>
              <div className={styles.original_price}>
                Original Price: {items.Price.orginal_Price}</div>
              <div className={styles.discount}>Discount:  {items.Price.discount}%</div>
              <div className={styles.current_price}>Current Price: {items.Price.current_Price}</div>
            </div>
          </div>
        </div>
        <div className={styles.foodItem_button}>
          <button className={styles.order}>Order Now</button>
        </div>
      </div>
  )
}

export default Phase2