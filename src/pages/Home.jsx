import React from 'react';
import {BsArrowRightShort} from 'react-icons/bs';
import HighlightedText from '../components/core/HomePage/HighlightedText';
import { Link } from 'react-router-dom';
import CTAButton from '../components/common/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Explore from '../components/core/HomePage/Explore';
import Footer from '../components/common/Footer';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ReviewSlider from '../components/common/ReviewSlider';
import Spinner from '../components/common/Spinner';
import { useState } from 'react';
import { getAllReviews } from '../services/operations/courseAPI';
import { useEffect } from 'react';

const Home = () => {

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
        // fetchReviews();
    },[]);
    
  return (
    <div className='flex flex-col'>
        
        <main className='bg-richblack-900 h-fit'>
            <div className='lg:w-11/12 h-fit mt-[70px] m-auto mb-[70px]'>

                <Link to="/signup">
                    <div className='flex justify-center m-auto  items-center rounded-full bg-richblack-800 w-[235px] h-[44px] shadow-mainBtn cursor-pointer hover:scale-95 transition-all duration-200 hover:bg-richblack-800'>
                        <div className='flex justify-center items-center flex-row p-[4px] gap-[5px] font-inter text-richblack-200 text-center font-medium text-[16px]'>
                            <p>Become an Instructor</p>
                            <BsArrowRightShort/>
                        </div>
                    </div>
                </Link>

                <div className='flex flex-col mt-[72px]'>
                    <div className='font-inter font-semibold text-richblack-5 w-full text-center text-[40px] '>
                        Empower Your Future with <HighlightedText text={`Coding Skills`}/>
                    </div>

                    <div className=' w-[65%] m-auto font-inter font-medium text-center text-richblack-300 mt-[16px]'>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                    </div>
                </div>

                <div className='flex flex-row gap-[24px] justify-center mt-[52px]'>
                    <CTAButton active={true} shadow={true} linkTo={"/signup"} width={"135px"}>Learn More</CTAButton>
                    <CTAButton linkTo={"/login"} width={"135px"}>Book a Demo</CTAButton>
                </div>

            </div>

            <div className='m-auto flex w-[60%] mb-[60px]'>
                <video loop autoPlay muted >
                    <source src={Banner} type='video/mp4' />
                </video>
            </div>

            <div>
                <CodeBlocks
                    position={"flex-row"}
                    heading={
                        <div className='font-inter font-semibold text-[38px] text-richblack-5'>
                            Unlock your <HighlightedText text={"coding potential"}/> with our online courses.
                        </div>
                    }
                    subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctaBtn1={
                        {
                            text:"Try it yourself",
                            linkTo:"/signup"
                        }
                    }
                    ctaBtn2={
                        {
                            text:"Learn more",
                            linkTo:"/login"
                        }
                    }
                    CodeBlock={`<!DOCTYPE html>\n<html>\n<head> <title>Example\n</title>\n<linkrel="stylesheet"href="styles.css">\n</head><body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><a href="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                    codeColor={"text-yellow-100"}
                    bgGradient1={false}
                    
                />
                <CodeBlocks
                    position={"flex-row-reverse"}
                    heading={
                        <div className='font-inter font-semibold text-[38px] text-richblack-5'>
                            Start <HighlightedText text={"coding"}/> <br/> <HighlightedText text={`in seconds.`}/> 
                        </div>
                    }
                    subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctaBtn1={
                        {
                            text:"Continue lesson",
                            linkTo:"/signup"
                        }
                    }
                    ctaBtn2={
                        {
                            text:"Learn more",
                            linkTo:"/login"
                        }
                    }
                    CodeBlock={`<!DOCTYPE html>\n<html>\n<head> <title>Example</title> <linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><a href="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                    codeColor={"text-richblack-100"}
                    bgGradient1={true}
                />
            </div>

            <div>
                <Explore/>
            </div>
            

        </main>

        <div className=' bg-white'>
            <div className='h-[300px] mt-[250px] bg-white'>
                <div className='flex justify-center items-center gap-x-10 '>
                    <CTAButton active={true} width={"227px"} shadow={true} >
                        <div className='flex gap-x-1 items-center font-inter'>
                            Explore full catalog <BsArrowRightShort/>
                        </div>
                    </CTAButton>
                    <CTAButton active={false} width={"89px"} shadow={false}>Learn more</CTAButton>
                </div>
            </div>
        </div>

        <div className=' bg-white'>
        <div className='lg:w-10/12 flex flex-row text-[42px] text-richblack-900 font-inter font-semibold mx-auto gap-x-[200px] px-6 bg-white'>
            <div>
                Get the skills you need for a <HighlightedText text={"Job that is in demand."}/>
            </div>
            <div className=''>
                <p className='font-inter text-richblack-500 text-lg font-medium mb-20'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                <div className='flex items-start'>
                <CTAButton active={true} shadow={true} linkTo={"/login"} width={"137px"}>Learn more</CTAButton>
                </div>
            </div>

        </div>
        </div>
        
        <div className=' bg-white'>
            <TimelineSection/>
            <LearningLanguageSection/>
        </div>

        <div className=' bg-richblack-900'>
            <div className=' mt-[100px] mb-[100px]'>
                <InstructorSection/>
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
};

export default Home;