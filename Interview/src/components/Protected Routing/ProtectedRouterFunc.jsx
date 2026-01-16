import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

 

 const ProtectedRouteFunction = ({children}) => {

  const token = localStorage.getItem('token')
  if(!token){
    return <Navigate to='/Login'></Navigate>
  }
  return(
    children
  )
 }

 export default ProtectedRouteFunction