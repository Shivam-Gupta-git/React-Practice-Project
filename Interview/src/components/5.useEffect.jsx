import React, { useEffect, useState } from 'react'

function UseEffect() {
  const [date, setDate] = useState(0)

  useEffect(()=> {
   setInterval(()=> {
    const updateTime = new Date()
    setDate(updateTime.toLocaleTimeString())
   }, 1000)
  },[ date])
  return (
    <>    
    <h1>Time: {date}</h1>
    </>
  )
}

export default UseEffect