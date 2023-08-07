import React from 'react';
import Footer from '../components/common/Footer';
import HighlightedText from '../components/core/HomePage/HighlightedText';
import aboutus1 from '../assets/Images/aboutus1.webp';
import aboutus2 from '../assets/Images/aboutus2.webp';
import aboutus3 from '../assets/Images/aboutus3.webp';
import aboutus4 from '../assets/Images/FoundingStory.png';
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactForm from '../components/common/ContactForm';
import Spinner from '../components/common/Spinner';
import ReviewSlider from '../components/common/ReviewSlider';
import { useEffect } from 'react';
import { getAllReviews } from '../services/operations/courseAPI';
import { useState } from 'react';

const AboutUs = () => {

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
    <div>
    <div className='w-full flex flex-col mx-auto'>
        <div className=' bg-richblack-800 mb-24 pt-8'>
            <div className='text-center text-richblack-200 font-inter my-12'>
                About us
            </div>
            <div className='text-center font-inter text-3xl font-semibold text-richblack-5 lg:w-[35%] mx-auto py-4'>
                Driving Innovation in Online Education for a <HighlightedText text={"Brighter Future"}/>
            </div>
            <div className='text-center font-inter text-base text-richblack-300 lg:w-[70%] mx-auto'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
            </div>
            <div className='flex flex-row gap-x-6 justify-center translate-y-20'>
                <img src={aboutus1} alt='image1' loading='lazy'/>
                <img src={aboutus2} alt='image1' loading='lazy'/>
                <img src={aboutus3} alt='image1' loading='lazy'/>
            </div>
        </div>

        <div className='font-inter text-richblack-100 text-4xl font-semibold text-center w-9/12 mx-auto px-32 my-28'>
            <span className=' text-richblack-400'>" </span>We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightedText text={"combines technology"}/>, <span className='orange-text'>expertise</span>, and community to create <span className='yellow-text'>an unparalleled educational experience</span>.<span className=' text-richblack-400'> "</span>
        </div>

        <div className='w-full h-[1px] bg-richblack-700'></div>
        
        <div className='w-10/12 mx-auto mt-20'>
            <div className='w-[90%] mx-auto flex flex-row justify-between px-20 items-center'>
                <div className='w-[35%]'>
                    <div className='red-text font-inter text-3xl font-semibold my-5'>
                        Our Founding Story 
                    </div>
                    <div className='font-inter text-richblack-300'>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <br/>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                </div>
                <div>
                    <img src={aboutus4} alt='founding Story' loading='lazy'/>
                </div>
            </div>
            <div className='flex w-[90%] mx-auto flex-row justify-between items-center gap-x-20 px-20 my-32'>
                <div className='w-[50%]'>
                    <div className='orange-text font-inter text-3xl font-semibold my-5'>
                        Our Vision
                    </div>
                    <p className='font-inter text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>

                <div className='w-[50%]'>
                    <div className='font-inter text-3xl my-5'>
                        <HighlightedText text={"Our Mission"}/>
                    </div>
                    <p className='font-inter text-richblack-300'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
        </div>

        <div>
            <StatsComponent/>
        </div>

        <div>
            <LearningGrid/>
        </div>
        
        <div className=' w-10/12 mx-auto flex flex-col items-center font-semibold mb-2'>
            <div className='text-3xl font-inter text-richblack-5 my-3'>
                Get in Touch
            </div>
            <div className='font-inter text-richblack-300 font-normal mb-14 '>
                We’d love to here for you, Please fill out this form.
            </div>
            <ContactForm/>
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

    </div>
        <Footer/>
    </div>
  )
}

export default AboutUs;