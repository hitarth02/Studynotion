import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {BsStarFill , BsStarHalf , BsStar} from 'react-icons/bs';

const RatingStars = ({review_count , star_size}) => {

    const [starCount , setStarCount] = useState(
        {
            full:0,
            half:0,
            empty:0
        }
    );
    
    useEffect(()=>{
        const wholeStars = Math.floor(review_count) || 0;
        setStarCount(
            {
                full: wholeStars,
                half: Number.isInteger(review_count) ? 0 : 1,
                empty: Number.isInteger(review_count) ? 5 - wholeStars : 4 - wholeStars
            }
        );
    },[review_count]);

  return (
    <div className='flex text-yellow-25 gap-1'>
      {[...new Array(starCount.full)].map((_,i)=>{
        return <BsStarFill key={i} size={star_size || 20}/>
      })}
      {[...new Array(starCount.half)].map((_,i)=>{
        return <BsStarHalf key={i} size={star_size || 20}/>
      })}
      {[...new Array(starCount.empty)].map((_,i)=>{
        return <BsStar key={i} size={star_size || 20} className=' text-yellow-25'/>
      })}
    </div>
  )
};

export default RatingStars;
