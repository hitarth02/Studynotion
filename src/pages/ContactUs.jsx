import React from 'react';
import ContactForm from '../components/common/ContactForm';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { BiWorld } from 'react-icons/bi';
import { IoCall } from 'react-icons/io5';
import Footer from '../components/common/Footer';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllReviews } from '../services/operations/courseAPI';
import Spinner from '../components/common/Spinner';
import ReviewSlider from '../components/common/ReviewSlider';

const ContactUs = () => {

    const [allReviews , setAllReviews] = useState();
    const [loading , setLoading] = useState(false);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const res = await getAllReviews();
            setAllReviews(res);
            setLoading(false);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(()=> {
        fetchReviews();
    },[]);

  return (
    <div >
        <div className=' w-10/12 mx-auto my-20 flex justify-evenly'>

        
        <div className=' flex flex-col w-[450px] h-[390px] bg-richblack-800 rounded-lg justify-center items-left font-medium font-inter'>
            <div className='flex flex-row gap-x-2 my-4 ml-12'>
                <div className=' text-2xl text-richblack-25 mt-1'>
                    <HiChatBubbleLeftRight/>
                </div>
                <div className=' font-inter text-richblack-200'>
                    <p className=' text-lg font-semibold text-richblack-5'>Chat on us</p>
                    <p>Our friendly team is here to help.</p>
                    <p>hitarthsharma02@gmail.com</p>
                </div>
            </div>

            <div className='flex flex-row gap-x-2 my-4 ml-12'>
                <div className='text-2xl text-richblack-25 mt-1'>
                    <BiWorld/>
                </div>
                <div className=' font-inter text-richblack-200'>
                    <p className=' text-lg font-semibold text-richblack-5'>Visit us</p>
                    <p>Come and say hello at our office HQ.</p>
                    <p>Ahmedabad , Gujarat</p>
                </div>
            </div>

            <div className='flex flex-row gap-x-2 my-4 ml-12'>
                <div className='text-2xl text-richblack-25 mt-1'>
                    <IoCall/>
                </div>
                <div className=' font-inter text-richblack-200'>
                    <p className=' text-lg font-semibold text-richblack-5'>Call us</p>
                    <p>Mon - Fri From 8am to 5pm</p>
                    <p>+91 9824475313</p>
                </div>
            </div>
        </div>

        <div className=' border-[1px] border-richblack-700 rounded-lg'>
           <div className='w-[80%] mx-auto my-14'>
            <div className=' font-inter text-4xl text-richblack-25 font-semibold my-4'>
                    Got a Idea? We’ve got the skills. Let’s team up
                </div>
                <div className=' font-inter font-medium text-richblack-200 mb-7'>
                    Tall us more about yourself and what you’re got in mind.
                </div>
                <ContactForm/>
           </div>
        </div>
    </div>

    <div className=' bg-richblack-900'>
            <div className='w-10/12 mt-[100px] mx-auto mb-[100px]'>
                <div className='font-inter font-semibold text-white text-4xl text-center mb-8'>Reviews from other learners.</div>
                <div>
                    {
                        loading ? <Spinner/> : <ReviewSlider reviews={allReviews}/>
                    }
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default ContactUs