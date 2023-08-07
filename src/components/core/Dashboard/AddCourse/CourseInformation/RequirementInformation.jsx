import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const RequirementInformation = ({name , label , register , setValue , getValues , errors}) => {

    const [requirement , setRequirement] = useState("");
    const [requirementList , setRequirementList] = useState([]);
    const {course , editCourse} = useSelector((state) => state.course);

    const addRequirementHandler = () => {
        if(requirement){
            const newRequirement = [...requirementList , requirement];
            setRequirementList(newRequirement);
            setRequirement("");
        };
    };
    const removeRequirementHandler = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    };

    useEffect(() => {
        if(editCourse){
            setRequirementList(course?.instructions);
        };
        register(name , {required:true});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        setValue(name , requirementList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[requirementList]);

  return (
    <div className='text-richblack-5 mb-4'>
        <div>
            <label htmlFor={name} className=' font-inter font-medium text-base '>{label} <sup className=' text-pink-400 font-inter'>*</sup></label>
                <input
                    type='text'
                    name={name}
                    id={name}
                    value={requirement}
                    onChange={(event) => setRequirement(event.target.value)}
                    placeholder='Course Requirements / Instructions'
                    className='w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 font-inter '
                />
            <button 
                type='button'
                onClick={() => addRequirementHandler()}
                className=' border-none bg-transparent text-yellow-100 font-inter text-base pl-1 pt-1 font-semibold'
            >
                Add
            </button>
        </div>
        {
            requirementList.length > 0 && (
                <div>
                    <ul className='pl-1 '>
                        {
                            requirementList.map((ele , index) => {
                                return (
                                    <div key={index} className=' flex gap-x-2 items-baseline mb-1 list-disc'>
                                        <li>{ele}</li>
                                        <span className=' text-sm text-richblack-300 cursor-pointer' onClick={() => removeRequirementHandler(index)}>clear</span>
                                    </div>
                                );
                            })
                        }
                    </ul>
                </div>
            )
        }
        {errors[name] && <span>required</span>}
    </div>
  )
}

export default RequirementInformation;