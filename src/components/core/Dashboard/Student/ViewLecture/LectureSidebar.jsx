import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { AiOutlineStar } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { toast } from "react-hot-toast";

const LectureSidebar = ({ setReviewModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sectionActive, setSectionActive] = useState(null);
  const [lectureActive, setLectureActive] = useState(null);
  const { sectionId, subSectionId } = useParams();

  const {
    courseLectureData,
    completedLectureData,
    fullCourseData,
    totalLectures,
  } = useSelector((state) => state.viewCourse);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!fullCourseData) {
        return;
      }
      const currentSectionIndex = courseLectureData?.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseLectureData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseLectureData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      setLectureActive(activeSubSectionId);
      setSectionActive(courseLectureData?.[currentSectionIndex]?._id);
    };
    setActiveFlags();
  }, [location.pathname, courseLectureData, fullCourseData]);

  console.log(fullCourseData);
  console.log("COMPLETED LEC DATA",completedLectureData);

  // const openReviewModal = () => {
  //   if (fullCourseData?.ratingAndreviews.fil) {
  //     toast.error("You have already reviewed the course!");
  //     return;
  //   }else{
      
  //   };
  // };

  return (
    <div className=" w-[14%] h-[calc(100vh-70px)] bg-richblack-800 text-white flex flex-col justify-between">
      <div>
        <div className="ml-4 border-b border-richblack-600 mr-4 pt-2">
          <p className=" text-white text-2xl py-1">
            {fullCourseData?.courseName}
          </p>
          <p className=" text-richblack-100 pb-1">
            {completedLectureData?.length ? completedLectureData?.length : 0}/
            {totalLectures}
          </p>
        </div>

        <div className="text-lg mt-5">
          {fullCourseData?.courseContent.map((section , index) => {
            return (
              <>
                <div>
                  <details
                    open={index === 0}
                    onClick={() => setSectionActive(section?._id)}
                    className="flex flex-col"
                  >
                    <summary className="bg-richblack-700 py-3 mb-4 pl-4 flex justify-between pr-4 items-center cursor-pointer border-b border-richblack-600">
                      {section.sectionName}
                      <MdOutlineKeyboardArrowDown className=" text-lg" />
                    </summary>

                    <div>
                      {section?.subSection.map((lecture) => {
                        return (
                          // sectionActive === section?._id || (
                          <div
                            className={`${
                              lectureActive === lecture._id
                                ? "bg-yellow-50 text-richblack-900 py-1 "
                                : "bg-richblack-800"
                            } py-3 mb-2`}
                          >
                            {completedLectureData?.includes(lecture._id) ? (
                              <div 
                              onClick={() =>
                                navigate(
                                  `/view-lecture/${fullCourseData?._id}/section/${section?._id}/sub-section/${lecture?._id}`
                                )
                              }
                                className={` flex gap-2 items-center cursor-pointer text-base pl-4 pr-4  ${lectureActive === lecture._id
                                  ? " text-richblack-900"
                                  : "text-richblack-200"}`}
                              >
                                <ImCheckboxChecked />
                                <p className=" line-through">
                                  {lecture.subSectionTitle}
                                </p>
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  navigate(
                                    `/view-lecture/${fullCourseData?._id}/section/${section?._id}/sub-section/${lecture?._id}`
                                  )
                                }
                                className={` flex gap-2 items-center cursor-pointer text-base pl-4 pr-4`}
                              >
                                {lectureActive === lecture._id ? (
                                  <FaPlay className=" text-blue-400" />
                                ) : (
                                  <ImCheckboxUnchecked />
                                )}
                                {lecture.subSectionTitle}
                              </div>
                             )} 
                          </div>
                        );
                        
                      })}
                    </div>
                  </details>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div>
        <div
          onClick={() => setReviewModal(true)}
          className=" bg-yellow-50 rounded-lg mb-3 text-richblack-900 flex gap-x-2 items-center py-3 text-lg px-4 mx-4 cursor-pointer"
        >
          <AiOutlineStar />
          <p>Add review</p>
        </div>
        <div
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className=" mb-4 border-t border-richblack-600 pb-2 mt-2 flex gap-x-2 py-3 text-center mr-4 ml-4 items-center text-richblack-50 cursor-pointer text-lg"
        >
          <BsArrowLeft className=" pl-1 text-2xl" />
          <p>Go back to Courses</p>
        </div>
      </div>
    </div>
  );
};

export default LectureSidebar;
