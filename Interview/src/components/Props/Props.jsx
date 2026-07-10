import React from "react";

function Props() {
  const data = {
    name: "Rohan",
    age: 22,
    course: "B.Tech",
    contact: "+91 5638764256",
  };

  /*-------- Parents Component -----------*/
  return (
    <div className="min-h-screen flex items-center justify-center  py-5 bg-gray-200 flex-col">
      <div className="w-full bg-indigo-300 flex items-center justify-center p-2">
      <h1 className=" text-2xl font-bold text-white">Example of Props......</h1>
      </div>
      <ChildComponent data={data} />
    </div>
  );
}

/*-------- Child Component ----------*/ 
function ChildComponent({ data }) {
  return (
    <div className="w-96 bg-gray-200 rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition duration-300 mt-10">
      {/* Header */}
      <div className="bg-indigo-200 py-8 flex flex-col items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <h1 className="text-3xl font-bold text-black mt-4">
          {data.name}
        </h1>
        <p className="text-indigo-500">Student Profile</p>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-600">👤 Name</span>
          <span>{data.name}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-600">🎂 Age</span>
          <span>{data.age}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-600">🎓 Course</span>
          <span>{data.course}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">📞 Contact</span>
          <span>{data.contact}</span>
        </div>

        <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          View Profile
        </button>
      </div>
    </div>
  );
}

export default Props;