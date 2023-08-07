import React, { useEffect, useState } from 'react';
import {MdClose} from 'react-icons/md';
import { useSelector } from 'react-redux';

const ChipInput = ({name , label , placeholder , register , setValue , errors}) => {

    const {editCourse , course} = useSelector((state) => state.course);
    const [chips , setChips] = useState([]);

    function handleKeyDown(event){
        if(event.key === "Enter" || event.key === ","){
            event.preventDefault();
            const chipValue = event.target.value.trim();
            if(chipValue && !chips.includes(chipValue)){
                const newChip = [...chips , chipValue];
                setChips(newChip);
                event.target.value = "";
            };
        };
    };

    useEffect(()=>{
        if(editCourse){
            console.log(course);
            setChips(course?.tags);
        };
        register(name,{required:true});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        setValue(name , chips);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[chips]);

    const deleteChipHandler = (chipIndex) => {
        const newChips = chips.filter((_,index) => index !== chipIndex);
        setChips(newChips);
    };


  return (
    <div className=' w-[100%] mb-4'>
        <label htmlFor={name} className='font-inter font-medium text-base'>{label} <sup className=' text-pink-400 font-inter'>*</sup></label>
        <input
            type='text'
            name={name}
            id={name}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className='w-full h-[48px] bg-richblack-700 rounded-lg px-4 shadow-inputShadow my-1 font-inter'
        />
        <div className='flex gap-x-2 gap-y-2 my-1 flex-wrap w-[450px]'>
            {
                chips.map( (chip , index) => {
                    return(
                        <span key={index} className='flex gap-x-1 items-center bg-yellow-50 text-richblack-900 font-inter w-max px-3 py-1 rounded-2xl'>
                            <p>{chip}</p>
                            <button onClick={() => deleteChipHandler(index)} className=' bg-transparent text-richblack-900 border-none'><MdClose/></button>
                        </span>
                    );
                })
            }
        </div>
        {errors[name] && <span>required</span>}
    </div>
  )
}

export default ChipInput;