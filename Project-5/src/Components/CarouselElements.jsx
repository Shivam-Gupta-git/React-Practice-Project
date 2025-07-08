import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const images = [
  {
    src: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://example.com/page1"
  },
  {
    src: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://example.com/page2"
  },
  {
    src: "https://images.pexels.com/photos/2563129/pexels-photo-2563129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://example.com/page3"
  },
  {
    src: "https://images.pexels.com/photos/3025005/pexels-photo-3025005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://example.com/page4"
  },
  {
    src: "https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://example.com/page5"
  }
];

function CarouselElements() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (hovering) return; // Pause when hovering
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, hovering]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button onClick={prevSlide} className="pre-btn"><FaArrowLeft /></button>
      
      <a href={images[currentIndex].link} target="_blank" rel="noopener noreferrer">
  <img
    src={images[currentIndex].src}
    alt={`slide ${currentIndex + 1}`}
    className="fade-image"
  />
</a>
      
      <button onClick={nextSlide} className="next-btn"><FaArrowRight /></button>

      <div className="dots-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default CarouselElements;