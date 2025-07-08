import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

function TaskList({data}) {
  return (
    <div id='taskList'  className='h-[40%] flex items-start justify-start w-full  mt-10 gap-4 p-3 flex-nowrap overflow-x-auto'>

   {data.tasks.map((element, index)=>{
    if(element.active){
      return <AcceptTask key={index} element={element}/>
    }
    if(element.newTask){
      return <NewTask key={index} element={element}/>
    }
    if(element.completed){
      return <CompleteTask key={index} element={element}/>
    }
    if(element.failed){
      return <FailedTask key={index} element={element}/>
    }
   })}

{/* <AcceptTask></AcceptTask>
      <NewTask></NewTask>
      <CompleteTask></CompleteTask>
      <FailedTask></FailedTask> */}
    </div>
  )
}

export default TaskList