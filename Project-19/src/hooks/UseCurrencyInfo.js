import { useEffect, useState } from "react";

function useCurrencyInfo(){
  const [data, setData] = useState({})

  const getCurrency = async () => {
    const response = await fetch(`https://api.frankfurter.dev/v1/currencies`)
    const result = await response.json()
    setData(result)
  }
  useEffect(()=>{
   getCurrency()
  }, [])

  return data
}

export default useCurrencyInfo