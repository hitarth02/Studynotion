import React, { useEffect, useState } from "react";
import RenderSteps from "../RenderSteps";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse } from "../../../../../slices/courseSlice";
import { useParams } from "react-router-dom";
import { fullCourseDetails, fullCourseDetailsInstructor } from "../../../../../services/operations/categoryPageDetailsAPI";
import Spinner from "../../../../common/Spinner";

const EditCourse = () => {
  
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading , setloading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getFullCourseDetails = async () => {
    try {
      setloading(true);
      const response = await fullCourseDetailsInstructor(courseId , token);
      console.log(response);
      dispatch(setCourse(response?.result1));
      dispatch(setEditCourse(true));
      setloading(false);
    } catch (error) {
      console.log(error);
    };
  };

  const courseEdit = () => {
    try {
      getFullCourseDetails();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    courseEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className=" text-richblack-100 mb-4">
        Home / Dashboard / <span className=" text-yellow-50">Edit Course</span>
      </div>

      <div className=" text-richblack-5 font-inter flex gap-x-10">
        <div>
          <h2 className=" text-3xl font-semibold mb-6">Edit Course</h2>
          <div>
            {
              loading ? (<Spinner/>) : (course && <RenderSteps />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
