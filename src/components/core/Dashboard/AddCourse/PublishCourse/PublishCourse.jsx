import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { resetCourseState, setCourse, setStep } from '../../../../../slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import {COURSE_STATUS} from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails, editCourseStatusDetails } from '../../../../../services/operations/courseAPI';
const PublishCourse = () => {

  const {
    setValue,
    getValues,
    register,
    handleSubmit
  } = useForm();
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("publish",true);
    };
    // eslint-disable-next-line
  },[]);

  const handleCoursePublish = async () => {
    if((course?.status === COURSE_STATUS.PUBLISHED && getValues("publish") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("publish") === false)){
        //*do nothing just return
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
        return;
    }
    //if form is updated..
    const courseStatus = getValues("publish") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    const response = await editCourseDetails({status:courseStatus,courseId:course._id}, token);
    navigate("/dashboard/my-courses");
    dispatch(resetCourseState());
  };

  const goBack = () => {
    dispatch(setStep(2));
  };


  return (
    <div className='w-[550px]'>
      <div className=' text-white font-semibold text-3xl mb-7'>
        Publish Course
      </div>
      <div>
        <form onSubmit={handleSubmit(handleCoursePublish)} className=' mb-4 bg-richblack-800 rounded-lg px-5 py-5 border-[1px] border-richblack-700'>
          <div className=' px-5 py-5'>
                  <label htmlFor='publish' className=' font-inter font-medium text-base'>
                    <input
                        type='checkbox'
                        name='publish'
                        id='publish'
                        placeholder='Course name'
                        {...register("publish")}
                        className='border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5'
                    />
                    <span className='mx-3 text-lg'>
                      Make this course public
                    </span>
                  </label>
                  <div className='font-inter text-richblack-200 mt-5'>
                    NOTE: Check the option if you want to make the course public. OtherWise keep the option unchecked to save the course as Draft.
                  </div>
              </div>

              <div className='flex gap-x-3 justify-end px-5 py-2'>
                <IconBtn
                  text={"Back"}
                  onclick={goBack}
                  active={false}
                  disabled={false}
                />
                <button
                  type='submit'
                  className=' bg-yellow-50 px-5 py-3 rounded-lg shadow-ctaButtonY text-richblack-800 font-semibold '  
                >
                  Save Changes
                </button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default PublishCourse;