import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const { user } = useSelector( (state) => state.profile );
    console.log(user);
    const location = useLocation();
    const paths = location.pathname.split("/");
    const currentPath = location.pathname.split("/").at(-1);

  return (
    <div className='font-inter text-richblack-5  mx-auto'>
        <div className=' text-richblack-100 mb-4'>
           Home / {paths[1]} / <span className={`${ paths[2] === currentPath ? " text-yellow-50" : "text-richblack-100"}`}>My {paths[2]}</span>
        </div>
        <div>
            
            <div className=' text-3xl font-semibold mb-6'>
                My Profile
            </div>
            <div className='flex flex-row gap-x-8 items-center bg-richblack-800 px-12 py-8 rounded-lg border-[1px] border-richblack-700 my-12'>
                <div className=' '>
                    <img src={user?.image} alt='Profile' className='w-[90px] aspect-square rounded-full object-contain'/>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <div className=' text-2xl font-medium text-richblack-5'>{user.firstName} {user.lastName}</div>
                    <div className='text-richblack-200'>{user.email}</div>
                </div>
            </div>

            <div className='flex flex-col gap-y-4 justify-center bg-richblack-800 px-12 py-8 rounded-lg border-[1px] border-richblack-700 my-12'>
                <div className='text-2xl font-medium text-richblack-5 text-left'>
                    About
                </div>
                <div className='text-richblack-200'>
                    {user.additionalDetails?.about}
                </div>
            </div>

            <div className='flex flex-col gap-y-4 justify-center bg-richblack-800 px-12 py-8 rounded-lg border-[1px] border-richblack-700 my-12'>
                <div className='text-2xl font-medium text-richblack-5 text-left'>
                    Additional details
                </div>
                <div className='text-richblack-200 flex- flex-col gap-y-12'>

                    <div className='flex gap-x-[350px] my-6'>
                        <div className='flex flex-col gap-y-2 w-28'>
                            <div className=' text-richblack-5'>First name</div>
                            <div>{user.firstName}</div>
                        </div>
                        <div className='flex flex-col gap-y-2 w-28'>
                            <div className=' text-richblack-5'>Last name</div>
                            <div>{user.lastName}</div>
                        </div>
                    </div>

                    <div className='flex gap-x-[350px] my-6'>
                        <div className='flex flex-col gap-y-2 w-28'>
                            <div className=' text-richblack-5'>Email adress</div>
                            <div>{user.email}</div>
                        </div>
                        <div className='flex flex-col gap-y-2 w-28'>
                            <div className=' text-richblack-5'>Phone No.</div>
                            {
                            user.additionalDetails?.contactNo ? (<div>{user.additionalDetails.contactNo}</div>) : (<div>Add Phone no</div>)
                            }
                        </div>
                    </div>

                    <div className='flex gap-x-[350px] my-6'>
                        <div className='flex flex-col gap-y-2 w-28'>
                            <div className=' text-richblack-5'>Gender</div>
                            {
                            user.additionalDetails?.gender ? (<div>{user.additionalDetails.gender}</div>) : (<div>Add Phone no</div>)
                            }
                        </div>
                        <div className='flex flex-col gap-y-2 w-28'>
                            <div className=' text-richblack-5'>Date of birth</div>
                            {
                            user.additionalDetails?.dateOfBirth ? (<div>{user.additionalDetails.dateOfBirth}</div>) : (<div>Add Phone no</div>)
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile