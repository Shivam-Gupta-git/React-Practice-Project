import React, { useContext } from 'react'
import EmailForm from './EmailForm'
import { FormList } from '../Storage/FormList-store'
import styles from './EmailFormList.module.css'

function EmailFormList() {
  const{formList} = useContext(FormList)
  return (
    <>
    {/* Containers */}
    <div className={styles.EmailFormList_container}>
    {formList.map((item, index)=>(
      <EmailForm key={index} item = {item}></EmailForm>
    ))}
    </div>
    </>
  )
}

export default EmailFormList