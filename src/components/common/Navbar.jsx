import React, { useEffect, useState } from 'react';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { Link, useLocation} from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { BsCart3 } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import ProfileDropdown from '../core/Auth/ProfileDropdown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { FiArrowUpRight , FiSearch } from 'react-icons/fi'

const Navbar = () => {

  const token = useSelector( (state) => state.auth.token );
  const user = useSelector( (state) => state.profile.user );
  const totalItems = useSelector( (state) => state.cart.totalItems );
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path:route},location.pathname)
  };

  const [categoryLinks , setCategoryLinks] = useState([]);

  const fetchCategories = async () => {
    try {
      const result = await apiConnector("GET" , categories.CATEGORIES_API );
      setCategoryLinks(result.data.data);
    } catch (error) {
      console.log(error);
      console.log("Couldnt fetch course categories (Catalog)");
    };
  };

  useEffect(
    () => {
      fetchCategories();
    },[]
  );

  return (
    <div className='bg-richblack-800 text-white font-inter  border-b-[1px] border-richblack-700'>
      <div className=' w-11/12 sm:11/12 md:w-11/12 lg:w-9/12 flex justify-between mx-auto h-[65px] items-center'>
        
        <Link to={"/"}>
          <img src={Logo} width={"160px"} height={"30px"} alt='StudyNotion' className=' invisible sm:invisible md:visible lg:visible'/>
        </Link>
        {/* <div onClick={()=> setShowMenu(true)} className=' text-white lg:invisible md:invisible'>
            MENU
        </div> */}

        <div className={`flex gap-x-6  invisible sm:invisible md:visible lg:visible`}>
          {
            NavbarLinks.map( (element , index) => {
              return element.path ? 
              (
                <Link key={index} to={element?.path}>
                  <div className={` text-lg font-inter ${ matchRoute(element?.path) ? "text-yellow-25":"text-richblack-25"}`}>
                    {element.title}
                  </div>
                </Link>
              )
              :
              (<div className='relative z-20 text-lg flex gap-x-1 items-center group text-richblack-25 cursor-pointer'>
                {element.title}
                <MdOutlineKeyboardArrowDown/>

                <div className={` absolute lg:w-[650px] lg:h-[368px] md:w-[650px] md:h-[368px] w-[80vw] h-max invisible group-hover:visible bg-white text-richblack-900 top-[50%] left-[50%] translate-y-6 lg:-translate-x-20 md:-translate-x-20 -translate-x-28 rounded-lg`}>
                  <div className=' bg-yellow-50 lg:h-[116px] md:h-[116px] h-max rounded-t-lg lg:flex lg:flex-row md:flex md:flex-row flex flex-col md:items-center  lg:items-center justify-between'>
                    <div className=' px-5 py-3 font-inter font-medium text-lg'>
                      Popular course topics.
                      <p className=' font-inter font-normal text-base  text-yellow-400'>Explore free or paid courses in topics that interest you.</p>
                    </div>
                    <div className='px-6 '>
                      <Link to={"/allCourses"}>
                        <div className='flex gap-x-1 items-center underline mb-3'>
                          Explore all courses
                          <FiArrowUpRight/>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className='flex flex-col flex-wrap w-[650px] h-[calc(100%-116px)]'>
                    {
                      categoryLinks.map( (element , index) => {
                        return (
                          <Link key={index} to={`/catalog/${element.name.split(" ").join("-").toLowerCase()}`}>{<div className='font-inter hover:underline py-3 px-5 text-base text-richblack-900'>{element.name}</div>}</Link>
                        )
                      })
                    }
                  </div>
                </div>
                <div className=' bg-yellow-50 absolute rotate-45 w-[15px] h-[15px] left-[50%] translate-x-[22px] rounded-sm translate-y-[24px] invisible group-hover:visible'>

                </div>
                <div className=' absolute w-[100px] h-[50px] left-[50%] translate-y-4 invisible group-hover:visible bg-transparent -translate-x-10'>

                </div>
              </div>)
            } )
          }
        </div>

        <div className='flex flex-row gap-x-3 items-center  invisible sm:invisible md:visible lg:visible'>
          <Link to={"/search"}>
            <FiSearch className=' text-richblack-100 text-xl'/>
          </Link>
          {
            user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to={"/dashboard/cart"}>
                <div className='flex flex-row items-center relative'>
                  <div className=' text-richblack-100 text-xl px-3 '>
                    <BsCart3/>
                  </div>
                  {
                    totalItems > 0 && (
                      <span className=' text-xs bg-yellow-25 flex justify-center items-center w-5 h-5 rounded-full text-richblack-900 absolute -top-3 right-0'>{totalItems}</span>
                    )
                  }
                  </div>
              </Link>
            )
          }
          {
            token == null && (
              <div className='flex gap-x-3'>
                <Link to={"/login"}>
                  <button className=' bg-richblack-800 rounded-lg border-[1px] border-richblack-700 px-[12px] py-2 text-richblack-50 font-inter'>
                    Login
                  </button>
                </Link>

                <Link to={"/signup"}>
                  <button className=' bg-richblack-800 rounded-lg border-[1px] border-richblack-700 px-[12px] py-2 text-richblack-50 font-inter'>
                    Sign up
                  </button>
                </Link>
              </div>
            )
          }
          {
            token !== null && (<div className='flex'><ProfileDropdown/></div> )
          }

        </div>



        {/* <div className={`flex flex-col bg-richblack-800 gap-x-6 lg:hidden md:hidden absolute w-[100%] h-max text-center`}>

          {showMenu &&
            NavbarLinks.map( (element , index) => {
              return element.path ? 
              (
                <Link key={index} to={element?.path}>
                  <div className={` text-lg font-inter ${ matchRoute(element?.path) ? "text-yellow-25":"text-richblack-25"}`}>
                    {element.title}
                  </div>
                </Link>
              )
              :
              (<div className='relative z-20 text-lg flex gap-x-1 items-center group text-richblack-25 cursor-pointer text-center'>
                {element.title}
                <MdOutlineKeyboardArrowDown/>

                <div className={` absolute lg:w-[650px] lg:h-[368px] md:w-[650px] md:h-[368px] w-[80vw] h-max invisible group-hover:visible bg-white text-richblack-900 top-[50%] left-[50%] translate-y-6 lg:-translate-x-20 md:-translate-x-20 -translate-x-28 rounded-lg`}>
                  <div className=' bg-yellow-50 lg:h-[116px] md:h-[116px] h-max rounded-t-lg lg:flex lg:flex-row md:flex md:flex-row flex flex-col md:items-center  lg:items-center justify-between'>
                    <div className=' px-5 py-3 font-inter font-medium text-lg'>
                      Popular course topics.
                      <p className=' font-inter font-normal text-base  text-yellow-400'>Explore free or paid courses in topics that interest you.</p>
                    </div>
                    <div className='px-6 '>
                      <Link to={"/allCourses"}>
                        <div className='flex gap-x-1 items-center underline mb-3'>
                          Explore all courses
                          <FiArrowUpRight/>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className='flex flex-col flex-wrap w-[650px] h-[calc(100%-116px)]'>
                    {
                      categoryLinks.map( (element , index) => {
                        return (
                          <Link key={index} to={`/catalog/${element.name.split(" ").join("-").toLowerCase()}`}>{<div className='font-inter hover:underline py-3 px-5 text-base text-richblack-900'>{element.name}</div>}</Link>
                        )
                      })
                    }
                  </div>
                </div>
                <div className=' bg-yellow-50 absolute rotate-45 w-[15px] h-[15px] left-[50%] translate-x-[22px] rounded-sm translate-y-[24px] invisible group-hover:visible'>

                </div>
                <div className=' absolute w-[100px] h-[50px] left-[50%] translate-y-4 invisible group-hover:visible bg-transparent -translate-x-10'>

                </div>
              </div>)
            } )
          }
        </div>

        <div className='flex flex-row gap-x-3 items-center lg:hidden md:hidden'>
          {
            user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to={"/dashboard/cart"}>
                <div className='flex flex-row items-center relative'>
                  <div className=' text-richblack-100 text-xl px-3 '>
                    <BsCart3/>
                  </div>
                  {
                    totalItems > 0 && (
                      <span className=' text-xs bg-yellow-25 flex justify-center items-center w-5 h-5 rounded-full text-richblack-900 absolute -top-3 right-0'>{totalItems}</span>
                    )
                  }
                  </div>
              </Link>
            )
          }
          {
            token == null && (
              <div className='flex gap-x-3'>
                <Link to={"/login"}>
                  <button className=' bg-richblack-800 rounded-lg border-[1px] border-richblack-700 px-[12px] py-2 text-richblack-50 font-inter'>
                    Login
                  </button>
                </Link>

                <Link to={"/signup"}>
                  <button className=' bg-richblack-800 rounded-lg border-[1px] border-richblack-700 px-[12px] py-2 text-richblack-50 font-inter'>
                    Sign up
                  </button>
                </Link>
              </div>
            )
          }
          {
            token !== null && (<div className='flex'><ProfileDropdown/></div> )
          }

        </div> */}

      </div>
    </div>
  )
}

export default Navbar;