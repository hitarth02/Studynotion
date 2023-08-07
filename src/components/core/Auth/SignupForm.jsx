import React ,{useState} from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import countryCode from '../../../data/countrycode.json';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import toast from 'react-hot-toast';
import { sendOtp } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../../slices/authSlice';

const SignupForm = () => {

    const [accountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const navigate = useNavigate();
    const [formData , setFormData] = useState(
        {
            firstName:"",
            lastName:"",
            email:"",
            contactNumber:"",
            password:"",
            confirmPassword:"",
        }
    );
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const formHandler = (event) => {
        setFormData( (prev)=>{
            return {...prev , [event.target.name]:event.target.value}
        } )
    };

    const {email} = formData;

    const submitHandler = (e) => {
        e.preventDefault()
        if(formData.password === formData.confirmPassword){
            console.log(formData , accountType)
            const signupData = {
                ...formData,
                accountType
            }
            dispatch(setSignupData(signupData));
            console.log(signupData)
            dispatch(sendOtp(email,navigate));
            setFormData({
                firstName:"",
                lastName:"",
                email:"",
                contactNumber:"",
                password:"",
                confirmPassword:"",
            });
        }else{
            console.log("Passwords do not match");
            toast.error("Passwords do not match");
        };
    };

    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

  return (
    <div>
         <form onSubmit={submitHandler}>
            <div className='my-6'>

                <div className='my-4 flex justify-center px-1 text-center items-center h-[40px] w-[220px] rounded-full bg-richblack-800 gap-x-3 font-inter shadow-inputShadow'>
                    {
                        tabData.map( (element , index) => {
                            return (
                                <div key={index} onClick={()=> setAccountType(element.type)} className={`hover:cursor-pointer w-[110px] h-[36px] flex items-center justify-center mx-auto rounded-full transition-all ${element.tabName === accountType ? 
                                'bg-richblack-900 text-white'
                                :'bg-richblack-800 text-richblack-400'
                                }`}>{element.tabName}</div>
                            )
                        } )
                    }
                </div>

                <div className='flex'>
                    <label className='mr-4'>First Name<sup className=' text-pink-400 font-inter'> *</sup>
                        <br/>
                        <input 
                            type='text'
                            name='firstName'
                            required
                            value={formData.firstName}
                            onChange={formHandler}
                            placeholder='First name'
                            className='w-full h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow my-1 '
                        />
                    </label>

                    <label>Last Name<sup className=' text-pink-400 font-inter'> *</sup>
                        <br/>
                        <input 
                            type='text'
                            name='lastName'
                            required
                            value={formData.lastName}
                            onChange={formHandler}
                            placeholder='Last name'
                            className='w-full h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow my-1'
                        />
                    </label>
                </div>

                <div className='my-3'></div>

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

                <div className='my-3'></div>

                {/* <label>Contact number
                    <br/>
                    <div className='flex gap-x-4 items-center'>
                        <div>
                            <select
                                name='dropdown'
                                id='dropdown'
                                className='bg-richblack-800 w-[80px] h-[48px] rounded-lg shadow-inputShadow px-[14px] text-center'
                            >
                                {
                                    countryCode.map( (element , index)=> {
                                        return (
                                            <option key={index} value={element.code}>
                                                {element.code} - {element.country}
                                            </option>
                                        )
                                    } )
                                }

                            </select>
                        </div>
                        <input 
                            type='tel'
                            name='contactNumber'
                            value={formData.contactNumber}
                            onChange={formHandler}
                            placeholder='01234 5678'
                            className=' w-[calc(100%-90px)] h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow my-1'
                        />
                    </div>
                </label> */}

                
                <div className='my-3'></div>

                <div className='flex'>
                    <label className='mr-4'>Password<sup className=' text-pink-400 font-inter'> *</sup>
                        <br/>
                        <div className='flex flex-row-reverse'>
                            <input 
                                type={showPassword ? "text" : "password"}
                                name='password'
                                required
                                value={formData.password}
                                onChange={formHandler}
                                placeholder='Password'
                                className='w-full h-[48px] bg-richblack-800 rounded-lg pl-4 pr-10 shadow-inputShadow relative my-1'
                            />
                            <div className='absolute my-4 mx-4 text-xl hover:cursor-pointer' onClick={() => setShowPassword((value)=>!value)}>{ showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }</div>
                        </div>
                    </label>

                    <label>Confirm Password<sup className=' text-pink-400 font-inter'> *</sup>
                        <br/>
                        <div className='flex flex-row-reverse'>
                            <input 
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                required
                                value={formData.confirmPassword}
                                onChange={formHandler}
                                placeholder='Confrim Password'
                                className='w-full h-[48px] bg-richblack-800 rounded-lg pl-4 pr-10 shadow-inputShadow relative my-1'
                            />
                            <div className='absolute my-4 mx-4 text-xl hover:cursor-pointer' onClick={() => setShowConfirmPassword((value)=>!value)}>{ showConfirmPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/> }</div>
                        </div>
                       
                    </label>
                </div>

            </div>

            <button type='submit' className='w-full text-center mb-5 h-[48px] bg-yellow-50 rounded-lg text-richblack-900 font-inter text-lg'>Sign Up</button>
            
        </form>
    </div>
  )
}

export default SignupForm