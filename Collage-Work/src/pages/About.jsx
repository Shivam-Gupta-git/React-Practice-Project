import React from 'react'
import Phase1 from '../About-Components/Phase1'
import './About.css'
import Phase2 from '../About-Components/Phase2'
import Phase3 from '../About-Components/Phase3'
import Phase4 from '../About-Components/Phase4'
import Phase5 from '../About-Components/Phase5'
import Phase6 from '../About-Components/Phase6'
import Phase7 from '../About-Components/Phase7'

const About = () => {
  return (
    <>
    <div className='About-main-container'>
    <Phase1></Phase1>
    <Phase2></Phase2>
    <Phase3></Phase3>
    <Phase4></Phase4>
    <Phase5></Phase5>
    <Phase6></Phase6>
    <Phase7></Phase7>
    </div>
    </>
  )
}

export default About