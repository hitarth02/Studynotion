import React, { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constants";
import { AiFillClockCircle, AiFillCheckCircle } from "react-icons/ai";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { HiPencil } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  deleteCourseApi,
  getInstructorCourses,
} from "../../../../services/operations/courseAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { formattedDate } from "../../../../utils/dateFormatter";

const CourseTable = ({ courses, setCourses }) => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCourse = async (courseId) => {
    try {
      setLoading(true);
      await deleteCourseApi({ courseId: courseId }, token);
      const response = await getInstructorCourses(token);
      setLoading(false);
      setCourses(response);
      dispatch(setCourse(response));
      setConfirmationModal(null);
    } catch (error) {
      console.log(error);
      toast.error("cannot delete course!");
    }
  };

  return (
    <div className="font-inter text-richblack-5">
      <Table className={"my-14"}>
        <Thead>
          <Tr
            className={
              " text-richblack-50 text-left text-xl bg-richblack-800 h-[60px] border-b-[1px] border-t-[1px] border-richblack-700"
            }
          >
            <Th className={" w-[50%]"}><p className="pl-5">Courses</p></Th>
            <Th>Status</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr
              className={
                " text-left text-xl h-[80px] border-b-[1px] border-richblack-700"
              }
            >
              <Td>You have not created any course yet.</Td>
            </Tr>
          ) : (
            courses.map((course) => {
              return (
                <Tr
                  key={course._id}
                  className={
                    " text-left text-xl h-[200px] border-b-[1px] border-richblack-700"
                  }
                >
                  <Td>
                    <div className="flex gap-x-4 pr-3">
                      <img
                        src={course.courseThumbnail}
                        alt="thumbnail"
                        className=" aspect-video w-[220px] rounded-lg object-cover"
                      />
                      <div className="flex flex-col justify-between">
                        <p>{course.courseName}</p>
                        <p className=' text-sm text-richblack-200 pr-2'>{course.courseDescription.length > 40 ? `${course.courseDescription.substring(0,40)}...` : course.courseDescription}</p>
                        <p className="text-sm mb-1 text-richblack-50">
                          Created at : {formattedDate(course?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Td>

                  <Td>
                    <div>
                      {course.status === COURSE_STATUS.PUBLISHED ? (
                        <p className=" flex gap-x-2 text-yellow-500 text-sm bg-yellow-50 rounded-xl px-3 py-1 items-center w-max">
                          <AiFillCheckCircle /> <p>Published</p>
                        </p>
                      ) : (
                        <p className=" flex gap-x-2 text-pink-500 text-sm bg-pink-100 rounded-xl px-3 py-1 items-center w-max">
                          <AiFillClockCircle /> <p>Drafted</p>
                        </p>
                      )}
                    </div>
                  </Td>

                  <Td>
                    <div className=" text-richblack-50">₹ {course.coursePrice}</div>
                  </Td>

                  <Td>
                    <div className="flex gap-x-3 text-2xl">
                      <div>
                        <HiPencil
                          onClick={() =>
                            navigate(`/dashboard/edit-course/${course._id}`)
                          }
                          className="text-2xl text-richblack-100 cursor-pointer"
                        />
                      </div>
                      <div>
                        <RiDeleteBin6Line
                          onClick={() =>
                            setConfirmationModal({
                              heading: "Delete this Course?",
                              text: "Selected course will be deleted permanently.",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () => deleteCourse(course._id),
                              btn2Handler: () => setConfirmationModal(null),
                            })
                          }
                          className="text-xl text-richblack-100 cursor-pointer"
                        />
                      </div>
                    </div>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
