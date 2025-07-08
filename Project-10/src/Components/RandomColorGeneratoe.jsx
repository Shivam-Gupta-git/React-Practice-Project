import React, { useEffect, useState } from 'react'

function RandomColorGeneratoe() {

  const[typeOfColor, setTypeOfColor] = useState('hex')
  const[color, setColor] = useState('#000000')
  // console.log(typeOfColor)


  const handelRandomColorUtility = (length)=>{
    return Math.floor(Math.random()*length)
  }

  const handelRandomHexColor = ()=>{
  const hex = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']
  let hexColor = '#';
  for(let i = 0; i < 6; i++){
    hexColor += hex[handelRandomColorUtility(hex.length)]
  }
  setColor(hexColor)
  }

  const handelRandomRgbColor = ()=>{
  const r = handelRandomColorUtility(256)
  const g = handelRandomColorUtility(256)
  const b = handelRandomColorUtility(256)

  setColor(`rgb(${r}, ${g}, ${b})`)
  }

  useEffect(()=>{
    if(typeOfColor === 'rgb'){
      handelRandomRgbColor()
    }
    else{
      handelRandomHexColor()
    }
  },[typeOfColor])

  return (
    <div className='flex items-center justify-center w-full bg-amber-300 h-[100vh] flex-col'>
      <h1 className='mb-5 text-2xl bg-green-300 p-2 rounded text-gray-500'>Generate Random Color Pannel</h1>
    <div style={{
    background:color,
    height:'500px',
    width:'50%',
    borderRadius:'10px',
    boxShadow: '1px 1px 3px 1px gray'
    }}>
      <div className='flex justify-center items-center '>
        <h3>{typeOfColor === 'rgb' ? 'RGB Color' : 'HEX Color'}</h3>
        <h1 className='text-2xl p-2'>{color}</h1>
      </div>
    </div>

    <div className='flex gap-4 p-2 mt-4'>
    <button onClick={()=> setTypeOfColor('hex')}>
      {typeOfColor === 'hex' ? <p className='bg-red-600 p-2 text-white border-1 rounded'>On Create HEX Color</p> : <p className='bg-yellow-500 text-black p-2 border-1 rounded cursor-pointer'>Off Create HEX Color</p> }
      </button>
      <button onClick={()=> setTypeOfColor('rgb')}>
      {typeOfColor === 'rgb' ? <p className='bg-red-600 p-2 text-white border-1 rounded'>On Create RGB Color</p> : <p className='bg-yellow-500 text-black p-2 border-1 rounded cursor-pointer'>Off Create HEX Color</p> }
      </button>
      <button onClick={typeOfColor === 'hex' ? handelRandomHexColor : handelRandomRgbColor} className='border-1 text-black p-2 rounded cursor-pointer'>Create Random Color</button>
    </div>
    </div>
  )
}

export default RandomColorGeneratoe