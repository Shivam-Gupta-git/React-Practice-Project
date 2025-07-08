import React from 'react'
import { AiFillAmazonCircle } from "react-icons/ai";
import { SiFlipkart } from "react-icons/si";


function HeroSection() {
  return (
    // Containers.......
    <div className='Hero-Container'>
      <div className="info-container">
        <h1>YOUR FEET DESERVE THE BEST</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error veritatis aperiam, ea nemo sapiente sequi non, repellendus, hic nam in cumque. Tempore, nihil soluta? Eveniet nisi, molestias velit beatae deleniti numquam ea corrupti pariatur modi quibusdam non nobis eum.</p>
        <div className="button-container">
          <button className='Shop-nao-btn'>Shop Now</button>
          <button className='Category-btn'>Category</button>
          </div>
          <p className='Abailable-tag'>Also Abailable On</p>
          <div className='marketing-logo-box'>
            <div className='flipkart-logo'>
            <SiFlipkart className='flipkart-icon'/>
            </div>
            <div className='amazon-logo'>
            <AiFillAmazonCircle  className='amazon-icon'/>
            </div>
          </div>
      
      </div>
      <div className="picture-container"></div>
    </div>
  )
}

export default HeroSection