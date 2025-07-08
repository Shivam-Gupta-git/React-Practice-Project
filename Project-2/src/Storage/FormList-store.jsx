import { createContext, useReducer } from "react";
import { DEFAULT_FORM_LIST } from "../Components/ProjectData";

 export const FormList = createContext({
  formList: [],
  addFormList: ()=>{},
  deleteFormList: ()=>{}
 })
const FormListReducer = (currentFormList, action) => {
 let newFormList = currentFormList;
 if(action.type === 'ADD_FORMLIST'){
  newFormList = [action.payLoad, ...currentFormList]
 }
 else if(action.type ==='DELETE_FORMLIST'){
  newFormList = currentFormList.filter(form => form.id !== action.payLoad.formId)
 }
 return newFormList;
}
const FormListProvider = ({children}) => {
const [formList, dispatchFormList] = useReducer(FormListReducer, DEFAULT_FORM_LIST)

 const addFormList = (name, email, text)=>{
  dispatchFormList({
    type: 'ADD_FORMLIST',
    payLoad:{
      id: Date.now(),
      name: name,
      email: email,
      text: text,
    }
  })
 }

 const deleteFormList = (formId)=>{
  dispatchFormList({
    type:'DELETE_FORMLIST',
    payLoad:{
      formId,
    }
  })
 }


  return <FormList.Provider value={{
    formList,
    addFormList,
    deleteFormList,
  }}>{children}</FormList.Provider>
}

export default FormListProvider;