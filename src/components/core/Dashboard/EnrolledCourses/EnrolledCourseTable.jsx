import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const EnrolledCourseTable = ({enrolledCourses}) => {

  const navigate = useNavigate();
  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  return (
    <div>
      <Table className={"my-14 border-[1px] border-richblack-600 rounded-lg"}>
        <Thead>
          <Tr
            className={
              " text-left text-base h-[40px] border-b-[1px] border-t-[1px] border-richblack-700 font-normal bg-richblack-800"
            }
          >
            <Th className={" w-[50%]"}><p className="pl-3 font-normal">Courses</p></Th>
            <Th><p className=" font-normal">Duration</p></Th>
            <Th></Th>
            <Th><p className="font-normal">Progress</p></Th>
          </Tr>
        </Thead>
        <Tbody>
          {enrolledCourses.length === 0 ? (
            <Tr
              className={
                " text-left text-xl h-[80px] border-b-[1px] border-richblack-700"
              }
            >
              <Td>You have not created any course yet.</Td>
            </Tr>
          ) : (
            enrolledCourses.map((course) => {

                const fullDesc = course.courseDescription;
                const description = fullDesc.length > 20 ? `${fullDesc.substring(0,20)}...` : fullDesc;
                console.log("secid",course);
              return (
                <Tr
                  key={course._id}
                  className={
                    " text-left text-xl h-max border-b-[1px] border-richblack-700"
                  }
                >
                  <Td>
                    
                      <div onClick={() => {
                        navigate(`/view-lecture/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
                      }} className="flex gap-x-4 py-4 pl-3 cursor-pointer">
                        <img
                          src={course.courseThumbnail}
                          alt="thumbnail"
                          className=" h-[60px] aspect-square rounded-lg object-cover"
                        />
                        <div className="flex flex-col justify-center">
                          <p>{course.courseName}</p>
                          <p className=" text-base text-richblack-200">
                            {description}
                          </p>
                        </div>
                      </div>

                  </Td>

                  <Td>
                    <div className=" text-base">{course.totalDuration}</div>
                  </Td>

                  <Td>

                  </Td>

                  <Td>
                    <div className="flex gap-x-3 items-center">
                      <ProgressBar
                          completed={course.progressPercentage || 0}
                          height="10px"
                          width="140px"
                          borderRadius="4px"
                          bgColor={getRandomColors(1)}
                          baseBgColor="#6E727F"
                          isLabelVisible={false}
                      />
                      <p className=" text-base text-richblack-5">{course.progressPercentage || 0}%</p>
                    </div>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default EnrolledCourseTable;
