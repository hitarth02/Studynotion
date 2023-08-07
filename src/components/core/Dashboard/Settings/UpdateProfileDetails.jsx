import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import countryCode from '../../../../data/countrycode.json'
import { useNavigate } from 'react-router-dom';
import { updateProfileDetails } from '../../../../services/operations/settingsAPI';

const genders = ["-","Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const UpdateProfileDetails = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm();

  const updateProfileHandler = (data) => {
    try {
      dispatch(updateProfileDetails(token , data))
    } catch (error) {
      console.log(error)
    };
  };

  return (
    <div className='font-inter text-richblack-5 font-normal bg-richblack-800 border-[1px] border-richblack-700 rounded-lg px-10 py-8'>
      <div className=" font-inter text-2xl font-semibold text-richblack-5 mb-8">
            Profile Information
      </div>
      <form onSubmit={handleSubmit(updateProfileHandler)}>
        <div className='flex justify-between my-6'>
          <label className="mr-4 w-[45%]">
              First Name
              <br />
              <input
                type="text"
                name="firstName"
                id="firstName"
                {...register("firstName", { required: true })}
                placeholder="First name"
                defaultValue={user?.firstName}
                className="w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 "
              />
              {errors.firstName && 
                <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your First name.
                </span>
              }
            </label>

            <label className='w-[45%]'>
            Last Name
            <br />
            <input
              type="text"
              name="lastName"
              id="lastName"
              {...register("lastName", { required: true })}
              placeholder="Last name"
              defaultValue={user?.lastName}
              className="w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1"
            />
            {errors.lastName && 
              <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your last name.
              </span>
            }
          </label>
        </div>

        <div className='flex items-center justify-between my-6'>
          <label className='w-[45%]'>
            Date of Birth
            <br/>
            <input
              type='date'
              name="dateOfBirth"
              id='dateOfBirth'
              {...register("dateOfBirth" , {
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              placeholder='DD/MM/YYYY'
              defaultValue={user.additionalDetails?.dateOfBirth}
              className="w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1"
            />
            
          </label>

          <label className='w-[45%]'>
            Gender
            <br/>
            <select
              name='gender'
              id='gender'
              {...register("gender")}
              defaultValue={user.additionalDetails?.gender}
              className="bg-richblack-700 h-[48px] rounded-lg shadow-inputShadow px-[14px] text-left w-full"
              placeholder='Gender'
            >
              {
                genders.map( (gender, index) => {
                  return (
                    <option key={index} value={gender} className='rounded-lg'>
                      {gender}
                    </option>
                  )
                } )
              }
            </select>
            
          </label>
        </div>

        <div className='flex justify-between my-6'>
          <label className='w-[45%]'>
            Contact number
            <br />
            <div className="flex gap-x-4 items-center">
              <div>
                <select
                  name="dropdown"
                  id="dropdown"
                  {...register("countryCode")}
                  defaultValue={user.additionalDetails?.countryCode}
                  className="bg-richblack-700 w-[80px] h-[48px] rounded-lg shadow-inputShadow px-[14px] text-center"
                >
                  {countryCode.map((element, index) => {
                    return (
                      <option key={index} value={element.code}>
                        {element.code} - {element.country}
                      </option>
                    );
                  })}
                </select>
              </div>
              <input
                type="tel"
                name="contactNumber"
                {...register("contactNo")}
                placeholder="01234 5678"
                defaultValue={user.additionalDetails?.contactNo}
                className=" w-[calc(100%-90px)] h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1"
              />
              
            </div>
          </label>

          <label className='w-[45%]'>
            About
            <br />
            <input
              type="text"
              name="about"
              id="about"
              {...register("about")}
              placeholder="Write someting about yourself..."
              defaultValue={user.additionalDetails?.about}
              className="w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1"
            />
            
          </label>
        </div>
        
        <div className='flex justify-end gap-x-8'>
          <button 
            onClick={()=> navigate("/dashboard/student")}
            className ="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>

          <button 
            type='submit'
            className ="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfileDetails