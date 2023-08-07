import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassSuccess = () => {
  return (
    <div className='flex justify-center items-center h-[75vh]'>
        <div className='flex flex-col w-[500px] h-[400px]'>
            <h1 className=' font-inter text-3xl text-richblack-5 font-semibold'>
                Reset complete!
            </h1>
            <div className=' font-inter text-richblack-100 text-lg '>
                All done! We have sent an email to you to confirm.
            </div>
            <Link to={"/login"}>
                <button
                    className="w-full text-center mb-5 h-[48px] bg-yellow-50 rounded-lg text-richblack-900 font-inter text-lg mt-10"
                >
                    Back to login
                </button>
            </Link>
        </div>
    </div>
  )
}

export default ResetPassSuccess;