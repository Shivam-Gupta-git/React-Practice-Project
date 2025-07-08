import React from 'react'
import Header from '../Others/Header'
import TaskListNumber from '../Others/TaskListNumber'
import TaskList from '../TaskList/TaskList'

function EmployeeDashboard({data, setUser}) {
  return (
    <div className='p-4  bg-[#1c1c1c] h-screen w-screen text-white'>
      <Header data={data} setUser={setUser}></Header>
      <TaskListNumber data={data}></TaskListNumber>
      <TaskList data={data}></TaskList>
    </div>
  )
}

export default EmployeeDashboard