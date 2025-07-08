import { useContext, useEffect, useState } from 'react';
import './App.css'
import Login from './Components/Auth/Login';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import EmployeeDashboard from './Components/Dashboard/EmployeeDashboard';
import { getLocalStorage, setLocalStorage } from './Utils/LocalStorage';
import { AuthContext } from './Context/AuthProvider';

function App() {

  const[user, setUser] = useState(null)
  const[loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(AuthContext)
  // console.log(authData)

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    if(loggedInUser){
     const userData = JSON.parse(loggedInUser)
     setUser(userData.role)
     setLoggedInUserData(userData.data)
    }
  },[])

  const handleLogin = (email, password)=>{
  if(email == 'admin@me.com' && password == '123'){
    setUser('admin')
    localStorage.setItem('loggedInUser', JSON.stringify({role:'admin'}))
  }
  else if(userData){
    const employee = userData.find((e)=> email == e.email && password == e.password) 
    if(employee){
      setUser('employee')  
      setLoggedInUserData(employee)
      localStorage.setItem('loggedInUser', JSON.stringify({role:'employee', data:employee})) 
    }
  }
  else{
    alert('Invalid Credentials')
  }
  }

  return (
    <>
    {!user ? <Login handleLogin = {handleLogin}/> : ''}
    {user == 'admin' ? <AdminDashboard setUser = {setUser}></AdminDashboard> : (user == 'employee' ? <EmployeeDashboard data={loggedInUserData} setUser = {setUser}></EmployeeDashboard> : null ) }
    </>
  )
}

export default App;
