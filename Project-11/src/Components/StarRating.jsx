import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import './StarRating.css'


function StarRating({noOfStars = 10}) {

  const[rating, setRating] = useState(0)
  const[hovering, setHovering] = useState(0)

  const handelOnClickEvent = (getCurrentIndex)=>{
  setRating(getCurrentIndex)
  }
  const handelOnMouseEnterEvent = (getCurrentIndex)=>{
  setHovering(getCurrentIndex)
  }
  const handelOnMouseLeaveEvent = ()=>{
  setHovering(rating)
  }
  return (
    <div className='flex flex-col items-center justify-center  bg-amber-100 p-5 h-[400px]'> 
        <h1 className='bg-green-200 py-2 px-10 rounded text-2xl'>Star Rating</h1>
    <div className='flex items-center justify-center mt-6'>
      {
        [...Array(noOfStars)].map((_, index)=>{
          index += 1 ;
          return <FaStar  
          key={index}

          className={index <= (hovering || rating) ? 'active' : 'inActive'}

          onClick={()=> handelOnClickEvent(index)}
          onMouseEnter={()=> handelOnMouseEnterEvent(index)}
          onMouseLeave={()=> handelOnMouseLeaveEvent()}
          size={40}
          />
        })
      }
      </div>
      </div>
  )
}

export default StarRating; 