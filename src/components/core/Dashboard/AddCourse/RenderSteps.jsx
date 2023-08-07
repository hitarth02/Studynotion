import React from 'react';
import { useSelector } from 'react-redux';
import {MdDone} from 'react-icons/md';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {

    const {step} = useSelector((state)=> state.course);
    const steps = [
        {
            id:1,
            title:"Course information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        },
    ]
  return (
    <div className=''>
        <div className='flex gap-x-8 items-center mb-12'>
            {
                steps.map( (ele , i) => {
                    return(
                        <>
                        <div key={ele.id}>
                            <div className={` ${step === ele.id ? " text-yellow-50 border-yellow-50 border-[1px]":"text-richblack-200 bg-richblack-600 border-richblack-200 border-[1px]"} w-[35px] h-[35px] flex justify-center items-center rounded-full ${step > ele.id && " text-xl bg-yellow-100 border-yellow-100 text-richblack-900 border-0"} `}>
                                <div>
                                    {
                                        step > ele.id ? (<MdDone/>):(<p>{ele.id}</p>)
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            ele.id !== steps.length && (
                                <div className={` w-40 h-[1px] border-[1px] border-dashed border-richblack-600 scale-125 ${step > ele.id && " hidden"}`}>
                                    
                                </div>
                            )
                        }
                        {
                            step > ele.id && (
                                <div className='w-40 h-[1px] border-[1px] border-dashed border-yellow-100 scale-125'>
                                    
                                </div>
                            )
                        }
                        </>
                    )
                })
            }
        </div>

        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <PublishCourse/>}

    </div>
  )
}

export default RenderSteps;