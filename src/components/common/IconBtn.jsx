import React from 'react'

const IconBtn = ({text , disabled , onclick , active}) => {
  return (
    <button
        onClick={onclick}
        disabled={disabled}
        className={`${ active ? " bg-yellow-50 text-richblack-900" : " bg-richblack-600 text-richblack-5"} px-4 py-3 rounded-lg`}
        >
        {text}
    </button>
  )
}

export default IconBtn