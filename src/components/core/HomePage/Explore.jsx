import React, { useState } from 'react';
import HighlightedText from './HighlightedText';
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const Explore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMycards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter( (courses) => courses.tag === value );
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };

  return (
    <div>
        <div className="hidden lg:block lg:h-[50px]"></div>
        {/* heading section */}
        <div>
            <div className="text-4xl font-semibold text-center my-10 text-richblack-5">
            Unlock the
                <HighlightedText text={"Power of Code"} />
                <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
                    Learn to Build Anything You Can Imagine
                </p>
            </div>
        </div>

       {/* tabs section */}
        <div className=' lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 mb-3 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {tabsName.map( (tab , index)=> {
                return (
                    <div className={`
                    ${currentTab === tab ? 
                    "bg-richblack-900 text-richblack-5 font-medium"
                    : 
                    "text-richblack-200"} px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                    onClick={()=> setMycards(tab)}
                    key={index}>
                        {tab}
                    </div>
                )
            } 
            )}

        </div>
        
        {/* cards section */}
        <div className=' gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap text-black lg:mb-0 mb-7 lg:px-0 px-3 lg:w-10/12 mx-auto translate-y-[150px]'>
            {
                courses.map( (course , index)=>{
                    return (
                        <CourseCard
                            key={index}
                            course={course}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    )
                })
            }
        </div>


    </div>
  )
}

export default Explore;