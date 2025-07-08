import React from 'react'

function TaskListNumber({data}) {
  console.log(data)
  return (
    <div className='flex mt-10 justify-between gap-5 '>
    <div className=' w-[45%] rounded-xl py-6 px-9 bg-red-400'>
      <h2 className='text-2xl font-semibold '>{data.taskCount.newTask}</h2>
      <h3 className='text-xl font-medium'>New Task</h3>
    </div>
    <div className=' w-[45%] rounded-xl py-6 px-9 bg-blue-400'>
      <h2 className='text-2xl font-semibold '>{data.taskCount.completed}</h2>
      <h3 className='text-xl font-medium'>Completed Task</h3>
    </div>
    <div className=' w-[45%] rounded-xl py-6 px-9 bg-green-400'>
      <h2 className='text-2xl font-semibold '>{data.taskCount.active}</h2>
      <h3 className='text-xl font-medium'>Accepted Task</h3>
    </div>
    <div className=' w-[45%] rounded-xl py-6 px-9 bg-yellow-400'>
      <h2 className='text-2xl font-semibold '>{data.taskCount.failed}</h2>
      <h3 className='text-xl font-medium'>Failed Task</h3>
    </div>
    </div>
  )
}

export default TaskListNumber