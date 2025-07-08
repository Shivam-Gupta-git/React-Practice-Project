
import React, { useState } from "react";
import data from "./Data";

function Index() {
  const [selected, setSelected] = useState(null);

  const handelSingleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  return (
    <>
      <div className="w-screen h-full mt-10 flex items-center justify-center flex-col">
  
        <h1 className="bg-gray-600 text-white p-2 rounded-xl">SINGLE SELECTION ACCORDION</h1>
        <div className="w-[80%] p-10 ">
          {data && data.length > 0 ? (
            data.map((dataItem, Index) => (
              <div
                key={Index}
                className="border-2 flex flex-col justify-center items-start py-2 px-3  mt-3 rounded-2xl bg-gray-400 "
              >
                <div
                  className="flex justify-between w-[100%] cursor-pointer "
                  onClick={() => handelSingleSingleSelection(dataItem.id)} 
                >
                  
                  <h1 className=" text-blue-700 ">
                    Q: {dataItem.question}
                  </h1>
                  {selected === dataItem.id ? 
                  <span className=" bg-red-600 rounded p-2 flex justify-center items-center text-white text-xl h-[30px]">
                    +
                  </span>
                  :
                  <span className=" bg-gray-600 rounded p-2 flex justify-center items-center text-white text-xl h-[30px]">
                  +
                </span>
                  }
                </div>
                {selected === dataItem.id ? (
                  <div className="bg-red-500 p-2 rounded mt-1">Ans: {dataItem.answer}</div>
                ) : null}
              </div>
            ))
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
