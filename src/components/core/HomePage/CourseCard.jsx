import React from 'react';
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({course , currentCard , setCurrentCard}) => {
  return (
    <div className={`w-[360px] lg:w-[30%]  ${currentCard === course?.heading ?
    "bg-white shadow-yellow-50 shadow-[12px_12px_0_0] "
    :
    "bg-richblack-800 "}text-richblack-25 h-[300px] box-border cursor-pointer`}
    onClick={()=> setCurrentCard(course?.heading)}>

    <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            currentCard === course?.heading ? "text-richblack-800":"text-richblack-5"
          } font-semibold text-[20px]`}
        >
          {course?.heading}
        </div>

        <div className="text-richblack-400">{course?.description}</div>
    </div>

    <div
        className={`flex justify-between ${
          currentCard === course?.heading ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{course?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{course?.lessionNumber} Lession</p>
        </div>
      </div>

    </div>
  )
}

export default CourseCard