import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { instructorStats } from "../../../../services/operations/profileAPI";
import { getInstructorCourses } from "../../../../services/operations/courseAPI";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../common/Spinner";
import InstructorChart from "./InstructorChart";

const InstructorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [instructorStatistics, setInstructorStatistics] = useState();
  const [instructorCourses, setInstructorCourses] = useState();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const fetchInstructorStats = async () => {
    try {
      setLoading(true);
      const result = await instructorStats(token);
      setInstructorStatistics(result);
      console.log(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInstructorCourses = async () => {
    try {
      setLoading(true);
      const result = await getInstructorCourses(token);
      setInstructorCourses(result);
      console.log(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInstructorCourses();
    fetchInstructorStats();
    // eslint-disable-next-line
  }, []);

  const latestCourses = instructorCourses?.slice(0, 3);
  const totalAmount = instructorStatistics?.reduce(
    (acc, curr) => acc + curr.totalIncome,
    0
  );
  const totalStudents = instructorStatistics?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className=" font-inter">
      <div className=" text-richblack-100 mb-4">
        Home / <span className=" text-yellow-50">Dashboard</span>
      </div>
      <div>
        <div className=" text-white text-3xl font-semibold mb-1">
          HELLO , {user.firstName} 👋🏻
        </div>
        <p className=" text-richblack-100 mb-8">Let's start something new.</p>
      </div>
      <div className="w-full flex gap-x-6">
        <div className=" bg-richblack-800 rounded-lg w-[70%] max-h-full px-10 py-8">
            <InstructorChart courses={instructorStatistics}/>
        </div>
        <div className="bg-richblack-800 rounded-lg max-h-full w-[30%] px-10 py-8 flex flex-col gap-5 text-white">
          <p className=" text-3xl font-semibold mb-2">Statistics</p>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <p className=" text-base text-richblack-100">Total Courses :</p>
                <p className=" text-2xl font-semibold">
                  {instructorCourses?.length}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className=" text-base text-richblack-100">
                  Total Students :
                </p>
                <p className=" text-2xl font-semibold">{totalStudents}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className=" text-base text-richblack-100">Total Income :</p>
                <p className=" text-2xl font-semibold">Rs. {totalAmount}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className=" bg-richblack-800 rounded-lg h-max mt-6 px-10 py-8">
        <div className=" flex justify-between mb-4">
          <p className=" text-2xl text-white">Your Courses</p>
          <p
            onClick={() => navigate("/dashboard/my-courses")}
            className=" text-yellow-50 cursor-pointer"
          >
            View more
          </p>
        </div>
        <div className="flex gap-x-8">
          {loading ? (
            <Spinner />
          ) : (
            latestCourses?.map((course) => {
              return (
                <div>
                  <img
                    src={course.courseThumbnail}
                    className=" w-[290px] aspect-video rounded-lg"
                  />
                  <div className=" font-inter text-white my-2">
                    <p className=" text-xl mb-1">{course.courseName}</p>
                    <p className=" text-sm text-richblack-100">
                      {course.studentsEnrolled.length} Students | Rs.{" "}
                      {course.coursePrice}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
