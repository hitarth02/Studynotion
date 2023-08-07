import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getInstructorCourses } from '../../../../services/operations/courseAPI';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CourseTable from './CourseTable';
import { FaPlus } from 'react-icons/fa';

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const [loading , setLoading] = useState();
    const [courses , setCourses] = useState([]);
    const navigate = useNavigate();

    const fetchInstructorCourses = async () => {
        try {
            setLoading(true);
            const response = await getInstructorCourses(token);
            console.log(response);
            setCourses(response);
        } catch (error) {
            console.log(error);
            toast.error("couldnt fetch your courses!");
        };
    };

    useEffect(()=>{
        fetchInstructorCourses();
    },[]);

  return (
    <div>
        <div className=' text-richblack-100 mb-4'>
           Home / Dashboard / <span className={" text-yellow-50"}>My Courses</span>
        </div>

        <div className='flex items-center justify-between'>
            <div className='text-richblack-5 font-semibold text-3xl font-inter'>
                My Courses
            </div>
            <div>
                <button
                    onClick={()=>navigate('/dashboard/add-course')}
                    className=' bg-yellow-50 text-richblack-900 rounded-lg px-5 py-2 flex gap-x-2 items-center'
                >
                    <FaPlus className=' text-sm'/>
                    Add course
                </button>
            </div>
        </div>
        <div>
            {
                courses && (<CourseTable courses={courses} setCourses={setCourses}/>)
            }
        </div>
    </div>
  )
}

export default MyCourses;