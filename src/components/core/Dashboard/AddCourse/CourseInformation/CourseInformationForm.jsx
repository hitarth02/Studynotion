import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, editCourseDetails, getAllCategories } from '../../../../../services/operations/courseAPI';
import ChipInput from './ChipInput';
import Upload from '../Upload';
import RequirementInformation from './RequirementInformation';
import {setCourse, setStep} from '../../../../../slices/courseSlice';
import Spinner from '../../../../common/Spinner';

const CourseInformationForm = () => {

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors},
    } = useForm();

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {course , editCourse} = useSelector((state) => state.course);
    if(editCourse){
        console.log(course?.courseThumbnail)
    }
    const [loading , setLoading] = useState(false);
    const [categories , setCategories] = useState([]);

    const fetchCategories = async() => {
        setLoading(true);
        try {
            const response = await getAllCategories();
            if(response.length > 0){
                setCategories(response);
            };
        } catch (error) {
            console.log(error);
        };
        setLoading(false);
    };

    // if(editCourse){
    //     setValue("CourseThumbnail",course?.courseThumbnail);
    // };

    useEffect(()=>{
        fetchCategories();

        if(editCourse){
            setValue("courseName" , course?.courseName);
            setValue("courseDescription" , course?.courseDescription);
            setValue("whatYouWillLearn" , course?.whatYouWillLearn);
            setValue("coursePrice" , course?.coursePrice);
            setValue("courseThumbnail" , course?.courseThumbnail);
            setValue("tags" , course?.tags);
            setValue("category" , course?.category);
            setValue("instructions" , course?.instructions);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if(currentValues.courseName !== course.courseName ||
          currentValues.courseDescription !== course.courseDescription ||
          currentValues.coursePrice !== course.coursePrice ||
          currentValues.courseThumbnail !== course.courseThumbnail ||
          currentValues.tags.toString() !== course.tags.toString() ||
          currentValues.category !== course.category ||
          currentValues.whatYouWillLearn.toString() !== course.whatYouWillLearn.toString() ||
          currentValues.instructions.toString() !== course.instructions.toString() ){
          return true
        }else {
          return false
        };
            
    }

    let courseId;
    course !== null && ( courseId = course._id);

    const submitFormHandler = async (data) => {

        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();
                if(currentValues.courseName !== course.courseName){
                    formData.append("courseName", data.courseName);
                };
                if(currentValues.courseDescription !== course.courseDescription){
                    formData.append("courseDescription", data.courseDescription);
                };
                if(currentValues.coursePrice !== course.coursePrice){
                    formData.append("coursePrice", data.coursePrice);
                };
                if(currentValues.courseThumbnail !== course.courseThumbnail){
                    formData.append("courseThumbnail", data.courseThumbnail);
                };
                if(currentValues.tags.toString() !== course.tags.toString()){
                    formData.append("tags", JSON.stringify(data.tags));
                };
                if(currentValues.category !== course.category){
                    formData.append("category", data.category);
                };
                if(currentValues.whatYouWillLearn !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", JSON.stringify(data.whatYouWillLearn));
                };
                if(currentValues.instructions.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.instructions));
                };

                setLoading(true);
                const result = await editCourseDetails({courseId:courseId , formData} , token );
                setLoading(false);
                if(result){
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                };
            };
            return;
        };

        const formData = new FormData();

        formData.append("courseName", data.courseName);
        formData.append("courseDescription", data.courseDescription);
        formData.append("coursePrice", data.coursePrice);
        formData.append("courseThumbnail", data.courseThumbnail);
        formData.append("tags", JSON.stringify(data.tags));
        formData.append("category", data.category);
        formData.append("whatYouWillLearn", JSON.stringify(data.whatYouWillLearn));
        formData.append("instructions", JSON.stringify(data.instructions));

        setLoading(true);
        const result = await createCourse(formData , token);
        setLoading(false);

        if(result){
            dispatch(setCourse(result));
            dispatch(setStep(2));
        };
    };

  return (
    <div>
        {/* Page Title */}
        <div className=' text-3xl font-inter text-richblack-5 font-semibold mb-6'>
            Course Information
        </div>

        {/* Course information form */}
        {loading ? (<Spinner/>):
            (<form onSubmit={handleSubmit(submitFormHandler)} className=' bg-richblack-800 border-[1px] border-richblack-700 rounded-lg px-8 py-10 font-inter'>
            <div className=' mb-4'>
                <label htmlFor='courseName' className=' font-inter font-medium text-base '>Course Title <sup className=' text-pink-400 font-inter'>*</sup></label>
                <input
                    type='text'
                    name='courseName'
                    id='courseName'
                    placeholder='Course name'
                    {...register("courseName",{required:true})}
                    className='w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 font-inter '
                />
                {errors.courseTitle && <span>This field is mandatory!</span>}
            </div>

            <div className=' mb-4'>
                <label htmlFor='courseDescription' className=' font-inter font-medium text-base '>Course Short Description <sup className=' text-pink-400 font-inter'>*</sup></label>
                <textarea
                    name='courseDescription'
                    id='courseDescription'
                    placeholder='Course Description'
                    {...register("courseDescription",{required:true})}
                    className='w-full bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 pt-2 font-inter'
                    rows="7"
                    cols="7"
                />
                {errors.courseTitle && <span>This field is mandatory!</span>}
            </div>
            
            <div className=' mb-4'>
                <label htmlFor='coursePrice' className=' font-inter font-medium text-base flex items-center gap-x-1'>Course Price <sup className=' text-pink-400 font-inter'>*</sup> <p className=' text-xs text-richblack-400'>in Rupees</p></label>
                <input
                    type='number'
                    name='coursePrice'
                    id='coursePrice'
                    placeholder='Course Price'
                    {...register("coursePrice",{required:true})}
                    className='w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 font-inter '
                />
                {errors.courseTitle && <span>This field is mandatory!</span>}
            </div>

            <div className=' mb-4'>
                <label htmlFor='category' className=' font-inter font-medium text-base '>Category <sup className=' text-pink-400 font-inter'>*</sup></label>
                <select
                    name='category'
                    id='category'
                    defaultValue=""
                    {...register("category",{required:true})}
                    className="bg-richblack-700 h-[48px] rounded-lg shadow-inputShadow px-[14px] text-left my-1 w-full"    
                >
                    <option value="" disabled className=' text-richblack-300'>Choose a Category</option>
                    {
                        categories.map((ele , i) => {
                            return(
                                <option key={i} value={ele._id}>
                                    {ele?.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <ChipInput
                name={"tags"}
                label={"Tags"}
                placeholder={"Press enter key or , after single tag"}
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />

            {/* <div className=' mb-4'>
                <label htmlFor='whatYouWillLearn' className=' font-inter font-medium text-base '>Course Benifits <sup className=' text-pink-400 font-inter'>*</sup></label>
                <textarea
                    name='whatYouWillLearn'
                    id='whatYouWillLearn'
                    placeholder='Course benifits'
                    {...register("whatYouWillLearn",{required:true})}
                    className='w-full bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 font-inter pt-2'
                    rows="7"
                    cols="7"
                />
                {errors.whatYouWillLearn && <span>This field is mandatory!</span>}
            </div> */}

            <RequirementInformation
                name={"whatYouWillLearn"}
                label={"What you will learn"}
                setValue={setValue}
                getValues={getValues}
                register={register}
                errors={errors}
            />

            <Upload
                name="courseThumbnail"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
                editData={editCourse ? course?.courseThumbnail : null}
            />

            <RequirementInformation
                name={"instructions"}
                label={"Requirement/Instructions"}
                setValue={setValue}
                getValues={getValues}
                register={register}
                errors={errors}
            />

            <div className='flex w-[100%] justify-end my-2 gap-x-4'>
                {
                    editCourse && (<button className=' border-none bg-richblack-700 px-5 py-2 text-yellow-100 rounded-lg' onClick={() => dispatch(setStep(2))}>Continue without Saving</button>)
                }
                <button type='submit' className=' bg-yellow-50 px-5 py-2 rounded-lg shadow-ctaButtonY text-richblack-800 font-semibold '>
                    {!editCourse ? "Next" : "Save changes"}
                </button>
            </div>

        </form>)
        }
    </div>
  )
}

export default CourseInformationForm;