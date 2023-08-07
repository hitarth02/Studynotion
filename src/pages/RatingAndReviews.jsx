import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fullCourseDetails } from "../services/operations/categoryPageDetailsAPI";
import { useEffect } from "react";
import { useState } from "react";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";

const RatingAndReviews = () => {
  const { courseId } = useParams();
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [coursePageData, setCoursePageData] = useState();
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const navigate = useNavigate();

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await fullCourseDetails(courseId , token);
      setCoursePageData(response.result1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
    // eslint-disable-next-line
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(coursePageData?.ratingAndReviews);
    setAvgReviewCount(count);
    // eslint-disable-next-line
  });

  const [allRating, setAllRating] = useState(true);
  const [fullStarReviews, setFullStarReviews] = useState(false);
  const [fourStarReviews, setFourStarReviews] = useState(false);
  const [threeStarReviews, setThreeStarReviews] = useState(false);
  const [twoStarReviews, setTwoStarReviews] = useState(false);
  const [oneStarReviews, setOneStarReviews] = useState(false);

  const fullStars = coursePageData?.ratingAndReviews.filter(
    (review) => review.rating === 5
  );
  const fourStars = coursePageData?.ratingAndReviews.filter(
    (review) => review.rating === 4
  );
  const threeStars = coursePageData?.ratingAndReviews.filter(
    (review) => review.rating === 3
  );
  const twoStars = coursePageData?.ratingAndReviews.filter(
    (review) => review.rating === 2
  );
  const oneStar = coursePageData?.ratingAndReviews.filter(
    (review) => review.rating === 1
  );

  return (
    <div className=" w-9/12 mx-auto">
      <div className=" text-white font-inter w-[80%] mx-auto mt-10">
        <div className=" text-richblack-100 mb-4 ">
          Home / Catalog / <span>{coursePageData?.courseName}</span> /{" "}
          <span className={" text-yellow-50"}>Reviews</span>
        </div>
        <p className=" text-3xl font-semibold mt-10 mb-5 ">
          <p
            onClick={()=>navigate(-1)}
            className=" bg-yellow-50 rounded-lg cursor-pointer px-2 py-1 mb-2 text-base text-richblack-900 font-normal max-w-max"
          >
            Go back
          </p>
          {coursePageData?.courseName} Reviews
        </p>
        <div className=" flex gap-x-20 ">
          <div className="text-xl">
            <RatingStars review_count={avgReviewCount} star_size={24} />
            <p className="mt-2">{avgReviewCount} out of 5</p>
            <p className=" text-sm text-richblack-100 mt-1 mb-4">
              {coursePageData?.ratingAndReviews.length} ratings globally
            </p>
            <div className="text-base flex flex-col gap-y-1">
              <p className="text-base text-richblack-50">Filter reviews :</p>
              <div className="flex gap-x-3 items-center">
                <p
                  onClick={() => {
                    setFullStarReviews(true);
                    setFourStarReviews(false);
                    setThreeStarReviews(false);
                    setTwoStarReviews(false);
                    setOneStarReviews(false);
                    setAllRating(false);
                  }}
                  className=" text-white hover:underline cursor-pointer hover:text-yellow-50 transition-all"
                >
                  5 stars
                </p>
                <ProgressBar
                  width="150px"
                  completed={
                    (fullStars?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100 || 0
                  }
                  isLabelVisible={false}
                  transitionDuration="1s"
                  height="15px"
                  borderRadius="5px"
                  bgColor=" #FFD60A"
                  baseBgColor="#6E727F"
                />
                <p>
                  {Math.round(
                    (fullStars?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100
                  ) || 0}
                  %
                </p>
              </div>
              <div className="flex gap-x-3 items-center">
                <p
                  onClick={() => {
                    setFullStarReviews(false);
                    setFourStarReviews(true);
                    setThreeStarReviews(false);
                    setTwoStarReviews(false);
                    setOneStarReviews(false);
                    setAllRating(false);
                  }}
                  className=" text-white hover:underline cursor-pointer hover:text-yellow-50 transition-all"
                >
                  4 stars
                </p>
                <ProgressBar
                  width="150px"
                  completed={
                    (fourStars?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100 || 0
                  }
                  isLabelVisible={false}
                  transitionDuration="1s"
                  height="15px"
                  borderRadius="5px"
                  bgColor=" #FFD60A"
                  baseBgColor="#6E727F"
                />
                <p>
                  {Math.round(
                    (fourStars?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100
                  ) || 0}
                  %
                </p>
              </div>
              <div className="flex gap-x-3 items-center">
                <p
                  onClick={() => {
                    setFullStarReviews(false);
                    setFourStarReviews(false);
                    setThreeStarReviews(true);
                    setTwoStarReviews(false);
                    setOneStarReviews(false);
                    setAllRating(false);
                  }}
                  className=" text-white hover:underline cursor-pointer hover:text-yellow-50 transition-all"
                >
                  3 stars
                </p>
                <ProgressBar
                  width="150px"
                  completed={
                    (threeStars?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100 || 0
                  }
                  isLabelVisible={false}
                  transitionDuration="1s"
                  height="15px"
                  borderRadius="5px"
                  bgColor=" #FFD60A"
                  baseBgColor="#6E727F"
                />
                <p>
                  {Math.round(
                    (threeStars?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100
                  ) || 0}
                  %
                </p>
              </div>
              <div className="flex gap-x-3 items-center">
                <p
                  onClick={() => {
                    setFullStarReviews(false);
                    setFourStarReviews(false);
                    setThreeStarReviews(false);
                    setTwoStarReviews(true);
                    setOneStarReviews(false);
                    setAllRating(false);
                  }}
                  className=" text-white hover:underline cursor-pointer hover:text-yellow-50 transition-all"
                >
                  2 stars
                </p>
                <ProgressBar
                  width="150px"
                  completed={
                    (twoStars?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100 || 0
                  }
                  isLabelVisible={false}
                  transitionDuration="1s"
                  height="15px"
                  borderRadius="5px"
                  bgColor=" #FFD60A"
                  baseBgColor="#6E727F"
                />
                <p>
                  {Math.round(
                    (twoStars?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100
                  ) || 0}
                  %
                </p>
              </div>
              <div className="flex gap-x-3 items-center">
                <p
                  onClick={() => {
                    setFullStarReviews(false);
                    setFourStarReviews(false);
                    setThreeStarReviews(false);
                    setTwoStarReviews(false);
                    setOneStarReviews(true);
                    setAllRating(false);
                  }}
                  className=" text-white hover:underline cursor-pointer hover:text-yellow-50 transition-all"
                >
                  1 stars
                </p>
                <ProgressBar
                  width="150px"
                  completed={
                    (oneStar?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100 || 0
                  }
                  isLabelVisible={false}
                  transitionDuration="1s"
                  height="15px"
                  borderRadius="5px"
                  bgColor=" #FFD60A"
                  baseBgColor="#6E727F"
                />
                <p>
                  {Math.round(
                    (oneStar?.length /
                      coursePageData?.ratingAndReviews.length) *
                      100
                  ) || 0}
                  %
                </p>
              </div>

              {allRating === false && (
                <div 
                  onClick={()=>{
                    setFullStarReviews(false);
                    setFourStarReviews(false);
                    setThreeStarReviews(false);
                    setTwoStarReviews(false);
                    setOneStarReviews(false);
                    setAllRating(true);
                  }}
                  className="text to-richblack-25 cursor-pointer hover:underline hover:text-richblack-100 transition-all"
                >
                  Show all ratings
                </div>
              )}
            </div>
          </div>

          {coursePageData?.ratingAndReviews.length === 0 ? (
            <p className=" text-richblack-200 text-xl">
              No one has reviewed this course yet{" "}
            </p>
          ) : (
            
            <>
              {
                allRating && (
                  <div className="flex flex-col gap-y-5 mb-12">
                    {coursePageData?.ratingAndReviews.map((review) => {
                      return (
                        <div className=" border-b border-richblack-600 pb-5 max-w-[450px]">
                          <div className=" flex items-center gap-3">
                            <img
                              src={review?.user?.image}
                              alt="user"
                              className=" w-[36px] aspect-square rounded-full"
                            />
                            <p className=" text-lg">
                              {review?.user?.firstName} {review?.user?.lastName}
                            </p>
                          </div>
                          <div className=" mt-4 mb-2">
                            <RatingStars
                              review_count={review?.rating}
                              star_size={16}
                            />
                          </div>
                          <div className=" text-richblack-100">
                            {review?.review}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              }
              {
                fullStarReviews && (
                  <div className="flex flex-col gap-y-5 mb-12">
                    {fullStars.length === 0 ? (<p className=" text-lg text-richblack-200">No reviews found for 5 stars</p>) : fullStars?.map((review) => {
                      return (
                        <div className=" border-b border-richblack-600 pb-5 max-w-[450px]">
                          <div className=" flex items-center gap-3">
                            <img
                              src={review?.user?.image}
                              alt="user"
                              className=" w-[36px] aspect-square rounded-full"
                            />
                            <p className=" text-lg">
                              {review?.user?.firstName} {review?.user?.lastName}
                            </p>
                          </div>
                          <div className=" mt-4 mb-2">
                            <RatingStars
                              review_count={review?.rating}
                              star_size={16}
                            />
                          </div>
                          <div className=" text-richblack-100">
                            {review?.review}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              }
              {
                fourStarReviews && (
                  <div className="flex flex-col gap-y-5 mb-12">
                    {fourStars.length === 0 ? (<p className=" text-lg text-richblack-200">No reviews found for 4 stars</p>) : fourStars?.map((review) => {
                      return (
                        <div className=" border-b border-richblack-600 pb-5 max-w-[450px]">
                          <div className=" flex items-center gap-3">
                            <img
                              src={review?.user?.image}
                              alt="user"
                              className=" w-[36px] aspect-square rounded-full"
                            />
                            <p className=" text-lg">
                              {review?.user?.firstName} {review?.user?.lastName}
                            </p>
                          </div>
                          <div className=" mt-4 mb-2">
                            <RatingStars
                              review_count={review?.rating}
                              star_size={16}
                            />
                          </div>
                          <div className=" text-richblack-100">
                            {review?.review}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              }
              {
                threeStarReviews && (
                  <div className="flex flex-col gap-y-5 mb-12">
                    {threeStars.length === 0 ? (<p className=" text-lg text-richblack-200">No reviews found for 3 stars</p>) : threeStars?.map((review) => {
                      return (
                        <div className=" border-b border-richblack-600 pb-5 max-w-[450px]">
                          <div className=" flex items-center gap-3">
                            <img
                              src={review?.user?.image}
                              alt="user"
                              className=" w-[36px] aspect-square rounded-full"
                            />
                            <p className=" text-lg">
                              {review?.user?.firstName} {review?.user?.lastName}
                            </p>
                          </div>
                          <div className=" mt-4 mb-2">
                            <RatingStars
                              review_count={review?.rating}
                              star_size={16}
                            />
                          </div>
                          <div className=" text-richblack-100">
                            {review?.review}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              }
              {
                twoStarReviews && (
                  <div className="flex flex-col gap-y-5 mb-12">
                    {twoStars.length === 0 ? (<p className=" text-lg text-richblack-200">No reviews found for 2 stars</p>) : twoStars?.map((review) => {
                      return (
                        <div className=" border-b border-richblack-600 pb-5 max-w-[450px]">
                          <div className=" flex items-center gap-3">
                            <img
                              src={review?.user?.image}
                              alt="user"
                              className=" w-[36px] aspect-square rounded-full"
                            />
                            <p className=" text-lg">
                              {review?.user?.firstName} {review?.user?.lastName}
                            </p>
                          </div>
                          <div className=" mt-4 mb-2">
                            <RatingStars
                              review_count={review?.rating}
                              star_size={16}
                            />
                          </div>
                          <div className=" text-richblack-100">
                            {review?.review}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              }
              {
                oneStarReviews && (
                  <div className="flex flex-col gap-y-5 mb-12">
                    {oneStar.length ===0 ? (<p className=" text-lg text-richblack-200">No reviews found for 1 star</p>) : oneStar?.map((review) => {
                      return (
                        <div className=" border-b border-richblack-600 pb-5 max-w-[450px]">
                          <div className=" flex items-center gap-3">
                            <img
                              src={review?.user?.image}
                              alt="user"
                              className=" w-[36px] aspect-square rounded-full"
                            />
                            <p className=" text-lg">
                              {review?.user?.firstName} {review?.user?.lastName}
                            </p>
                          </div>
                          <div className=" mt-4 mb-2">
                            <RatingStars
                              review_count={review?.rating}
                              star_size={16}
                            />
                          </div>
                          <div className=" text-richblack-100">
                            {review?.review}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              }
            </>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingAndReviews;
