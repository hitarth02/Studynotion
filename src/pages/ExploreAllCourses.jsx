import React, { useEffect, useState } from 'react';
import Spinner from '../components/common/Spinner';
import { getAllCourses } from '../services/operations/courseAPI';
import CourseCard from '../components/core/Catalog/CourseCard';
import Footer from '../components/common/Footer';

const ExploreAllCourses = () => {

    const [loading , setLoading] = useState(false);
    const [allCourses , setAllCourses] = useState([]);
    const fetchAllCourses = async (req ,res) => {
        try {
            setLoading(true);
            const response = await getAllCourses();
            setAllCourses(response);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCourses();
    },[]);

  return (
    <div>
        <div className=' bg-richblack-800 py-10 font-inter text-white mb-12'>
            <div className=' text-richblack-100 mb-4 lg:w-9/12 mx-auto'>
                Home / <span className={" text-yellow-50"}>Catalog</span>
            </div>
            <div className='lg:w-9/12 mx-auto flex justify-between gap-x-8'>
                <div>
                    <h2 className='text-3xl font-semibold my-5'>
                        Catalog
                    </h2>
                    <p className=' text-richblack-100'>
                        Explore all the courses from a variety of categories created by different instructors , Or you can also search courses a particular category. Choose any course according to you and enjoy the benifits
                    </p>
                </div>
                <div className=' font-inter text-white text-xl font-semibold my-5 lg:w-[30%]'>
                    <p className='mb-2'>Related resources</p>
                    <ul className=' text-richblack-25 text-base font-normal list-disc pl-4'>
                        <li>CheatSheets</li>
                        <li>Docs</li>
                        <li>Forums</li>
                        <li>Community</li>
                    </ul>
                </div>
            </div>
        </div>
      {
        loading ? (<div className='flex justify-center mt-10'>
            <Spinner/>
        </div>) : 
        (
        <div>
            <div className=' text-2xl text-white lg:w-9/12 mx-auto font-semibold mb-8 pb-2 border-b-[1px] border-richblack-600'>
                Courses to get you Started
            </div>
            <div className=' gap-x-10 lg:w-9/12 mx-auto mb-10 grid grid-cols-3 gap-y-6'>
            
            {
                allCourses.map((course) => {
                    return(
                        <CourseCard course = {course}/>
                    );
                })
            }
            </div>
        </div>
        
        )
      }

    <Footer/>
    </div>
  )
}

export default ExploreAllCourses;
