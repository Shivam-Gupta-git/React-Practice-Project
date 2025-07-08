import React, { useContext } from 'react'
import styles from './Contact.module.css'
import { FaRegUserCircle } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ContactList } from '../Storage/Contact_Store';


function Contact({contactItem}) {

  const{deleteContactList} = useContext(ContactList)
  return (
    <div className={styles.contact_container}>
      <div className={styles.contact_box}>
        <div className={styles.contact_icon_box}>
      <FaRegUserCircle className={styles.contact_icon} />
        </div>
      <div className={styles.contact_info}>
        <span className={styles.contact_name}>Name:{contactItem.name}</span>
        <span className={styles.contact_email}>Email:{contactItem.email}</span>
        <span className={styles.contact_number}>Number:{contactItem.number}</span>
      
      </div>
      <div className={styles.contact_delete}>
      <MdEditDocument className={styles.edit_icon} />
      <MdDelete onClick={()=> deleteContactList(contactItem.id)} className={styles.delete_icon}/>
      </div>
      </div>
    </div>
  )
}

export default Contact;