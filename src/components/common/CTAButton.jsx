import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children , active , linkTo , shadow , width}) => {
  return (
    <Link to={linkTo}>
        <div className={`w-[${width}] px-[24px] py-[12px] h-[48px] text-sm rounded-md font-inter font-medium text-center ${active ? "bg-yellow-50 text-richblack-900":"bg-richblack-800 text-richblack-5"} hover:scale-95 transition-all duration-200 ${shadow ? "shadow-ctaButtonY":"shadow-ctaButtonG"} font-medium`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton;