import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fullCourseDetailsUnauthorised } from "../services/operations/categoryPageDetailsAPI";
import Footer from "../components/common/Footer";
import { formattedDate } from "../utils/dateFormatter";
import { RiArrowDownSLine, RiComputerLine, RiTimeLine } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import Spinner from "../components/common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../slices/cartSlice";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { ACCOUNT_TYPE } from "../utils/constants";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import copy from "copy-to-clipboard";

const CourseData = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [coursePageData, setCoursePageData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await fullCourseDetailsUnauthorised(courseId);
      setCoursePageData(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(coursePageData?.ratingAndReviews);
    setAvgReviewCount(count);
  });

  let lecture = 0;
  const sumSubSection = (a, b) => a + b;

  coursePageData?.courseContent.forEach((subsection) => {
    subsection.subSection.forEach((lec) => {
      lecture = sumSubSection(lecture, 1);
    });
  });

  const addToUserCart = () => {
    if (token === null) {
      toast.error("Please Login first!");
      setModal({
        heading: "Login ",
        text: "Please login first to add course to cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setModal(null),
      });
    } else {
      if(user.courses.includes(courseId)){
        toast.error("You have already purchased this course!");
        navigate("/dashboard/enrolled-courses");
        return;
      };
      dispatch(addToCart(coursePageData));
    }
  };

  const goToBuyCourse = () => {
    dispatch(buyCourse([courseId], token, user, navigate, dispatch));
  };

  const handleBuyCourse = async () => {
    if (token) {
      if(user.courses.includes(courseId)){
        toast.error("You have already purchased this course!");
        navigate("/dashboard/enrolled-courses");
        return;
      };
      goToBuyCourse();
    }
  };

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  };

  const fullStars = coursePageData?.ratingAndReviews.filter((review) => review.rating === 5);
  const fourStars = coursePageData?.ratingAndReviews.filter((review) => review.rating === 4);
  const threeStars = coursePageData?.ratingAndReviews.filter((review) => review.rating === 3);
  const twoStars = coursePageData?.ratingAndReviews.filter((review) => review.rating === 2);
  const oneStar = coursePageData?.ratingAndReviews.filter((review) => review.rating === 1);

  return (
    <>
      {loading ? (
        <div className="flex justify-between mt-10">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className=" bg-richblack-800 font-inter">
            <div className=" w-[90vw] sm:w-11/12 md:w-11/12 lg:w-9/12 mx-auto text-richblack-5 font-inter flex flex-col gap-x-10 pt-10">
              <div className=" text-richblack-100 mb-4">
                Home / Catalog /{" "}
                <span className={" text-yellow-50"}>
                  {coursePageData?.category?.name}
                </span>
              </div>

              <div className="lg:flex lg:flex-row md:flex md:flex-row mb-8 gap-x-6 relative mt-2">
                <div className=" mb-6 w-[63%]">
                  <p className=" text-4xl font-medium font-inter mb-5">
                    {coursePageData?.courseName}
                  </p>
                  <p className=" text-base text-richblack-200">
                    {coursePageData?.courseDescription}
                  </p>
                  <p className=" text-richblack-50 my-4 md:flex lg:flex flex flex-col gap-y-1 lg:gap-x-2 md:gap-x-2">
                    <RatingStars review_count={avgReviewCount} />{" "}
                    <span>
                      ({coursePageData?.ratingAndReviews.length} Ratings){" "}
                      {coursePageData?.studentsEnrolled.length} Students
                      Enrolled
                    </span>
                  </p>
                  <p className=" text-richblack-50 my-1">
                    Created by {coursePageData?.instructor?.firstName}{" "}
                    {coursePageData?.instructor?.lastName}
                  </p>
                  <div className="flex flex-row gap-x-5">
                    <p className="flex items-center gap-x-1 my-1 text-richblack-25">
                      {" "}
                      <RiTimeLine /> Created at :{" "}
                      {formattedDate(coursePageData?.createdAt)}
                    </p>
                    <p className="text-richblack-25 font-inter flex items-center gap-x-1">
                      <MdLanguage /> English
                    </p>
                  </div>
                </div>
                <div className=" md:absolute lg:absolute right-0">
                  <div className=" bg-richblack-700 p-4 rounded-lg gap-y-6 flex flex-col max-w-sm -my-4">
                    <img
                      src={coursePageData?.courseThumbnail}
                      alt="Course "
                      className=" md:w-[290px] lg:w-[350px] rounded-lg"
                    />
                    <p className=" text-2xl font-semibold">
                      Rs. {coursePageData?.coursePrice}
                    </p>
                    <div className="flex flex-col gap-y-3">
                      {token && user.accountType === ACCOUNT_TYPE.STUDENT && (
                        <div className="flex flex-col gap-y-3">
                          <button
                            onClick={addToUserCart}
                            className=" bg-yellow-50 flex rounded-lg border-none text-richblack-900 w-full h-12 justify-center items-center text-lg"
                          >
                            Add To Cart
                          </button>
                          <button
                            onClick={handleBuyCourse}
                            className=" bg-richblack-800 flex rounded-lg border-none text-white w-full h-12 justify-center items-center text-lg"
                          >
                            Buy Now
                          </button>
                        </div>
                      )}
                      {token === null && (
                        <div className="flex flex-col gap-y-3">
                          <button
                            onClick={addToUserCart}
                            className=" bg-yellow-50 flex rounded-lg border-none text-richblack-900 w-full h-12 justify-center items-center text-lg"
                          >
                            Add To Cart
                          </button>
                          <button className=" bg-richblack-800 flex rounded-lg border-none text-white w-full h-12 justify-center items-center text-lg">
                            Buy Now
                          </button>
                        </div>
                      )}
                    </div>
                    <p className=" text-sm text-richblack-200 text-center">
                      30-day Money back gaurentee
                    </p>
                    <div>
                      <p className=" mb-2">Instructions:</p>
                      <ul className=" list-disc pl-4">
                        {coursePageData?.instructions.map((instruction) => {
                          return (
                            <li className=" text-sm text-caribbeangreen-200 mb-1">
                              {instruction}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <button
                      onClick={handleShare}
                     className=" bg-transparent border-none text-yellow-50 text-lg ">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-11/12 md:w-11/12 lg:w-9/12 mx-auto">
            <div className=" md:w-[56%] lg:w-[63%] mt-8">
              <div className=" border-[1px] border-richblack-600 font-inter text-white p-7">
                <p className=" text-3xl font-semibold mb-4">
                  What you will learn
                </p>
                <p>
                  <ul className=" list-disc pl-4 text-richblack-50">
                    {coursePageData?.whatYouWillLearn.map((topic, index) => {
                      return (
                        <li className=" my-4" key={index}>
                          {topic}
                        </li>
                      );
                    })}
                  </ul>
                </p>
              </div>

              <div className=" mt-12">
                <p className=" text-white text-2xl font-semibold mb-1">
                  Course Content
                </p>
                <ul className=" text-richblack-50 list-disc flex gap-x-7 pl-4">
                  <li>{coursePageData?.courseContent.length} Chapter(s)</li>
                  <li>{lecture} lecture(s)</li>
                </ul>

                <div className="text-white w-full font-inter mt-5 mb-10">
                  {coursePageData?.courseContent.map((chapter, index) => {
                    return (
                      <details
                        key={index}
                        className="w-full border-[1px] border-richblack-600 cursor-pointer"
                      >
                        <summary className="w-full h-14 text-richblack-25 bg-richblack-700 flex items-center gap-x-2 pl-6 justify-between">
                          <div className="flex flex-row gap-x-2 items-center text-lg">
                            <RiArrowDownSLine /> {chapter.sectionName}
                          </div>
                          <div className="pr-6 text-yellow-50">
                            {chapter?.subSection.length} Lecture(s)
                          </div>
                        </summary>
                        <div className="my-1 pb-2">
                          {chapter?.subSection.map((lec) => {
                            return (
                              <details>
                                <summary className="pl-12 gap-x-2 flex items-center h-10 pr-5">
                                  <RiComputerLine />
                                  {lec.subSectionTitle} <RiArrowDownSLine />
                                </summary>
                                <div className=" pl-[72px] pr-5 my-1">
                                  {lec.subSectionDescription}
                                </div>
                              </details>
                            );
                          })}
                        </div>
                      </details>
                    );
                  })}
                </div>

                <div className=" text-white my-16">
                  <p className=" text-3xl font-inter text-white font-semibold mb-4">
                    Instructor
                  </p>
                  <div className="flex flex-row gap-x-3 items-center">
                    <img
                      src={coursePageData?.instructor?.image}
                      alt="Instructor"
                      className=" w-[56px] aspect-square rounded-full"
                    />
                    <p className="text-xl ">
                      {coursePageData?.instructor?.firstName}{" "}
                      {coursePageData?.instructor?.lastName}
                    </p>
                  </div>
                  <div className="mt-4 text-xm text-richblack-50 pl-1 pr-1">
                    {coursePageData?.instructor?.additionalDetails?.about}
                  </div>
                </div>
              </div>

              <div className="relative text-white font-inter">
                <p className=" text-3xl font-semibold mb-5">Student Reviews</p>
                <div className=" lg:flex gap-x-20">
                <div className="text-xl">
                  <RatingStars review_count={avgReviewCount} star_size={24}/>
                  <p className="mt-2">{avgReviewCount} out of 5</p>
                  <p className=" text-sm text-richblack-100 mt-1 mb-4">{coursePageData?.ratingAndReviews.length} ratings globally</p>
                  <div className="text-base flex flex-col gap-y-1 mb-8">
                    <div className="flex gap-x-3 items-center">
                      <p>
                        5 stars
                      </p>
                      <ProgressBar 
                        width="150px" 
                        completed={((fullStars?.length/coursePageData?.ratingAndReviews.length)*100) || 0}
                        isLabelVisible={false}
                        transitionDuration="1s"
                        height="15px"
                        borderRadius="5px"
                        bgColor=" #FFD60A"
                        baseBgColor="#6E727F"
                      />
                      <p>
                      {Math.round((fullStars?.length/coursePageData?.ratingAndReviews.length)*100) || 0}%
                      </p>
                    </div>
                    <div className="flex gap-x-3 items-center">
                      <p>
                        4 stars
                      </p>
                      <ProgressBar 
                        width="150px" 
                        completed={((fourStars?.length/coursePageData?.ratingAndReviews.length)*100) || 0}
                        isLabelVisible={false}
                        transitionDuration="1s"
                        height="15px"
                        borderRadius="5px"
                        bgColor=" #FFD60A"
                        baseBgColor="#6E727F"
                      />
                      <p>
                      {Math.round((fourStars?.length/coursePageData?.ratingAndReviews.length)*100) || 0}%
                      </p>
                    </div>
                    <div className="flex gap-x-3 items-center">
                      <p>
                        3 stars
                      </p>
                      <ProgressBar 
                        width="150px" 
                        completed={((threeStars?.length/coursePageData?.ratingAndReviews.length)*100) || 0}
                        isLabelVisible={false}
                        transitionDuration="1s"
                        height="15px"
                        borderRadius="5px"
                        bgColor=" #FFD60A"
                        baseBgColor="#6E727F"
                      />
                      <p>
                      {Math.round((threeStars?.length/coursePageData?.ratingAndReviews.length)*100) || 0}%
                      </p>
                    </div>
                    <div className="flex gap-x-3 items-center">
                      <p>
                        2 stars
                      </p>
                      <ProgressBar 
                        width="150px" 
                        completed={((twoStars?.length/coursePageData?.ratingAndReviews.length)*100) || 0}
                        isLabelVisible={false}
                        transitionDuration="1s"
                        height="15px"
                        borderRadius="5px"
                        bgColor=" #FFD60A"
                        baseBgColor="#6E727F"
                      />
                      <p>
                      {Math.round((twoStars?.length/coursePageData?.ratingAndReviews.length)*100) || 0}%
                      </p>
                    </div>
                    <div className="flex gap-x-3 items-center">
                      <p>
                        1 stars
                      </p>
                      <ProgressBar 
                        width="150px" 
                        completed={((oneStar?.length/coursePageData?.ratingAndReviews.length)*100) || 0}
                        isLabelVisible={false}
                        transitionDuration="1s"
                        height="15px"
                        borderRadius="5px"
                        bgColor=" #FFD60A"
                        baseBgColor="#6E727F"
                      />
                      <p>
                      {Math.round((oneStar?.length/coursePageData?.ratingAndReviews.length)*100) || 0}%
                      </p>
                    </div>
                    
                  </div>
                </div>
                
                  {
                    coursePageData?.ratingAndReviews.length === 0 ? (<p className=" text-richblack-200 text-xl">No one has reviewed this course yet </p>) : 
                    (
                      <div className="flex flex-col gap-y-4">
                        {
                          coursePageData?.ratingAndReviews?.slice(0,4).map((review) => {
                            return (
                              <div className=" border-b border-richblack-600 pb-4 max-w-[450px]">
                                <div className=" flex items-center gap-3">
                                  <img src={review?.user?.image} alt="user" className=" w-[36px] aspect-square rounded-full"/>
                                  <p className=" text-lg">{review?.user?.firstName} {review?.user?.lastName}</p>
                                </div>
                                <div className=" mt-4 mb-2">
                                  <RatingStars review_count={review?.rating} star_size={16}/>
                                </div>
                                <div className=" text-richblack-100">
                                  {review?.review}
                                </div>
                              </div>
                            )
                          })
                        }
                        {
                          coursePageData?.ratingAndReviews.length >= 4 && (
                            <p
                              onClick={()=> navigate(`/catalog/${courseId}/reviews`)}
                              className=" font-inter text-yellow-50 hover:underline cursor-pointer"
                            >
                              See more reviews
                            </p>
                          )
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className=" my-20"></div>
          </div>
          <Footer />
        </div>
      )}
      {modal && <ConfirmationModal modalData={modal} />}
    </>
  );
};

export default CourseData;
