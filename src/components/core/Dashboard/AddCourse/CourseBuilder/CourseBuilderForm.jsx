import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import Section from "./Section";
import IconBtn from "../../../../common/IconBtn";
import { createSectionApi, updateSectionApi } from "../../../../../services/operations/courseAPI";

const CourseBuilderForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {token} = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [editSectionName, setEditSectionName] = useState(null);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
    return;
  };

  const goBack = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please create atleast 1 section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast 1 lecture");
      return;
    }
    dispatch(setStep(3));
  };

  const sectionSubmitHandler = async (data) => {
    try {
      const courseId = course._id;
      if(editSectionName){
        const response = await updateSectionApi({
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: courseId
        }, token );
        dispatch(setCourse(response));
        console.log(response);
        toast.success("Section edited successfully!");
        setEditSectionName(null);
        setValue("sectionName","");
      }else{
        const response = await createSectionApi({
          sectionName:data.sectionName,
          courseID:course._id
        }, token);
        dispatch(setCourse(response));
        console.log(response);
        toast.success("Section added successfully!");
        setValue("sectionName","");
      }
    } catch (error) {
      console.log(error);
      toast.error("Submit handler error");
    };
  };

  const handleChangeEditSectionName = (sectionId , sectionName) => {

    if(editSectionName === sectionId){
      cancelEdit();
    };
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  };

  return (
    <div className=" text-richblack-5 font-inter">
      <div className="text-3xl font-inter text-richblack-5 font-semibold mb-6">
        Course Builder
      </div>

      <div className=" bg-richblack-800 border-[1px] border-richblack-700 rounded-lg px-8 py-10 font-inter">
        <form onSubmit={handleSubmit(sectionSubmitHandler)}>
          <div className=" mb-4">
            <label
              htmlFor="sectionName"
              className=" font-inter font-medium text-base "
            >
              Section Name <sup className=" text-pink-400 font-inter">*</sup>
            </label>
            <input
              type="text"
              name="sectionName"
              id="sectionName"
              placeholder="Section name"
              {...register("sectionName", { required: true })}
              className="w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 font-inter "
            />
            {errors.courseTitle && <span>This field is mandatory!</span>}
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="flex gap-x-2 text-yellow-100 px-4 py-2 bg-transparent border-[1px] border-yellow-50 items-center rounded-lg"
            >
              {editSectionName ? "Edit section name" : "Create Section"}{" "}
              <BsPlusCircle />
            </button>
            {editSectionName && (
              <button
                onClick={cancelEdit}
                className=" bg-transparent border-none text-richblack-300 underline text-sm mx-3 pb-[2px]"
              >
                cancel edit
              </button>
            )}
          </div>
        </form>
        {course?.courseContent.length > 0 && <Section handleChangeEditSectionName={handleChangeEditSectionName} />}
        {
          <div className="flex justify-end gap-x-4 mt-6">
            <IconBtn
              text={"Back"}
              onclick={goBack}
              active={false}
              disabled={false}
            />
            <button
              onClick={goToNext}
              className=' bg-yellow-50 px-5 py-3 rounded-lg shadow-ctaButtonY text-richblack-800 font-semibold '  
            >
              Next
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default CourseBuilderForm;
