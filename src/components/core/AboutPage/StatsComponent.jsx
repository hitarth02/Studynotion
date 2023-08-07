import React from 'react'

const StatsComponent = () => {

    const Stats = [
        {count: "5K", label: "Active Students"},
        {count: "10+", label: "Mentors"},
        {count: "200+", label: "Courses"},
        {count: "50+", label: "Awards"},
    ];

  return (
    <div className=' bg-richblack-800'>
        <div className='flex w-10/12 mx-auto justify-around border-b-[1px] border-richblack-700'>
            {
                Stats.map( (stat , index) => {
                    return(
                        <div key={index} className='text-center my-20'>
                            <div className='font-inter font-bold text-richblack-5 text-3xl my-4'>
                                {stat.count}
                            </div>
                            <div className='font-inter text-richblack-400 font-semibold text-lg'>
                                {stat.label}
                            </div>
                        </div>
                    )
                } )
            }
        </div>
    </div>
  )
}

export default StatsComponent