import React from 'react';
import { Navigation, Pagination , EffectFade } from 'swiper';

import {Swiper , SwiperSlide} from 'swiper/react';
import CourseCard from './CourseCard';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CourseSlider = ({courses}) => {
  return (
    <div>
      {
        courses?.course.length === 0 ? (<div className=' text-white font-inter'>No courses for this category</div>) : 
        (
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
              className="mySwiper pb-8"
            >
                {
                    courses?.course.map((c , index) => {
                        return (
                            <SwiperSlide key={index}>
                                <CourseCard course={c}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        )
      }
    </div>
  )
}

export default CourseSlider;
