import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { categoryPageCourses } from '../services/operations/categoryPageDetailsAPI';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Spinner from '../components/common/Spinner';
import Footer from '../components/common/Footer';

const Catalog = () => {

    const [loading , setLoading] = useState(false);
    const {name} = useParams();
    const [categoryId , setCategoryId] = useState(null);
    const [categoryPageData , setCategoryPageData] = useState(null);

    const getCategories = async () => {
        setLoading(true)
        try {
            const response = await apiConnector("GET" , categories.CATEGORIES_API);
            console.log("PRINTING ALL CATEGORIES", response)
            const category_Id = response?.data?.data.filter((category) => category.name.split(" ").join("-").toLowerCase() === name )[0]._id
            setCategoryId(category_Id);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const getCategoryPageData = async () => {
        setLoading(true);
        try {
            const data = await categoryPageCourses(categoryId);
            console.log("PRINTING CATEGORY PAGE DATA", data)
            setCategoryPageData(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(()=>{
        getCategories();
    },[name]);

    useEffect(()=>{
        if(categoryId){
            getCategoryPageData();
        }
    },[categoryId]);

  return (
    <div>
      <div className=' bg-richblack-800 py-10 font-inter text-white mb-12'>
            <div className=' text-richblack-100 mb-4 lg:w-9/12 mx-auto'>
                Home / Catalog / <span className={" text-yellow-50"}>{categoryPageData?.selectedCategory?.name}</span>
            </div>
            <div className='lg:w-9/12 mx-auto flex justify-between gap-x-8'>
                <div>
                    <h2 className='text-3xl font-semibold my-5'>
                        {categoryPageData?.selectedCategory?.name}
                    </h2>
                    <p className=' text-richblack-100'>
                        {categoryPageData?.selectedCategory?.description}
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
        loading ? (<div className='flex justify-between mt-10 lg:w-9/12 mx-auto'>
            <Spinner/>
        </div>) : 
        (
        <div className=' lg:w-9/12 mx-auto'>
            <div className=' text-2xl text-white font-semibold mb-4 pb-2 border-b-[1px] border-richblack-600'>
                Courses to get you Started
            </div>

            <div className='mb-10 mt-2'>
                <CourseSlider courses={categoryPageData?.selectedCategory}/>
            </div>

            <div className=' text-2xl text-white font-semibold mb-4 pb-2 border-b-[1px] border-richblack-600'>
                Other Courses
            </div>
            <div className='mb-10 mt-2 '>
                <CourseSlider courses={categoryPageData}/>
            </div>
        </div> 
        )
      }
      <Footer/>
    </div>
  )
}

export default Catalog;
