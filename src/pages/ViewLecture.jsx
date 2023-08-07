import React, { useState } from "react";
import LectureSidebar from "../components/core/Dashboard/Student/ViewLecture/LectureSidebar";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fullCourseDetails } from "../services/operations/categoryPageDetailsAPI";
import {
  setCompletedLectureData,
  setCourseLectureData,
  setFullCourseData,
  setTotalLectures,
} from "../slices/viewCourseSlice";
import CourseReviewModal from "../components/core/Dashboard/Student/ViewLecture/CourseReviewModal";

const ViewLecture = () => {
  const { courseId } = useParams();
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);

  const setCourseSpecificDetail = async () => {
    try {
      const response = await fullCourseDetails(courseId , token);
      console.log("this is course data full", response);
      dispatch(setFullCourseData(response?.result1));
      dispatch(setCourseLectureData(response?.result1?.courseContent));
      dispatch(setCompletedLectureData(response?.result2));
      let lectures = 0;
      response?.result1?.courseContent.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalLectures(lectures));
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(()=>{
    setCourseSpecificDetail();
    // eslint-disable-next-line
  },[]);

  return (
    <>
      <div className="relative flex w-screen max-w-full min-h-[calc(100vh-70px)]">
        <LectureSidebar setReviewModal={setReviewModal} />
        <div className=" h-[calc(100vh-70px)] flex-1 overflow-auto">
          <div className="mx-auto w-11/12 max-w-[1100px] py-10">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && (
        <CourseReviewModal setReviewModal={setReviewModal} />
      )}
    </>
  );
};

export default ViewLecture;
