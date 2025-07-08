import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

function AllTask() {
  const [userData, setUserData] = useContext(AuthContext);
  // console.log(authData.employees);
  return (
    <>
      <div className="p-5 bg-[#1c1c1c] mt-5 rounded flex flex-col gap-2 h-90 ">
        <div className="bg-red-400 px-4 py-1 flex justify-between rounded items-center">
          <p className="text-2xl w-1/5">Employ Name</p>
          <p className="text-2xl w-1/5">New Task</p>
          <p className="text-2xl w-1/5">Active Task</p>
          <p className="text-2xl w-1/5 ">Completed</p>
          <p className="text-2xl w-1/5 ">Failed</p>
        </div>
        <div className="h-[80%] overflow-auto flex flex-col gap-2 justify-center">
          {userData.map((element, index) => {
            return (
              <div key={index} className="border-1 border-amber-100 px-4 py-1 flex justify-between rounded items-center ">
                <p className="text-2xl w-1/5">{element.firstName}</p>
                <p className="text-2xl w-1/5 text-blue-600">{element.taskCount.active}</p>
                <p className="text-2xl w-1/5 text-yellow-400">{element.taskCount.newTask}</p>
                <p className="text-2xl w-1/5 text-green-400">{element.taskCount.completed}</p>
                <p className="text-2xl w-1/5 text-amber-800">{element.taskCount.failed}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AllTask;
