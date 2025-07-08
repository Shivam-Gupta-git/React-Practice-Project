import React, { useContext } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { FormList } from '../Storage/FormList-store';
import styles from './EmailForm.module.css'

function EmailForm({item}) {
  const{deleteFormList} = useContext(FormList)
  return (
    <div className={`${styles.EmailForm_container} card post-card `} style={{width: "25rem"}}>
    <div className="card-body">
      <h5 className="card-title">Name: {item.name}<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' onClick={()=> deleteFormList(item.id)}><AiFillDelete /></span>
      </h5>
      <p className="card-text">Email: {item.email}</p>
      <p className="card-text">Text: {item.text}</p>
    </div>
  </div>
  )
}

export default EmailForm