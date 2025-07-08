import { useState, useEffect } from "react";
import './Phase5.css'
import { Phase5_Gsap } from "./Gsap";



const Phase5 = () => {
    Phase5_Gsap()
    const boxes = ["Box 1",
     "Box 2", "Box 3", "Box 4", "Box 5", "Box 6"];

    const [startIndex, setStartIndex] = useState(0);
    const [visibleBoxes, setVisibleBoxes] = useState(1); // Default to 1 box on small screens

    // Update the number of visible boxes based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleBoxes(2); // 1 box on phones
            } else if (window.innerWidth < 1024) {
                setVisibleBoxes(3); // 2 boxes on tablets
            } else {
                setVisibleBoxes(4); // 3 boxes on desktops
            }
        };

        // Set initial value
        handleResize();

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNext = () => {
        if (startIndex + 1 < boxes.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex - 1 >= 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div className="phase5-main-container flex items-center justify-center   ">
            {/* Previous Button */}
            <button
                className=" button-box1  border-none   cursor-pointer text-base text-white rounded-full  bg-gray-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center"
                onClick={handlePrev}
                disabled={startIndex === 0}
            >
                ◀️
            </button>

            {/* Carousel Boxes */}
            <div className=" carousel-boxes ">
                {boxes
                    .slice(startIndex, startIndex + visibleBoxes)
                    .map((box, index) => (
                        <div
                            key={index}
                            className="carousel-box  flex items-center justify-center w-full h-60 text-lg font-bold rounded-lg bg-[#55aec4]"
                        >
                            {box}
                        </div>
                    ))}
            </div>

            {/* Next Button */}
            <button
                className=" button-box1  border-none cursor-pointer text-base text-white rounded-full  bg-gray-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center"
                onClick={handleNext}
                disabled={startIndex + visibleBoxes >= boxes.length}
            >
                ▶️
            </button>
        </div>
    );
};

export default Phase5;