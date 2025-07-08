import React from "react";
import data from "./Data";
import { useState } from "react";

function MultiSelectionAccordian() {
  const [selection, setSelection] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  // console.log(enableMultiSelection)
  const [multiple, setMultiple] = useState([]);

  const handelSingleSelection = (getSelectionId) => {
    setSelection(getSelectionId === selection ? null : getSelectionId);
  };
  const handelMultiSelection = (getSelectionId) => {
    let copyMultiple = [...multiple];
    const findIndexOFCurrentId = copyMultiple.indexOf(getSelectionId);
    //  console.log(findIndexOFCurrentId)
    if (findIndexOFCurrentId === -1) {
      copyMultiple.push(getSelectionId);
    } else {
      copyMultiple.splice(findIndexOFCurrentId, 1);
    }
    setMultiple(copyMultiple);
  };
  // console.log(selection, multiple)

  return (
    <div className="h-full w-[100%] flex flex-col justify-center items-center ">
      <h3 className=" bg-green-200 p-2 rounded mt-5">
        Multi Selection Accordition
      </h3>
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {enableMultiSelection === true ? (
          <p className="bg-red-600 p-2 rounded text-white">On MultiSelection</p>
        ) : (
          <p className="bg-yellow-400 text-black p-2 rounded">
            Off MultiSelection
          </p>
        )}
      </button>
      <div className=" w-[80%] ">
        {data && data.length > 0 ? (
          data.map((dataItems, index) => (
            <div
              key={index}
              onClick={
                enableMultiSelection
                  ? () => handelMultiSelection(dataItems.id)
                  : () => handelSingleSelection(dataItems.id)
              }
              className="border-1 flex flex-col bg-gray-400 mt-3 rounded-xl py-1 px-3 cursor-pointer"
            >
              {selection === dataItems.id || enableMultiSelection ? (
                <div className="flex items-center justify-between gap-3">
                  <p className=" text-blue-600">Q: {dataItems.question}</p>
                  <span className="bg-red-500 h-[30px] p-2 flex items-center text-white text-xl rounded ">
                    +
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <p className=" text-blue-600">Q: {dataItems.question}</p>
                  <span className="bg-gray-500 h-[30px] p-2 flex items-center text-white text-xl rounded ">
                    +
                  </span>
                </div>
              )}
              <div>
                {enableMultiSelection
                  ? multiple.indexOf(dataItems.id) !== -1 && (
                      <div>Ans: {dataItems.answer}</div>
                    )
                  : selection === dataItems.id && (
                      <div>Ans: {dataItems.answer}</div>
                    )}
              </div>
            </div>
          ))
        ) : (
          <div>File can be Empty</div>
        )}
      </div>
    </div>
  );
}

export default MultiSelectionAccordian;
