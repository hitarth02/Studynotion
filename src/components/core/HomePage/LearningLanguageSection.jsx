import React from 'react';
import HighlightedText from './HighlightedText';
import CTAButton from '../../common/CTAButton';
import languageImage1 from '../../../assets/Images/Compare_with_others.png';
import languageImage2 from '../../../assets/Images/Know_your_progress.png';
import languageImage3 from '../../../assets/Images/Plan_your_lessons.png';

const LearningLanguageSection = () => {
  return (
    <div className='mt-[200px] mb-[100px]'>
        <div className='flex flex-col w-10/12 mx-auto justify-center '>
            <div className='flex flex-col items-center'>
                <div className='text-center font-inter text-4xl font-semibold'>
                Your swiss knife for <HighlightedText text={"learning any language."}/>
                </div>
                <div className='flex text-center font-inter w-[50%]'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>

            <div className='lg:flex justify-center mt-6 mb-6'>
                
                <img src={languageImage2} alt='learningImg'
                    className='-mr-32 object-contain'
                    loading='lazy'
                />
                
                <img src={languageImage1} alt='learningImg'
                    className=' object-contain'
                    loading='lazy'
                />
                
                <img src={languageImage3} alt='learningImg'
                    className='-ml-36 object-contain'
                    loading='lazy'
                />
                
            </div>

            <div className='flex items-center justify-center text-richblack-700 '>
                <CTAButton active={true} linkTo={"/login"} width={"137px"}>Learn more</CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection