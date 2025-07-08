export const getSliderImageData = async ()=>{
 const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=5`)
 return await response.json()
}