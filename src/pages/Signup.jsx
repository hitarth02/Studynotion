import React from 'react';
import FormTemplate from '../components/core/Auth/FormTemplate';
import signupImage from '../assets/Images/signup.webp';

const Signup = () => {
  return (
    <div className='bg-richblack-900 '>
        <FormTemplate
            heading={"Join the millions learning to code with StudyNotion"}
            subHeading={"Build skills for today, tomorrow, and beyond. "}
            subHeadingHighlight={"Education to future-proof your career."}
            formType={"signup"}
            accountType={"Student"}
            image={signupImage}
        />
    </div>
  )
}

export default Signup