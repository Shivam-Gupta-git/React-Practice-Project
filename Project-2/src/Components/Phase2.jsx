import React, { useContext, useRef } from 'react'
import styles from './Phase2.module.css'
import { FaMessage } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { FormList } from '../Storage/FormList-store';
import { Phase2Info } from './ProjectData';

function Phase2() {
  const{addFormList} = useContext(FormList)
  const navigate = useNavigate()

  const nameElement = useRef();
  const emailElement = useRef()
  const textElement = useRef()
  
  const handelsubmitButton = (event)=>{
    event.preventDefault();
    const name = nameElement.current.value;
    const email = emailElement.current.value;
    const text = textElement.current.value;
    addFormList(name, email, text);

    nameElement.current.value = ' '
    emailElement.current.value = ' '
    textElement.current.value = ' '

    navigate('VIA_EMAIL_FORM')
  }

  return (
    <>
    
    <div className={styles.Phase2_container}>
      <div className={styles.contact_form}>
        <div className={styles.top_button}>
        <button className={styles.message_button}>
        <FaMessage fontSize={'17px'}/>
        VIA SUPPORT CHAT
        </button>
       
        <button className={styles.call_button}>
        <IoCallSharp fontSize={'20px'} />
        VIA CALL
        </button>
        </div>
        <div className={styles.top_second_button}>
          <Link to='VIA_EMAIL_FORM' className={styles.email_button}>
          <MdEmail fontSize={'20px'} />
          VIA EMAIL FORM
          </Link>
        </div>

  <form className={styles.form_page} onSubmit={handelsubmitButton}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="Name" ref={nameElement} className="form-control" id="Name" placeholder='Please Enter Your Name'/>
  </div>
  <div className="mb-3">
    <label htmlFor="emailId" className="form-label">E-Mail</label>
    <input type="email" ref={emailElement} className="form-control" id="emailId" placeholder='Please Enter Your Email Address'/>
  </div>
  <div className="mb-3">
    <label htmlFor="text" className="form-label">Text</label>
    <textarea rows={4} type="text" ref={textElement} className="form-control" id="text" 
    placeholder='Please Enter Your Text'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
      {Phase2Info.map((itemm, index)=>(
    <div key={index} className={styles.Image_container}>
       <img src={itemm.image} alt="" />
      
    </div>
      ))}
    </div>
    </>
  )
}

export default Phase2;