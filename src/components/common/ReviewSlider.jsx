import React from 'react';
import {Swiper , SwiperSlide} from 'swiper/react';
import RatingStars from '../common/RatingStars';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewSlider = ({reviews}) => {
  return (
    <div>
        {
        reviews?.length === 0 ? (<div className=' text-white font-inter'>No reviews yet</div>) : 
        (
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              spaceBetween={20}
              slidesPerView={6}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              className="mySwiper pb-8"
            >
                {
                    reviews?.map((review , index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className=' px-6 py-4 bg-richblack-700 rounded-sm'>
                                    <div className=" flex items-center gap-3 text-white">
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

export default ReviewSlider;