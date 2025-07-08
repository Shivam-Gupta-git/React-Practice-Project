import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthProvider';

function CreateTast() {

  const [userData, setUserData] = useContext(AuthContext);

  const[taskTitle, setTaskTitle] = useState('')
  const[taskDescription, setTaskDescription] = useState('')
  const[taskDate, setTaskDate] = useState('')
  const[assignTo, setAssignTo] = useState('')
  const[category, setCategory] = useState('')

  const[newTask, setNewTask] = useState({})

  const handelOnSubmit = (event)=>{
    event.preventDefault()

    setNewTask({taskTitle, taskDescription, taskDate, assignTo, category, active: false, newTask: true, failed: true, completed:true})

    const data = userData
    data.forEach((element)=>{
      if (assignTo == element.firstName){
        element.tasks.push(newTask)
        element.taskCount.newTask = element.taskCount.newTask+1
      }
    })
    setUserData(data)
    console.log(data)

    setTaskTitle('')
    setTaskDescription('')
    setTaskDate('')
    setAssignTo('')
    setCategory('')
  }
  return (
    <div className="p-5 bg-[#1c1c1c] mt-7 justify-between ">
    <form onSubmit={handelOnSubmit} className="flex flex-wrap w-full  items-start justify-between ">
      <div className="w-1/2 flex flex-col p-3 gap-3">
        <div>
          <p className="text-sm text-gray-300 mb-1">Task Title</p>
          <input
          value={taskTitle}
          onChange={(e)=>{
            setTaskTitle(e.target.value)
          }}
            className="text-sm py-1 px-2 w-4/5 border-[1px] outline-none rounded"
            type="text"
            placeholder="Make a UI design"
          />
        </div>

        <div>
          <p className="text-sm text-gray-300 mb-1">Date</p>
          <input
          value={taskDate}
          onChange={(e)=>{
            setTaskDate(e.target.value)
          }}
            className="text-sm px-2 py-1 border-[1px] outline-none w-4/5 rounded"
            type="date"
          />
        </div>

        <div>
          <p className="text-sm text-gray-300 mb-1">Asign to</p>
          <input
          value={assignTo}
          onChange={(e)=>{
            setAssignTo(e.target.value)
          }}
            className="text-sm px-2 py-1 border-[1px] outline-none w-4/5 rounded"
            type="text"
            placeholder="Employ name"
          />
        </div>
        <div>
          <p className="text-sm text-gray-300 mb-1">Category</p>
          <input
            value={category}
            onChange={(e)=>{
              setCategory(e.target.value)
            }}
            className="text-sm px-2 py-1 border-[1px] outline-none w-4/5 rounded"
            type="text"
            placeholder="Design, Dev, etc"
          />
        </div>
      </div>
      <div className="w-2/5 flex flex-col items-start  py-4">
        <p className="text-sm text-gray-300 mb-1 ">Description</p>
        <textarea
        value={taskDescription}
        onChange={(e)=>{
          setTaskDescription(e.target.value)
        }}
          className="border-[1px] w-full h-[200px] text-sm px-3 py-2 outline-none rounded"
          name=" "
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button type='submit' className=" w-full mt-2 py-2 bg-green-400 rounded">
          Create Task
        </button>
      </div>
    </form>
  </div>
  )
}

export default CreateTast