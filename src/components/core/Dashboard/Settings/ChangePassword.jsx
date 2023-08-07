import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/settingsAPI";
import { toast } from "react-hot-toast";

const ChangePassword = () => {

    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const {token} = useSelector( (state) => state.auth )
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
    } = useForm();

    const updatePasswordHandler = (data) => {
        try {
            dispatch(changePassword(token , data));
        } catch (error) {
            toast.error("Cannot update password!");
            console.log(error);
        };
    };

  return (
    <div className="font-inter text-richblack-5 bg-richblack-800 border-[1px] border-richblack-700 rounded-lg px-10 py-8 my-10">
        <div className=" font-inter text-2xl font-semibold text-richblack-5 mb-8">
            Password
        </div>
      <form onSubmit={handleSubmit(updatePasswordHandler)}>
        <div className="flex ">
          <label className="mr-4 w-full">
            Current Password<sup className=" text-pink-400 font-inter"> *</sup>
            <br />
            <div className="flex flex-row">
              <input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                {...register("currentPassword",{required:true})}
                placeholder="Current password"
                className="w-[45%] h-[48px] bg-richblack-700 rounded-lg pl-4 pr-10 shadow-inputShadow  my-1"
              />
              <div
                className=" my-4 -mx-10 text-xl hover:cursor-pointer"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </label>
        </div>

        <div className=" text-sm text-richblack-300 mb-6">
            Didn't remember your current password? {<NavLink to={"/forgot-password"} className={" underline"}>Click Here</NavLink>} 
        </div>

        <div className="flex justify-between">
          <label className="mr-4 w-[45%]">
            New Password<sup className=" text-pink-400 font-inter"> *</sup>
            <br />
            <div className="flex flex-row">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                {...register("newPassword",{required:true})}
                placeholder="New Password"
                className="w-full h-[48px] bg-richblack-700 rounded-lg pl-4 pr-10 shadow-inputShadow  my-1"
              />
              <div
                className=" my-4 -mx-10 text-xl hover:cursor-pointer"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </label>

          <label className="w-[45%]">
            Confirm New Password<sup className=" text-pink-400 font-inter"> *</sup>
            <br />
            <div className="flex flex-row">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                {...register("confirmNewPassword",{required:true})}
                placeholder="Confirm New Password"
                className="w-full h-[48px] bg-richblack-700 rounded-lg pl-4 pr-10 shadow-inputShadow  my-1"
              />
              <div
                className=" my-4 -mx-10 text-xl hover:cursor-pointer"
                onClick={() => setShowConfirmPassword((value) => !value)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </div>
            </div>
          </label>
        </div>

        <div className='flex justify-end gap-x-8 mt-6'>
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
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
