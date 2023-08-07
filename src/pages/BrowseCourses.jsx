import React from 'react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { getAllCourses } from '../services/operations/courseAPI';
import { useEffect } from 'react';
import Spinner from '../components/common/Spinner';
import RatingStars from '../components/common/RatingStars';
import GetAvgRating from '../utils/avgRating';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { toast } from 'react-hot-toast';

const BrowseCourses = () => {

    const [searchedKeyword , setSearchedKeyword] = useState();
    const [allCourses , setAllCourses] = useState([]);
    const [showData , setShowData] = useState(false);
    const [loading , setLoading] = useState(false);
    const [filteredCourses , setFilteredCourses] = useState([]);
    const [modal, setModal] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchCourses = async() => {
        let filterByCategory = allCourses.filter((course) => course.category.name.toLowerCase() === searchedKeyword.toLowerCase());
        let filterByName = allCourses.filter((course) => course.courseName.toLowerCase().includes(searchedKeyword.toLowerCase()));
        let filterByDescription = allCourses.filter((course) => course.courseDescription.toLowerCase().includes(searchedKeyword.toLowerCase()));
        let filterByTags = allCourses.filter((course) => tagLowerCase(course.tags).includes(searchedKeyword.toLowerCase()));
        const allFilteredCourses = filterByCategory.concat(filterByTags , filterByName , filterByDescription);
        setShowData(true);
        return setFilteredCourses(removeDuplicate(allFilteredCourses));
    };

    function handleKeyDown(event){
        if(event.key === "Enter"){
            searchCourses();
        };
    };

    const tagLowerCase = (tagArr) => {
        return tagArr.map((tag) => tag.toLowerCase());
    };

    const removeDuplicate = (arr) => {
        let unique = [];
        arr.forEach((course) => {
            if(!unique.includes(course)){
                unique.push(course);
            };
        });
        console.log(unique);
        return unique;
    };

    useEffect(()=>{
        const fetchAllCourses = async () => {
            setLoading(true)
            try {
                const res = await getAllCourses();
                setAllCourses(res);
                setLoading(false);
            } catch (error) {
                console.log(error);
            };
        }
        fetchAllCourses();
        setShowData(false);
    },[]);

    const addCourseToCart = (course) => {
        if (token === null) {
            toast.error("Please Login first!");
            setModal({
              heading: "Login ",
              text: "Please login first to add course to cart",
              btn1Text: "Login",
              btn2Text: "Cancel",
              btn1Handler: () => navigate("/login"),
              btn2Handler: () => setModal(null),
            });
          } else {
            if(user.courses.includes(course._id)){
              toast.error("You have already purchased this course!");
              navigate("/dashboard/enrolled-courses");
              return;
            };
            dispatch(addToCart(course));
          }
    };

  return (
    <div>
        <div className=' bg-richblack-800 absolute top-0 left-[50%] -translate-x-[50%] z-50 mt-2 flex items-center justify-center rounded-full'>
            <input
                type='text'
                placeholder='Search courses...'
                name="search"
                id="search"
                onChange={(e) => setSearchedKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-[30vw] h-[40px] bg-richblack-700 rounded-full px-4 shadow-inputShadow my-1 font-inter text-white"
            />
            <FiSearch
                onClick={searchCourses}
                className=' -translate-x-10 text-xl text-richblack-50 cursor-pointer'
            />
        </div>
        <div className=' w-8/12 mx-auto mt-10'>
            {
                showData === false || !searchedKeyword ? (
                    <div className=' text-richblack-200 font-inter text-xl fixed z-50 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                        Search course by Course name or Category...
                    </div>
                ) :
                (
                    <>
                        <p className=' text-3xl font-semibold text-white font-inter mb-5'>
                            Showing results for '{searchedKeyword}'
                        </p>
                        {
                            loading ? (<Spinner/>) : 
                            (
                                filteredCourses?.map((course) => {
                                    const count = GetAvgRating(course?.ratingAndReviews);
                                    const fullDesc = course.courseDescription;
                                    const description = fullDesc.length > 120 ? `${fullDesc.substring(0,120)}...` : fullDesc;
                                    return (
                                        <div className=' font-inter text-white w-full flex gap-x-4 border-t border-b border-richblack-700 py-4 my-6'>
                                            <Link to={`/course/${course._id}`}>
                                                <img src={course.courseThumbnail} alt='courseThumbnail' className=' h-40 w-64 object-cover rounded-lg'/>
                                            </Link>
                                            <Link to={`/course/${course._id}`} className=' flex flex-col w-[50%]'>
                                                <p className=' text-2xl'>{course.courseName}</p>
                                                <p className=' text-richblack-100'>{description}</p>
                                                <p className=' my-2 text-xl text-richblack-50'>Rs. {course.coursePrice}</p>
                                                <div className=' flex gap-x-1 items-baseline mt-1'>
                                                    <RatingStars review_count={count} star_size={15}/>
                                                    <p className='text-base text-richblack-100'>{count}</p>
                                                </div>
                                            </Link>
                                            <div className=' flex items-center ml-5'>
                                                <button onClick={() => addCourseToCart(course)} className=' px-3 py-2 rounded-lg bg-richblack-700 text-yellow-50 '>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </>
                )
            }
            {modal && <ConfirmationModal modalData={modal} />}
        </div>
    </div>
  )
}

export default BrowseCourses;