import React, { useEffect, useState } from 'react'
import { getSliderImageData } from '../server/ImageSliter'
import './ImgSlider.css'

function ImgSlider() {
  // console.log({url, page, limit})
  const [images, setImages] = useState([])
  const [currentSlider, setCurrentSlider] = useState(0)
  const [hovering, setHovering] = useState(false)

  const handelImageApi = async ()=>{
    const api = await getSliderImageData()
    setImages(api)
  }
  useEffect(()=>{
    handelImageApi()
  },[])
 

  useEffect(()=>{
    if(hovering === true){
      const timer = setInterval(()=>{
       handelNext()
      }, 3000) 
      return ()=> clearInterval(timer)
    }
  },[currentSlider, hovering])
  

  const handelPrevious = ()=>{
   setCurrentSlider(currentSlider === 0 ? images.length - 1 : currentSlider - 1)
  }
  const handelNext = ()=>{
   setCurrentSlider(currentSlider === images.length - 1 ? 0 : currentSlider + 1)
  }


  return (
    <>
    <div  className='w-[100%] h-[500px] border flex items-center justify-center bg-amber-300'>
    <div 
    onMouseEnter={()=> setHovering(true)} 
    onMouseLeave={()=> setHovering(false)}
    className='w-[50%] h-[300px] border rounded-2xl relative flex items-center'>
      <button onClick={handelPrevious} className='absolute left-0 text-3xl cursor-pointer '>⬅️</button>
      {images && images.length ? images.map((imageItems, index)=>(
       <img key={imageItems.id}
       src={imageItems.download_url} 
       alt={imageItems.download_url} className={currentSlider === index ? 'current-image' : 'hide-current-image'}/>
      )): null}
      <button onClick={handelNext} className='absolute right-0 text-3xl cursor-pointer'>➡️</button>
      <span className='absolute   bottom-5 left-[45%] flex flex-row'>
        {images  ? images.map((_, index)=>(
          <button key={index} className={currentSlider === index ? 'active-indicator' : 'active-indicator inactive-indicator'} onClick={()=> setCurrentSlider(index)}></button>
        )): null}
      </span>
    </div>
  </div>
    </>
  )
}

export default ImgSlider