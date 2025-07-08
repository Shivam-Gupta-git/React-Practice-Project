import React from "react";
import Header from "../Others/Header";
import CreateTast from "../Others/CreateTast";
import AllTask from "../Others/AllTask";

function AdminDashboard({setUser}) {
  return (
    <div className="h-full flex-wrap w-full p-5  bg-black text-white">
      <Header setUser = {setUser}></Header>
      <CreateTast></CreateTast>
      <AllTask></AllTask>
    </div>
  );
}

export default AdminDashboard;
