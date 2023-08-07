import React, { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RxCountdownTimer } from "react-icons/rx";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/operations/authAPI";
import Spinner from "../components/common/Spinner";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const {signupData} = useSelector( (state) => state.auth )
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const {firstName , accountType , lastName , email , password , confirmPassword } = signupData;
    dispatch(signup(firstName , lastName , email , password , accountType , confirmPassword , otp , navigate));

  };

  return (
    <div className="flex justify-center items-center h-[75vh]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col w-[510px] h-[320px] p-3">
          <h1 className=" font-inter text-3xl font-semibold text-richblack-5 my-3">
            Verify email
          </h1>
          <div className="font-inter text-lg text-richblack-100 mb-6">
            A verification code has been sent to you. Enter the code below
          </div>

          <form onSubmit={submitHandler} className="flex flex-col">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  className="bg-richblack-800 h-[48px] rounded-lg shadow-inputShadow mr-[26px] text-white font-inter otp text-xl "
                  placeholder="-"
                />
              )}
            />
            <button
              type="submit"
              className=" w-full rounded-lg bg-yellow-50 font-inter flex justify-center items-center h-[48px] my-6  "
            >
              Verify email
            </button>
          </form>
          <div className="flex justify-between text-richblack-5 font-inter">
            <div>
              <Link to={"/login"}>
                <div className="flex flex-row gap-x-2 font-inter text-sm text-richblack-25 items-center">
                  <MdOutlineKeyboardBackspace />
                  Back to login
                </div>
              </Link>
            </div>
            <div onClick={() => dispatch(sendOtp(signupData.email,navigate))} className=" cursor-pointer text-sm text-blue-100 flex items-center gap-x-2">
              <RxCountdownTimer />
              Resend OTP
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
