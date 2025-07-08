import React, { useEffect, useState } from 'react'
import { getScrollTrigger } from '../service/fetchingApi'

function ScrollIndicator() {
  const[data, setData] = useState([])
  const[scrollPercentage, setScrollPercentage] = useState(0)

  const fetchingData = async ()=>{
    try {
      const items = await getScrollTrigger()
      if(items && items.products && items.products.length > 0 ){
        setData(items.products)
      }
    } catch (error) {
      console.log('error while fetching API', error)
    }
  }
  useEffect(()=>{
    fetchingData()
  }, [])

  const handelScrollPercentage = ()=>{
   console.log(
    document.body.scrollTop, 
    document.documentElement.scrollTop, 
    document.documentElement.scrollHeight, 
    document.documentElement.clientHeight
    )

    const scrolled = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setScrollPercentage((scrolled / height) * 100)
  }
  useEffect(()=>{
   window.addEventListener('scroll', handelScrollPercentage)

   return ()=>{
    window.removeEventListener('scroll', ()=>  {})
   }
  }, [])
  // console.log(data, scrollPercentage)

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full h-[60px] bg-amber-600 flex flex-col  justify-center items-center sticky top-0 left-0 z-50'>
        <div className='h-[90%]'>
        <h1 className='text-4xl mt-2 font-medium text-white '>Custom Scroll Items</h1>
        </div>
      <div className='w-full h-[10%] bg-amber-300 sticky top-0 left-0 z-50'>
        <div className='h-2 bg-blue-700 w-10' style={{width: `${scrollPercentage}%`}}></div>
      </div>
      </div>
      <div className='mt-5'>
        {
         data && data.length > 0 ? data.map((dataItems) => (  
            <h1 key={dataItems.id}>{dataItems.title}</h1>  
         )) : null
        }
      </div>
    </div>
  )
}

export default ScrollIndicator