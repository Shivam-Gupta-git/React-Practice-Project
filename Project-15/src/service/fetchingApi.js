export const getScrollTrigger = async ()=>{
  const response = await fetch('https://dummyjson.com/products?limit=100')
  return await response.json()
}