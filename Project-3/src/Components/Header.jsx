import { useContext } from 'react';
import styles from './Header.module.css'
import { FoodItems } from '../Storage/Project3-storage';


export default function Header() {
  const Buttons = ['All','Non-vegetarian', 'Fast-Food', 'South Indian']
 const{searchItem, filterFoodItems} = useContext(FoodItems)
  const handelFilterButton = (btn)=>{
    filterFoodItems(btn)
  }
 
  const handelSearchValue = (event) => {
  event.preventDefault(); 
  const searchValue = (event.target.value)
  searchItem(searchValue)
  }
  return (
    <div className={styles.header_container}>
      <div className={styles.navbar}>
        <div className={styles.logo_box}></div>
        <ul>
          <li><a href="#">HOME</a></li>
          <li><a href="#">ABOUT US</a></li>
          <li><a href="#">CONTACT US</a></li>
          <li><a href="#">FEEDBACK</a></li>
        </ul>
        <div className={styles.search_box}>
          <input onChange={handelSearchValue} type="text" placeholder='Search Food...'/>
        </div> 
      </div>

      <div className={styles.filter_container}>
        {Buttons.map((btn, index)=>(
          <button onClick={()=> handelFilterButton(btn)} key={index} className={styles.buttons}>{btn}</button>
        ))}
      </div>
      </div>

    
  )
}
