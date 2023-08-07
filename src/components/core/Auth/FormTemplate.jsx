import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Frame from '../../../assets/Images/frame.png';

const Template = ({heading , subHeading , subHeadingHighlight , formType , accountType , image}) => {
  return (
    <div className=' bg-richblack-900 text-white  lg:overflow-hidden'>
      <div className='flex flex-col-reverse lg:flex-row sm:flex-col-reverse justify-around w-11/12  lg:w-10/12 mx-auto mt-20'>

        <div className='lg:w-[28%] sm:w-full'>

          <div className='mt-8'>
            <div className=' font-inter text-4xl font-semibold mb-4'>{heading}</div>
            <div className=' font-inter text-lg'>
              {subHeading}
              <i className=' font-edu-sa text-blue-100 font-bold'>{subHeadingHighlight}</i>
            </div>
          </div>

          <div>
            {formType === "login" ? (<LoginForm/>) : (<SignupForm accountType={accountType}/>)}
          </div>

        </div>

        <div className='flex'>
          <div className='absolute z-10'>
            <img className='w-auto' src={image} alt='formImg'/>
          </div>
          <div className=' relative top-5 left-5'>
            <img src={Frame} alt='frameImg' loading='lazy'/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Template;