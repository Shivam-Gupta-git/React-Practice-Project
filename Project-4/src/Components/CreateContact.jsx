import React, { useContext, useRef, useState } from 'react'
import styles from './CreateContact.module.css'
import { IoMdCloseCircle } from "react-icons/io";
import { ContactList } from '../Storage/Contact_Store';
import { useNavigate } from 'react-router-dom';



function CreateContact({contactClose}) {
  const{addContactList} = useContext(ContactList);
  const navigate = useNavigate()
  const nameElement = useRef()
  const emailElement = useRef()
  const numberElement = useRef()


  const handelOnSubmitButton = (event)=>{
    event.preventDefault();  
      const name = nameElement.current.value;
      const email = emailElement.current.value;
      const number = numberElement.current.value;

      if (!name || !email || !number) {
        alert("Please fill out all fields before submitting.");
        return;
      }

    nameElement.current.value = " ";
    emailElement.current.value = " ";
    numberElement.current.value = " "; 

    addContactList(name, email, number)
    navigate("/")
  }
  
  
  return (
    <>
<div className={styles.CreateContact_container} >
    <form  onSubmit={handelOnSubmitButton} className={styles.CreateContact_form}>
    <span onClick={contactClose} class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    <IoMdCloseCircle className={styles.colse_icon}/>
  </span>
  <div class="mb-3">
  <label htmlFor="text" className="form-label">Name</label>
  <input name="name" ref={nameElement} className="form-control" id="text" placeholder='Please Enter Your Name'/>
  </div>
  <div class="mb-3">
  <label htmlFor="email" className="form-label">Email</label>
    <input type="email" ref={emailElement} class="form-control" id="email" placeholder='Please Enter Your Email'/>
  </div>
  <div class="mb-3">
  <label htmlFor="number" className="form-label">Number</label>
    <input number="number" ref={numberElement} class="form-control" id="text" placeholder='Please Enter Your Number'/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
<div className={styles.CreateContact_container2}/>
    </>
  )
}

export default CreateContact;