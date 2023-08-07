import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../Upload';
import { RxCross1 } from 'react-icons/rx';
import { createSubSectionApi, editCourseDetails, editSubSectionApi } from '../../../../../services/operations/courseAPI';
import { setCourse } from '../../../../../slices/courseSlice';
const SubSectionModal = ({modalData , setModalData , view = false , edit = false , add = false}) => {

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        if(view || edit){
            setValue("subSectionTitle",modalData.subSectionTitle);
            setValue("subSectionDescription",modalData.subSectionDescription);
            setValue("video",modalData.videoUrl);
        };
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.subSectionTitle !== modalData.subSectionTitle ||
           currentValues.subSectionDescription !== modalData.subSectionDescription ||
           currentValues.videoUrl !== modalData.videoUrl){
            return true;
        }else{
            return false;
        };
    };

    const handleSubSectionSubmit = async (data) => {
        if(view){
            return;
        }else if(edit){
            if(!isFormUpdated){
                toast.error("No changes have been made!");
            }else{
                const currentValues = getValues();
                const formData = new FormData();
                if(currentValues.subSectionTitle !== modalData.subSectionTitle){
                    formData.append("subSectionTitle",data.subSectionTitle);
                };
                if(currentValues.subSectionDescription !== modalData.subSectionDescription){
                    formData.append("subSectionDescription",data.subSectionDescription);
                };
                if(currentValues.videoUrl !== modalData.videoUrl){
                    formData.append("videoUrl",data.videoUrl);
                };
                formData.append("courseId",course._id);
                formData.append("subSectionID",modalData._id);
                const response = await editSubSectionApi(formData,token);
                console.log(response);
                dispatch(setCourse(response));
                setModalData(null);
            }
        }else{
            const courseId = course._id;
            const formData = new FormData();
            formData.append("sectionId",modalData);
            formData.append("courseId",courseId);
            formData.append("subSectionTitle",data.subSectionTitle);
            formData.append("subSectionDescription",data.subSectionDescription);
            formData.append("video",data.video);
            const response = await createSubSectionApi(formData , token);
            console.log("subsection",response);
            dispatch(setCourse(response));
            setModalData(null);
        }
    };

  return (
    <div className='absolute top-0 left-0 w-full h-full z-10 backdrop-blur'>
        <div  className=' bg-richblack-800 rounded-lg border-[1px] border-richblack-700 lg:w-[500px] top-[50%] left-[50%] mx-auto mt-20'>
            <div className='flex justify-between items-center bg-richblack-700 py-4 px-8'>
                <p>
                    {view ? "Viewing" : edit ? "Editing" : add ? "Adding" : ""} Lecture
                </p>
                <button onClick={() => setModalData(null)}>
                    <RxCross1/>
                </button>
            </div>
            <form onSubmit={handleSubmit(handleSubSectionSubmit)} className='px-10 pb-6 mt-5'>
                <div className='mb-4'>
                    <Upload
                        name={"video"}
                        label={"Lecture"}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        errors={errors}
                        video={true}
                        viewData={ view ? modalData.videoUrl : null}
                        editData={ edit ? modalData.videoUrl : null}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor="subSectionTitle"
                        className=" font-inter font-medium text-base "
                    >
                        Lecture Title <sup className=" text-pink-400 font-inter">*</sup>
                    </label>
                    <input
                        type="text"
                        name="subSectionTitle"
                        id="subSectionTitle"
                        placeholder="Lecture Title "
                        {...register("subSectionTitle", { required: true })}
                        className="w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 font-inter "
                    />
                    {errors.courseTitle && <span>This field is mandatory!</span>}
                </div>
                <div className=' mb-4'>
                    <label htmlFor='subSectionDescription' className=' font-inter font-medium text-base '>Lecture Description <sup className=' text-pink-400 font-inter'>*</sup></label>
                    <textarea
                        name='subSectionDescription'
                        id='subSectionDescription'
                        placeholder='Lecture description'
                        {...register("subSectionDescription",{required:true})}
                        className='w-full bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 font-inter pt-2'
                        rows="7"
                        cols="7"
                    />
                    {errors.whatYouWillLearn && <span>This field is mandatory!</span>}
                </div>
                <div className='flex justify-end'>
                    {
                        add ? (
                            <button
                                type='submit'
                                className='bg-yellow-50 px-5 py-3 rounded-lg shadow-ctaButtonY text-richblack-800 font-semibold'
                            >
                                Add Lecture
                            </button>
                        ) :
                        edit ? (
                            <button
                                type='submit'
                                className='bg-yellow-50 px-5 py-3 rounded-lg shadow-ctaButtonY text-richblack-800 font-semibold'
                            >
                                Edit Lecture
                            </button>
                        ) : 
                        view && (<div></div>)
                    }
                </div>
            </form>
        </div>
    </div>
  )
};

export default SubSectionModal;