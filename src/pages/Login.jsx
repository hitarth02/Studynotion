import React from 'react';
import FormTemplate from '../components/core/Auth/FormTemplate';
import LoginImage from '../assets/Images/login.webp';

const Login = () => {
  return (
    <div className=' bg-richblack-900 h-[80vh]'>
        <FormTemplate
            heading={"Welcome Back"}
            subHeading={"Build skills for today, tomorrow, and beyond."}
            subHeadingHighlight={" Education to future-proof your career."}
            image={LoginImage}
            formType={"login"}
        />
    </div>
  )
};

export default Login;