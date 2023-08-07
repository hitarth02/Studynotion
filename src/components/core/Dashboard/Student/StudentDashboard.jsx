import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CourseSlider from '../../Catalog/CourseSlider';
import { useState } from 'react';
import { getAllCourses } from '../../../../services/operations/courseAPI';
import Spinner from '../../../common/Spinner';
import { useEffect } from 'react';
import YourCourses from './YourCourses';

const StudentDashboard = () => {
    const {user} = useSelector( (state) => state.profile );
    const location = useLocation();
    const paths = location.pathname.split("/");
    const lowerCase = user.firstName;
    const userName = lowerCase.toUpperCase();
    const [recommendedCourses , setRecommendedCourses] = useState([]);
    const [loading , setLoading] = useState(false);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await getAllCourses();
            console.log("PRINTING ALL COURSES...",res);
            setRecommendedCourses(res);
        } catch (error) {
            console.log(error);
        };
        setLoading(false);
    };

    useEffect(()=>{
        fetchCourses();
    },[]);

    const course = recommendedCourses.slice(0,6);
    const recommendedCoursesArr = {course};

  return (
    <div>
        <div className=' text-richblack-100 mb-4'>
           Home / <span className={` text-yellow-50`}>{paths[1]}</span>
        </div>
        <div>
            <div className=' font-inter text-3xl font-semibold text-richblack-5'>
                Welcome to StudyNotion, {userName} !
            </div>
            <div className='font-inter text-lg text-richblack-200 my-2'>
                where knowledge meets convenience!
                With open arms, we greet you on your learning expedition.
                You've stepped into a realm where courses await,
                An oasis of wisdom, where learning becomes your fate.
            </div>

            <div className=' bg-richblack-800 rounded-lg border-[1px] border-richblack-700 h-max px-6 py-5 my-10'>
                <div className='font-inter text-2xl text-richblack-5 font-semibold mb-4'>
                    Recommended Courses
                </div>
                <div>
                    {
                        loading ? (<div className='flex w-full justify-between mt-10'>
                            <Spinner/>
                        </div>) : 
                        (
                            recommendedCoursesArr !== null && <CourseSlider courses={recommendedCoursesArr}/>
                        )
                    }
                </div>
            </div>

            <div className=' bg-richblack-800 rounded-lg border-[1px] border-richblack-700 px-6 pt-5 mt-10'>
                <div className='font-inter text-2xl text-richblack-5 font-semibold mb-4'>
                    Your Courses
                </div>
                <div className='font-inter text-richblack-200 text-lg '>
                    <YourCourses/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentDashboard