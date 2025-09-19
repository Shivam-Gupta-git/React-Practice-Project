import React, { useEffect, useState } from 'react'
import useCurrencyInfo from '../hooks/UseCurrencyInfo'

function Dashboard() {

  const[amount, setAmount] = useState(0)
  const[fromCurrency, setFromCurrency] = useState("USD")
  const[toCurrency, setTocurrency] = useState("INR")
  const[converAmount, setConverAmount] = useState(0)

  const currencyList = useCurrencyInfo(); 
  const currencies = Object.keys(currencyList);
 
  const handelConverterButton = async (e)=> {
    e.preventDefault()
    const response = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}`)
    const data = await response.json()
    setConverAmount(data.rates[toCurrency])
  }
  

  return (
    <div className="h-screen w-full bg-gradient-to-br from-amber-100 to-blue-100 flex items-center justify-center">
  <form onSubmit={handelConverterButton} className="w-[500px] bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6">
    <h1 className="text-2xl font-bold text-center text-gray-700">Currency Converter</h1>

    <div className="flex items-center gap-4">
      {/* From Currency */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium text-gray-600 mb-1">From</label>
        <select 
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        className="bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          {currencies.map((curr, index) => (
            <option key={index} >{curr}</option>
          ))}
        </select>
      </div>

      {/* To Currency */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium text-gray-600 mb-1">To</label>
        <select 
        value={toCurrency}
        onChange={(e) => setTocurrency(e.target.value)}
        className="bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          {currencies.map((curr, index) => (
            <option key={index}>{curr}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Amount Input */}
    <div>
      <label className="text-sm font-medium text-gray-600 mb-1">Amount</label>
      <input
        type="number"
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
        className="w-full bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>

    <h1>Converted Amount: {converAmount}</h1>

    {/* Convert Button */}
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
    >
      Convert
    </button>
  </form>
</div>
  )
}

export default Dashboard