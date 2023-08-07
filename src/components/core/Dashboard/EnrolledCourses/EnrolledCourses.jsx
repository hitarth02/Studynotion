import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import Spinner from "../../../common/Spinner";
import { getUserEnrolledCourses } from "../../../../services/operations/profileAPI";
import EnrolledCourseTable from "./EnrolledCourseTable";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const paths = location.pathname.split("/");
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div>
      <div className=" text-richblack-100 mb-4">
        Home / {paths[1]} /{" "}
        <span className={` text-yellow-50`}>{paths[2]}</span>
      </div>
      <div>
        <div className=" font-inter text-3xl font-semibold text-richblack-5 mb-3">
          Enrolled Courses
        </div>

        {enrolledCourses && (
          <div className=" text-richblack-200 flex gap-x-1 border-b-[1px] border-richblack-600 pb-2">
            {enrolledCourses.length}{" "}
            {enrolledCourses.length <= 1 ? <p>Course</p> : <p>Courses</p>}
          </div>
          
        )}

        <div className=" text-richblack-5">
          {!enrolledCourses ? (
            <Spinner />
          ) : (
            <div>
              {enrolledCourses.length === 0 ? (
                <div className=" text-center mt-12 text-richblack-200">
                  You have not enrolled in any courses yet
                </div>
              ) : (
                <EnrolledCourseTable enrolledCourses={enrolledCourses} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;
