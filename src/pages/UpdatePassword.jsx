import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { updateForgottenPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const {password , confirmPassword} = formData;
  const passwordHandler = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const updatePasswordHandler = (e) => {
    const token = location.pathname.split("/").at(-1);
    e.preventDefault();
    console.log(formData);

    function changePage(){
      navigate("/reset-password-successful");
    }
    dispatch(updateForgottenPassword(password, confirmPassword, token , changePage));
  };

  return (
    <div className="flex justify-center items-center h-[75vh]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col w-[510px] h-[600]">
          {
            <h1 className=" font-inter text-richblack-5 text-3xl font-semibold my-4">
              Choose new password
            </h1>
          }
          <div className=" font-inter text-richblack-100 text-lg font-medium mb-4">
            Almost done. Enter your new password and youre all set.
          </div>

          <form
            onSubmit={updatePasswordHandler}
            className="font-inter text-richblack-5 mt-5"
          >
            <label className="mr-4">
              Password<sup className=" text-pink-400 font-inter"> *</sup>
              <br />
              <div className="flex flex-row-reverse">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={passwordHandler}
                  placeholder="Password"
                  className="w-full h-[48px] bg-richblack-800 rounded-lg pl-4 pr-10 shadow-inputShadow relative my-1"
                />
                <div
                  className="absolute my-4 mx-4 text-xl hover:cursor-pointer"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>
            </label>
            <div className="my-1"></div>
            <label>
              Confirm Password
              <sup className=" text-pink-400 font-inter"> *</sup>
              <br />
              <div className="flex flex-row-reverse">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={passwordHandler}
                  placeholder="Confrim Password"
                  className="w-full h-[48px] bg-richblack-800 rounded-lg pl-4 pr-10 shadow-inputShadow relative my-1"
                />
                <div
                  className="absolute my-4 mx-4 text-xl hover:cursor-pointer"
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
            <button
              type="submit"
              className="w-full text-center mb-5 h-[48px] bg-yellow-50 rounded-lg text-richblack-900 font-inter text-lg mt-10"
            >
              Reset password
            </button>
          </form>

          <Link to={"/login"}>
            <div className="flex flex-row gap-x-2 font-inter text-sm text-richblack-25 items-center">
              <MdOutlineKeyboardBackspace />
              Back to login
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
