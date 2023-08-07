import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import {MdOutlineKeyboardBackspace} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getResetPasswordToken } from '../services/operations/authAPI';


const ForgotPassword = () => {

    const dispatch = useDispatch()
    const {loading} = useSelector((state) => state.auth);
    const [emailSent , setEmailSent] = useState(false);
    const [email , setEmail] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getResetPasswordToken(email , setEmailSent));
    }

    return (
        <div className='flex justify-center items-center h-[90vh]'>
            {
                loading ? 
                (<Spinner/>) :
                (<div className='flex flex-col w-[510px] h-[440px] p-2'>
                    <h1 className=' font-inter font-semibold text-3xl text-richblack-5'>
                        {
                            !emailSent ? "Reset your password" : "Check email"
                        }
                    </h1>
                    <div className={` font-inter text-lg text-richblack-100 mt-4 ${ !emailSent ? "mb-8" : "mb-2" }`}>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                             `Please check your email. We have sent the reset email to  ${email}`
                        }
                    </div>
                    <form onSubmit={submitHandler}>
                        {
                            !emailSent && (   
                                    <label className=' font-inter text-richblack-5'>Email Address <sup className=' text-pink-500'>*</sup>
                                    <br/>
                                    <input
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                        placeholder='Email'
                                        className='w-full h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow my-1'
                                    />
                                    </label>
                            )
                        }

                        <button type='submit' className=' w-full rounded-lg bg-yellow-50 font-inter flex justify-center items-center h-[48px] my-8'>
                            {
                                !emailSent ? "Reset your password" : "Resend email"
                            }
                        </button>
                    </form>
                         
                    <Link to={"/login"}>
                        <div className='flex flex-row gap-x-2 font-inter text-sm text-richblack-25 items-center'>
                            <MdOutlineKeyboardBackspace/>
                            Back to login
                        </div>
                    </Link>

                </div>)
            }
        </div>
    )
}

export default ForgotPassword;