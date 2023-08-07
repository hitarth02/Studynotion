import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import countryCode from '../../data/countrycode.json';

const ContactForm = () => {

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      message: "",
    });
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="font-inter text-richblack-5 font-normal ">
      <form onSubmit={handleSubmit(submitContactForm)}>
        <div className="flex">
          <label className="mr-4">
            First Name<sup className=" text-pink-400 font-inter"> *</sup>
            <br />
            <input
              type="text"
              name="firstName"
              id="firstName"
              {...register("firstName", { required: true })}
              placeholder="First name"
              className="w-full h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow my-1 "
            />
            {errors.firstName && <span>Please enter your First name</span>}
          </label>

          <label>
            Last Name<sup className=" text-pink-400 font-inter"> *</sup>
            <br />
            <input
              type="text"
              name="lastName"
              id="lastName"
              {...register("lastName", { required: true })}
              placeholder="Last name"
              className="w-full h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow my-1"
            />
            {errors.lastName && <span>Please enter your Last name</span>}
          </label>
        </div>

        <div className="my-3"></div>

        <label>
          Email Address<sup className=" text-pink-400 font-inter"> *</sup>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            {...register("email",{required:true})}
            placeholder="Email address"
            className="w-full h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow my-1"
          />
          {errors.email && <span>Please enter your email</span>}
        </label>

        <div className="my-3"></div>

        <label>
          Contact number
          <br />
          <div className="flex gap-x-4 items-center">
            <div>
              <select
                name="dropdown"
                id="dropdown"
                {...register("countryCode",{required:true})}
                className="bg-richblack-800 w-[80px] h-[48px] rounded-lg shadow-inputShadow px-[14px] text-center"
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
              {...register("contactNo",{required:true})}
              placeholder="01234 5678"
              className=" w-[calc(100%-90px)] h-[48px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow my-1"
            />
            {errors.contactNo && <span>Please enter your Contact number</span>}
          </div>
        </label>

        <div className="my-3"></div>

        <label className="mr-4">
            Message<sup className=" text-pink-400 font-inter"> *</sup>
            <br />
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="7"
              {...register("message", { required: true })}
              placeholder="Type your message here..."
              className="w-full h-[200px] bg-richblack-800 rounded-lg px-4 shadow-inputShadow py-3 my-1 "
            />
            {errors.message && <span>Please enter your Message</span>}
          </label>

          <button type='submit' className='w-full text-center mt-4 mb-5 h-[48px] bg-yellow-50 rounded-lg text-richblack-900 font-inter text-lg'>Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
