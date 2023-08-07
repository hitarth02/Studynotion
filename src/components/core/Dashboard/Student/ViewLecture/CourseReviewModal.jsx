import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-hot-toast";
import { submitRating } from "../../../../../services/operations/courseAPI";

const CourseReviewModal = ({ setReviewModal }) => {

  const {token} = useSelector((state) => state.auth);
  const {fullCourseData} = useSelector((state) => state.viewCourse);
  const { user } = useSelector((state) => state.profile);
  const {
    setValue,
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    setValue("rating",0);
    setValue("review","");
  });
  
  const handleRatingChange = (newRating) => {
    setValue("rating",newRating);
  };

  const submitRatingAndReview = async(data) => {
    const toastId = toast.loading("Thank you for your feedback!")
    try {
        const response = await submitRating({
            rating:data.rating,
            review:data.review,
            courseId:fullCourseData._id
        },token);
        toast.dismiss(toastId);
        setReviewModal(false);
        console.log(response);
    } catch (error) {
        console.log(error)
    };
  };

  return (
    <div className="font-inter absolute w-full h-full backdrop-blur top-0 left-0 z-50 text-white ">
      <div className="flex flex-col border border-richblack-700 rounded-lg absolute top-[50%] left-[50%] -translate-x-56 -translate-y-44 w-[30vw] bg-richblack-900">
        <div className="flex justify-between px-4 py-3 bg-richblack-800 rounded-t-lg">
          <p>Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross1 />
          </button>
        </div>
        <div className="px-4 py-2 mt-2">
          {/* <p className=' text-2xl font-inter'>Write your Review</p> */}
          <div className="flex gap-x-3 items-center">
            <img
              src={user.image}
              alt="user"
              className="w-[70px] aspect-square rounded-full"
            />
            <div>
              <p className=" text-xl">
                {user.firstName} {user.lastName}
              </p>
              <p className=" text-richblack-200 text-sm">Posting publically</p>
            </div>
          </div>
        </div>

        <form 
            onSubmit={handleSubmit(submitRatingAndReview)}
            className="px-5 pb-3"
        >
          <div className=" py-2">
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={32}
              activeColor={"#ffd700"}
            />
          </div>
          <label
            htmlFor="review"
            className=" font-inter font-medium text-base "
          >
            Write your review<sup className=" text-pink-400 font-inter">*</sup>
          </label>
          <textarea
            name="review"
            id="review"
            placeholder="Write your review here..."
            {...register("review", { required: true })}
            className="w-full bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 pt-2 font-inter"
            rows="7"
            cols="7"
          />
          {errors.review && (<span className=" text-white my-1">Please write review..</span>)}
          <div className="flex justify-end  gap-x-3 mt-1">
            <button
                className=" rounded-lg text-white bg-richblack-700 px-3 py-2"
                onClick={()=>setReviewModal(false)}
            >
                cancel
            </button>
            <button
                type="submit"
                className=" rounded-lg bg-yellow-50 text-richblack-900 px-3 py-2"
            >
                Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseReviewModal;
