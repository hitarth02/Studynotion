import React from 'react';
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/TimelineImage.png';

const timeline = [
    {
        logo:logo1,
        heading:"Leadership",
        description:"Fully comitted to leadership company.",
        render:false
    },
    {
        logo:logo2,
        heading:"Leadership",
        description:"Fully comitted to leadership company.",
        render:false
    },
    {
        logo:logo3,
        heading:"Leadership",
        description:"Fully comitted to leadership company.",
        render:false
    },
    {
        logo:logo4,
        heading:"Solve the problem",
        description:"Fully comitted to leadership company.",
        render:true
    },
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-x-15 items-center w-10/12 mx-auto justify-center mt-16 mb-24'>
            <div className='flex flex-col w-[45%]'>
                {
                    timeline.map( (ele , index) => {
                        return (
                            <div className='flex flex-row items-center h-[84px] gap-x-8 my-3' key={index}>
                                <div>
                                    <img src={ele.logo} alt='logo' className='mb-[20px]' loading='lazy'/>
                                    <div className={` ${timeline[index].heading === "Solve the problem" ? "":"w-[1px] h-[40px] absolute border-l border-richblack-300 border-dashed ml-2"}`}></div>
                                </div>
                                <div>
                                    <div className='font-inter text-lg text-richblack-900'>{ele.heading}</div>
                                    <div className='font-inter text-richblack-500'>{ele.description}</div>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
            <div className='w-fit h-fit relative'>
                <img src={timelineImage} width={"700px"} alt='timelineImg' loading='lazy'/>
                <div className='flex bg-caribbeangreen-700 w-[510px] h-[125px] justify-center items-center gap-4 font-inter absolute -bottom-16 right-24'>
                    <div className='flex text-white w-[50%] items-center justify-center gap-x-3'>
                        <div className='font-bold text-4xl'>10</div>
                        <div className=' text-sm text-caribbeangreen-300' >YEARS <br/> EXPERIENCE</div>
                    </div>
                    <div className='flex text-white w-[50%] items-center justify-center gap-x-3'>
                        <div className='font-bold text-4xl'>250</div>
                        <div className=' text-sm  text-caribbeangreen-300'>TYPES OF <br/> COURSES</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection;