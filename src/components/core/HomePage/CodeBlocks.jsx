import React from 'react';
import CTAButton from '../../common/CTAButton';
import {BsArrowRightShort} from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({position , heading , subHeading , ctaBtn1 , ctaBtn2 , bgGradient1 , CodeBlock , codeColor}) => {
  return (
    <div className={`flex ${position} lg:w-11/12 mx-auto justify-around gap-x-20 py-[90px] px-[120px]`}>
        <div className='flex flex-col w-[40%]  '>
            {heading}
            <div className='font-inter text-richblack-300 mt-4 font-medium text-base my-3'>
                {subHeading}
            </div>
            <div className='flex flex-row mt-10 gap-x-5'>
                <CTAButton active={true} linkTo={ctaBtn1.linkTo}>
                    <div className="flex items-center gap-x-1">
                        {ctaBtn1.text}
                        <BsArrowRightShort/>
                    </div>   
                </CTAButton>

                <CTAButton linkTo={ctaBtn2.linkTo}>
                    {ctaBtn2.text}
                </CTAButton>
            </div>
        </div>
        
        <div className='flex w-[35%] glass rounded-sm h-[300px]'>
            <div className='w-[10%] flex flex-col text-richblack-300  text-center'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
            </div>
            <div className={`w-[90%] ${codeColor} ml-1 font-mono `}>
                    <TypeAnimation
                        cursor={true}
                        sequence={[CodeBlock,5000,""]}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        style={{ whiteSpace: 'pre-line'}}
                    />
            </div>
            <div className={`${bgGradient1 ? "glass2":"glass1"}`}>

            </div>
        </div>
        
        
    </div>
  )
}

export default CodeBlocks