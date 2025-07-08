import React, { useEffect, useState } from 'react'

function LoadMoreData() {
  const [product, setProduct] = useState([])
  const [count, setCount] = useState(0)
  const [disableButton, setDisableButton] = useState(false)

  const fetchingData = async ()=>{
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${count === 0 ? 0 : count * 10}`)
    const items = await response.json()
    setProduct((prevData) => [...prevData, ...items.products])
  } catch (error) {
    console.log('error while connecting to api', error)
  }
  }

  useEffect(()=>{
    fetchingData()
  },[count])
  console.log(product)

  useEffect(()=>{
    if(product && product.length === 100) setDisableButton(true) 
  }, [product])

  return (
    <div className='flex flex-col items-center'>
    <div className='text-red-500 w-full h-full flex flex-row flex-wrap items-center justify-center mt-5 gap-5'>
     {
       product && product.length ? product.map((productItem, index)=>(
        <div key={index} className='h-[300px] w-[300px] rounded shadow-sm p-1 mb-5'>
          <img className='h-[70%] w-full shadow-sm shadow-gray-400' src={productItem.thumbnail} alt={productItem.title} />
          <div>
          <h1 className='mt-1 text-gray-400'>{productItem.title}</h1>
          </div>
        </div>
       ))
       : null
     }
    </div>
    <button disabled={disableButton} onClick={()=> setCount(count + 1)} className='mb-10 bg-gray-500 py-1 px-3 rounded text-white cursor-pointer shadow-sm shadow-gray-400'>Load More Items</button>
    {
      disableButton ?  <h1>items will be overed</h1> : null
    }
    </div>
  )
}

export default LoadMoreData