import React, { useEffect, useState } from 'react'
import CourseSlider from './CourseSlider'
import Spinner from '../../common/Spinner'
import { categoryPageCourses } from '../../../services/operations/categoryPageDetailsAPI';

const CatalogCategory = ({categoryId}) => {

    const [loading , setLoading] = useState(false);
    const [categoryCourses , setCategoryCourses] = useState(null);
    console.log(categoryCourses);

    useEffect(() => {
        const fetchCategoryCourses = async () => {
            try {
                setLoading(true);
                const response = await categoryPageCourses(categoryId);
                setCategoryCourses(response);
                console.log(categoryCourses)
                setLoading(false);
            } catch (error) {
                console.log(error);
            };
        };
        if(categoryId){
            fetchCategoryCourses();
        }
    },[categoryId]);

  return (
    <div>
      <div className=' bg-richblack-800 py-10 font-inter text-white mb-12'>
            <div className='lg:w-9/12 mx-auto flex justify-between gap-x-8'>
                <div>
                    <h2 className='text-3xl font-semibold my-5'>
                        {categoryCourses?.selectedCategory?.name}
                    </h2>
                    <p className=' text-richblack-100'>
                        {categoryCourses?.selectedCategory?.description}
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
        loading ? (<Spinner/>) : 
        (
        <div>
            <div className=' text-2xl text-white lg:w-9/12 mx-auto font-semibold mb-8 pb-2 border-b-[1px] border-richblack-600'>
                Courses to get you Started
            </div>
            <div className=' gap-x-10 lg:w-9/12 mx-auto mb-10 '>
                <CourseSlider courses={categoryCourses?.selectedCategory?.course}/>
            </div>
        </div>
        
        )
      }
    </div>
  )
}

export default CatalogCategory
