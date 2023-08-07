import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
    const [formData , setFormData] = useState(
        {
            email:"",
            password:""
        }
    );
    const [showPassword , setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formHandler = (event) => {
        setFormData( (prev)=>{
            return {...prev , [event.target.name]:event.target.value}
        } );
    };

    const submitHandler = (e) => {
        e.preventDefault()
        const {email , password} = formData;
        dispatch(login(email , password , navigate));
    };

  return (
    <div>
        <form onSubmit={submitHandler} className='mt-8'>
            <div>

                <label>Email Address<sup className=' text-pink-400 font-inter'> *</sup>
                    <br/>
                    <input 
                        type='email'
                        name='email'
                        required
                        value={formData.email}
                        onChange={formHandler}
                        placeholder='Email address'
                        className='w-full h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow my-1'
                    />
                </label>
                
                <br/>
                <div className='my-4'></div>

                <label>Password<sup className=' text-pink-400 font-inter'> *</sup>
                    <br/>
                    <div className='flex flex-row-reverse'>
                        <input 
                            type={showPassword ? "text" : "password"}
                            name='password'
                            required
                            value={formData.password}
                            onChange={formHandler}
                            placeholder='Password'
                            className='w-full h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow relative my-1'
                        />
                        <div className='absolute text-xl my-5 mx-3 hover:cursor-pointer' onClick={() => setShowPassword((value)=>!value)}>{ showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }</div>
                    </div>

                    <Link to={"/forgot-password"}>
                        <div className='flex justify-end text-blue-100 font-inter text-xs cursor-pointer mt-1'>Forgot password</div>
                    </Link>
                </label>

            </div>

            <button type='submit' className='w-full text-center h-[48px] bg-yellow-50 rounded-lg text-richblack-900 font-inter text-lg my-8'>Log in</button>
            
        </form>
    </div>
  )
}

export default LoginForm;