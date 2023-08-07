import React from "react";
import { useState } from "react";
import { getUserEnrolledCourses } from "../../../../services/operations/profileAPI";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigation, Pagination, EffectFade } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const YourCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div>
      {enrolledCourses.length === 0 ? (
        <div className="mb-6">You have not purchased any course yet.</div>
      ) : (
        <div>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            spaceBetween={40}
            modules={[Pagination]}
            slidesPerView={3}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {enrolledCourses.map((course, index) => {
              return (
                <div>
                  <SwiperSlide key={index} className="pb-12">
                  <Link to={'/dashboard/enrolled-courses'} className=" font-inter text-richblack-25">
                    <img
                      src={course.courseThumbnail}
                      alt="THUMB"
                      className=" rounded-lg w-[300px] mb-2 aspect-video object-cover"
                    />
                    <p className=" text-richblack-50 mt-4 text-base">
                      {course.courseName}
                    </p>
                    
                  </Link>
                </SwiperSlide>
                </div>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default YourCourses;
