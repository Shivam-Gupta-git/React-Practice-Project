import { useState } from "react"

const useToggle = (defaultVal) => {
 const [value, setVal] = useState(defaultVal)

 function toggleValue (val){
  // console.log(val)
  if(typeof val != 'boolean'){
    // console.log('if')
    setVal(!value)
  }else{
    // console.log('else')
    setVal(val)
  }
 }
 return [value, toggleValue]
}

export default useToggle