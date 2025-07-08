import { useState } from 'react'
import './App.css'
import {QRCode} from "react-qr-code"

function App() {
const [inputVal, setInputVal] = useState('')
const [qrCode, setQrCode] = useState('')

const handelGenerateButton = (event)=>{
 event.preventDefault()
 setQrCode(inputVal)
 setInputVal(" ")
}
  return (
    <>
     <div className='w-full h-[400px] flex flex-col items-center bg-blue-300'>
      <h1 className='text-2xl font-bold text-white mt-3'>QR Code Generator</h1>
      <div className='w-[35%] flex flex-row items-center gap-2'>
      <input 
      type="text" 
      name='qr-generator' 
      placeholder='Enter Your QR Name' 
      onChange={(e)=> setInputVal(e.target.value)} 
      className='outline-0 border border-gray-500 w-[100%] p-1.5 mt-2 rounded shadow-sm shadow-blue-400'/>
      
      <button 
      disabled={inputVal && inputVal.trim() !== " " ? false : true} 
      onClick={handelGenerateButton}  
      className='bg-blue-500 px-3 h-[40px] rounded mt-2 cursor-pointer'>Generate</button>
      </div>
  
      <QRCode
      id="qr-code-value"
      value={qrCode} size={250}
      className="mt-5 rounded shadow-2xl shadow-blue-500"
      />
    </div>

    </>
  )
}

export default App
