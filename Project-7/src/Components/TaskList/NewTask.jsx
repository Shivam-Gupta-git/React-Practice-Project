import React from 'react'

function NewTask({element}) {
  return (
    <div className='flex-shrink-0 h-full w-[300px] bg-green-400 rounded-xl'>
    <div className='flex justify-between p-3'>
     <p className='text-sm bg-amber-900 py-1 px-2 rounded '>{element.category}</p>
     <p className='text-sm mb-2 '>{element.date}</p>
    </div>
    <p className='text-2xl px-3 mb-2 font-semibold'>{element.title}</p>
    <p className='text-sm px-3'>{element.description}</p>
    <div className='flex justify-between px-2'>
      <button className='bg-blue-500 py-1 px-2 text-sm rounded'>Accept Task</button>
    </div>
   </div>
  )
}

export default NewTask