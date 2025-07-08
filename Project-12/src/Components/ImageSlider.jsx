import React, { useEffect, useState } from 'react'
import './ImageSlide.css'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function ImageSlider({url, limit , page }) {
  const[images, setImages] = useState([])
  const[currentSlide, setCurrentSlide] = useState(0)
  const[loading, setLoading] = useState(false)

  async function fetchImages(geturl){
    try {
      setLoading(true)
      const response = await fetch(`${geturl}?page=${page}&limit=${limit}`)
      const data = await response.json()
      setImages(data)
      setLoading(false)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchImages(url);
  },[url])
  // console.log(images)

  useEffect(()=>{
    const timer = setInterval(()=>{
      handelNext()
    }, 3000);
    return ()=> clearInterval(timer)
  },[currentSlide])

  const handelPrevious = ()=>{
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }
  const handelNext = ()=>{
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
  }

  if(loading){
    return <div>Load Data ! Please Wait </div>
  }
  return (
   <div className='h-[500px] w-[100%] bg-amber-400 flex items-center justify-center'>
    <div className='w-[600px] h-[300px] relative flex items-center justify-center'>
    <BsArrowLeftCircleFill onClick={handelPrevious} className='absolute left-0 text-3xl text-amber-200 ml-2 '/>
    {images && images.length ? images.map((imageItems, index)=>(
    
     <img
     key={imageItems.id}
     alt={imageItems.download_url}
     src={imageItems.download_url}
     className={currentSlide === index ? 'current-image' : 'hide-current-image'}
     />
    )) : null}
    <BsArrowRightCircleFill onClick={handelNext} className='absolute right-0 text-3xl text-amber-200 mr-2'/>
    <span className='flex absolute bottom-[1rem]'>
      {images && images.length ? images.map((_, index)=>(
       <button 
       key={index}
       className={currentSlide === index ? 'active-indicator' : 'active-indicator inactive-indicator'}
       onClick={() => setCurrentSlide(index)}
       ></button>
      )): null}
    </span>
    </div>
   </div>
  );
   
}

export default ImageSlider;