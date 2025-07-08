import React from 'react'
import './Service.css'
import Phase1 from '../Service-Components/Phase1'
import Phase2 from '../Service-Components/Phase2'
import Phase3 from '../Service-Components/Phase3'
import Phase4 from '../Service-Components/Phase4'

const Services = () => {
  return (
    <div className='Service-main-container'>
      <Phase1></Phase1>
      <Phase2></Phase2>
      <Phase3></Phase3>
      <Phase4></Phase4>
    </div>
  )
}

export default Services