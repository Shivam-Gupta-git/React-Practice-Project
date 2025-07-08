import React, { useContext } from 'react'
import { ContactList as ContactListData } from '../Storage/Contact_Store'
import Contact from './Contact'

function ContactList() {
  const{contactList} = useContext(ContactListData)
  return (
    <>
    {contactList.map((contactItem)=>(
      <Contact key={contactItem.id} contactItem = {contactItem}></Contact>
    ))}
    </>
  )
}

export default ContactList