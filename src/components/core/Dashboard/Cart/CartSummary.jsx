import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';

const CartSummary = ({total}) => {

  const {cart} = useSelector((state) => state.cart);
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(cart);
  let courseId = [];
  let cartTotal = 0
  for(let course of cart){
    let id = course._id;
    courseId.push(id);

    let amount = course.coursePrice;
    cartTotal += amount;
  };
  console.log(courseId);

  const goToBuyCourse = () => {
    dispatch(buyCourse(courseId, token, user, navigate, dispatch));
  };

  const handleBuyCourse = () => {
    goToBuyCourse();
  };

  return (
    <div>
      <div className=' rounded-lg w-[250px] mt-2 bg-richblack-800 font-inter text-white h-[180px] px-5 py-6 gap-y-4 flex flex-col sticky top-4'>
        <h2 className=' text-sm text-richblack-25'>Total :</h2>
        <p className=' text-yellow-50 font-semibold text-2xl'>Rs. {cartTotal}</p>
        <button 
        onClick={handleBuyCourse}
          className=' flex rounded-lg py-3 bg-yellow-50 text-richblack-900 justify-center items-center'>
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default CartSummary