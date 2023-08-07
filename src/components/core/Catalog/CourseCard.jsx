import React from 'react';
import { NavLink } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
import { useState } from 'react';
import { useEffect } from 'react';
import GetAvgRating from '../../../utils/avgRating';

const CourseCard = ({course}) => {

  const [avgReviewCount , setAvgReviewCount] = useState(0);
   useEffect(()=>{
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
   });

    const fullDesc = course.courseDescription;
    const description = fullDesc.length > 89 ? `${fullDesc.substring(0,80)}...` : fullDesc;
  return (
    <div>
      <NavLink to={`/course/${course._id}`}>
        <div>
            <img src={course.courseThumbnail} alt='thumbnail' className='w-[345px] h-[180px] rounded-lg object-center object-cover'/>
        </div>
        <div className='font-inter text-white mt-4'>
            <p className=' text-lg pr-3'>{course.courseName}</p>
            <p className=' text-xs text-richblack-200 mb-1'>By {course.instructor.firstName} {course.instructor.lastName}</p>
            <p className=' text-richblack-200 pr-3'>{description}</p>
        </div>
        <div className=' text-richblack-300 text-sm my-2 flex flex-row gap-x-2 items-baseline'>
            <RatingStars review_count={avgReviewCount} star_size={15}/>
            <p className='text-base text-richblack-100'>{avgReviewCount}</p>
        </div>
        <div className=' text-richblack-5 font-semibold'>
            Rs. {course.coursePrice}
        </div>
      </NavLink>
    </div>
  )
}

export default CourseCard;
