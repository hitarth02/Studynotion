import React from 'react'
import CTAButton from '../components/common/CTAButton'

const Error = () => {
  return (
    <div className='w-screen h-[75vh] justify-between items-center flex flex-col font-inter max-w-full'>
        <div className='h-[400px] mt-32'>
            <div className=' text-3xl text-richblack-5 font-semibold my-3 text-center'>
                ERROR - 404
            </div>
            <div className=' text-lg text-richblack-100 font-semibold text-center mb-8'>
                The page you are looking for not found!
            </div>
            <div>
                <CTAButton active={true} linkTo={"/"} shadow={true} width={"200px"}>
                    Return to Home Page
                </CTAButton>
            </div>
        </div>

    </div>
  )
}

export default Error