import React, { useContext, useState } from 'react'
import styles from './Phase1.module.css'
import { IoIosAddCircle } from "react-icons/io";
import CreateContact from './CreateContact';
import ContactList from './ContactList';
import { ContactList as ContactListData } from '../Storage/Contact_Store';

function Phase1() {
   const{searchContact} = useContext(ContactListData)
  const [iscontact, setIsContact] = useState(false)
  const contactOpen = ()=>{
    setIsContact(true)
  }
  const contactClose = ()=>{
   setIsContact(false)
  }

  const handelContactSearchValue = (event)=>{
   event.preventDefault();
   searchContact(event.target.value)
  }
  return (
    <>
    <div className={styles.Phase1_container}>
      <div className={styles.Search_container}>
        <input onChange={handelContactSearchValue} type="text"  placeholder='Search Contact'/>
        <IoIosAddCircle onClick={contactOpen} color='white' fontSize={'40px'}/>
      </div>
    </div>
    <ContactList></ContactList>
    {iscontact === true && <CreateContact contactClose = {contactClose}></CreateContact> }
    </>
  )
}

export default Phase1