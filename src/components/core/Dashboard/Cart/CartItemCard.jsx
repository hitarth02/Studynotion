import React, { useEffect, useState } from 'react';
import RatingStars from '../../../common/RatingStars';
import GetAvgRating from '../../../../utils/avgRating';
import {CgTrash} from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';

const CartItemCard = ({course}) => {

    const [avgRating , setAvgRating] = useState(0);
    const dispatch = useDispatch();
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgRating(count);
    },[course.ratingAndReviews]);
    console.log(course)
    const fullDesc = course.courseDescription;
    const description = fullDesc.length > 89 ? `${fullDesc.substring(0,90)}...` : fullDesc;

  return (
    <div className=' border-b border-richblack-600 font-inter w-full'>
      <div className='flex my-5 justify-between'>
        <div className='flex gap-x-5 w-[82%]'>
            <img src={course.courseThumbnail} alt='thumbnail' className=' h-36 w-56 object-cover rounded-lg'/>
            <div className='flex flex-col justify-around'>
                <div>
                    <p className=' text-xl mb-2'>{course.courseName}</p>
                    {/* <p className=' text-sm text-richblack-100 pr-2'>{description}</p> */}
                    <p className=' text-sm text-richblack-100'>By {course.instructor.firstName} {course.instructor.lastName}</p>
                </div>
                <div className='flex gap-x-2 mt-3'>
                    <RatingStars review_count={avgRating} star_size={16}/>
                    <p className=' text-sm text-richblack-100'>{course.ratingAndReviews.length} Reviews</p>
                </div>
            </div>
        </div>
        <div className=' w-[15%] flex flex-col gap-y-5 items-center'>
            <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className=' rounded-lg py-2 bg-richblack-700 text-pink-300 flex px-3 gap-x-1 items-center'
            >
                <CgTrash className=' text-xl'/>
                Remove
            </button>
            <p className=' text-2xl text-yellow-50 font-semibold'>Rs. {course.coursePrice}</p>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard
