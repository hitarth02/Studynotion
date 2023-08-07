import React from 'react';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link } from 'react-router-dom';
import { FooterLink2 } from '../../data/footer-links';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className='border-t border-richblack-600 bg-richblack-800'>
      <div className='flex flex-col  text-richblack-5 lg:w-10/12 mx-auto py-12'>
        <div className='flex flex-row w-[100%]'>
            <div className='flex flex-row w-[50%] justify-around mx-4 border-r border-richblack-700'>
              <div className='flex flex-col'>
                <img src={logo} alt='StudyNotion' className='my-4'/>
                <div className='flex flex-col font-inter gap-y-3 mb-6'>
                  <h2 className='font-semibold font-inter text-richblack-100'>Company</h2>
                  <div className='flex flex-col font-inter text-richblack-400 text-sm gap-y-2'>
                    {
                      ["About","Careers","Affiliates"].map( (ele , index)=>{
                        return (
                          <div  key={index}>
                            <Link to={`/${ele.toLowerCase()}`}>{ele}</Link>
                          </div>
                        )        
                      } )
                    }
                  </div>
                </div>
                <div className='flex gap-x-2 text-richblack-100 text-lg'>
                  <div>
                    <Link to={"/"}><FaFacebook/></Link>
                  </div>
                  <div>
                    <Link to={"/"}><FaGoogle/></Link>
                  </div>
                  <div>
                    <Link to={"/"}><FaTwitter/></Link>
                  </div>
                  <div>
                    <Link to={"/"}><FaYoutube/></Link>
                  </div>
                </div>

              </div>

              <div className='flex flex-col font-inter gap-y-3'>
                  <div className='mb-5 flex flex-col ' >
                    <h2 className='font-semibold font-inter text-richblack-100 mb-3'>Resources</h2>
                    <div className='flex flex-col font-inter text-richblack-400 text-sm gap-y-2'>
                    {
                      Resources.map( (ele , index) => {
                        return (
                          <div key={index}>
                            <Link to={`/${ele.toLowerCase()}`}>{ele}</Link>
                          </div>
                        )
                      } )
                    }
                    </div>
                  </div>

                  <div className='mb-5'>
                    <h2 className='font-semibold font-inter text-richblack-100 mb-3'>Support</h2>
                    <div className='flex flex-col font-inter text-richblack-400 text-sm gap-y-2'>
                      <Link>Help center</Link>
                    </div>
                  </div>
              </div>

              <div className='flex flex-col font-inter gap-y-3'>
                <div className='mb-5'>
                    <h2 className='font-semibold font-inter text-richblack-100 mb-3'>Plans</h2>
                    <div className='flex flex-col font-inter text-richblack-400 text-sm gap-y-2'>
                    {
                      Plans.map( (ele , index)=>{
                        return (
                          <div key={index}>
                            <Link to={`/${ele.toLowerCase()}`}>{ele}</Link>
                          </div>
                        )
                      } )
                    }
                    </div>
                </div>

                <div className='flex flex-col font-inter gap-y-3 mb-5'>
                    <h2 className='font-semibold font-inter text-richblack-100'>Community</h2>
                    <div className='flex flex-col font-inter text-richblack-400 text-sm gap-y-2'>
                    {
                      Community.map( (ele , index)=>{
                        return (
                          <div key={index}>
                            <Link to={`/${ele.toLowerCase()}`}>{ele}</Link>
                          </div>
                        )
                      } )
                    }
                    </div>
                </div>
              </div>
            </div>
              
            <div className='flex w-[50%] justify-around mx-4'>
              <div className='flex flex-col font-inter gap-y-3 mb-5'>
                <h2 className='font-semibold font-inter text-richblack-100'>
                  {
                    FooterLink2[0].title
                  }
                </h2>
                <div className='flex flex-col font-inter text-richblack-400 text-sm gap-y-2'>
                  {
                    FooterLink2[0].links.map( (ele , index) => {
                      return (
                        <div key={index}>
                          <Link to={ele.link} >{ele.title}</Link>
                        </div>
                      )
                    } )
                  }
                </div>
              </div>
              
              <div className='flex flex-col font-inter gap-y-3 mb-5'>
                  <h2 className='font-semibold font-inter text-richblack-100'>
                    {
                      FooterLink2[1].title
                    }
                  </h2>
                  <div className='flex flex-col font-inter text-richblack-400 text-sm gap-y-2'>
                    {
                      FooterLink2[1].links.map( (ele , index) => {
                        return (
                          <div key={index}>
                            <Link to={ele.link} >{ele.title}</Link>
                          </div>
                        )
                      } )
                    }
                  </div>
              </div>

              <div className='flex flex-col font-inter gap-y-3 mb-5'>
                <h2 className='font-semibold font-inter text-richblack-100'>
                    {
                      FooterLink2[2].title
                    }
                  </h2>
                  <div className='flex flex-col font-inter text-richblack-400 text-sm gap-y-2'>
                    {
                      FooterLink2[2].links.map( (ele , index) => {
                        return (
                          <div key={index}>
                            <Link to={ele.link} >{ele.title}</Link>
                          </div>
                        )
                      } )
                    }
                  </div>
              </div>

            </div>
        </div>

        <div className='flex mt-[35px] border-t border-richblack-700 w-full justify-between'>
            <div className='flex text-sm text-richblack-400 mt-[30px] font-semibold'>
              <div className='border-r border-richblack-600 mx-2 px-2'>
                Privacy Policy
              </div>
              <div className='border-r border-richblack-600 px-2'>
                Cookie Policy
              </div>
              <div className=' px-2'>
                Terms
              </div>
            </div>
            <div className='flex text-sm text-richblack-400 mt-[30px] font-semibold'>
              Made with ♥ Hitarth Sharma © 2023 Studynotion
            </div>
        </div>
    </div>
    </div>
  )
}

export default Footer;