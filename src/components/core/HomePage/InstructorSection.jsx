import React from 'react';
import instructorImage from '../../../assets/Images/Instructor.png'
import HighlightedText from './HighlightedText';
import CTAButton from '../../common/CTAButton';
import { FaArrowRight } from 'react-icons/fa';

const InstructorSection = () => {
  return (
    <div>
        <div className='w-10/12 flex justify-around mx-auto bg-richblack-900'>
            <div className='w-[40%]'>
                <img src={instructorImage} alt='Instructor' width={"600px"} className='drop-shadow-xl shadow-white' loading='lazy'/>
            </div>
            <div className='flex flex-col w-[40%]'>
                <div className='w-[80%] h-[90%] flex flex-col justify-center items-start'>
                    <div className='font-inter font-semibold text-4xl text-white'>
                        Become an <br/> <HighlightedText text={"Instructor"}/>
                    </div>
                    <div className='text-richblack-200 font-inter mt-6 mb-14 '>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>
                    <div className='flex justify-center'>
                        <CTAButton active={true} width={"137px"} shadow={true}>
                            <div className='flex items-center gap-2'>
                                <div>Start teaching today</div>
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection