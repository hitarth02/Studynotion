import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from 'react-icons/rx';
import { HiPencil } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { IoMdArrowDropdown } from 'react-icons/io';
import { deleteSectionApi, deleteSubSectionApi } from '../../../../../services/operations/courseAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import SubSectionModal from './SubSectionModal';
import { MdVideoFile } from 'react-icons/md';

const Section = ({handleChangeEditSectionName}) => {

    const {token} = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();

    const [addLecture , setAddLecture] = useState(null);
    const [viewLecture , setViewLecture] = useState(null);
    const [editLecture , setEditLecture] = useState(null);
    const [showConfirmationModal , setShowConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        try {
            const response = await deleteSectionApi({sectionId , courseId:course._id} , token);
            console.log("after section delete",response);
            if(response){
                dispatch(setCourse(response));
            };
            setShowConfirmationModal(null);
        } catch (error) {
            console.log(error)
        };
    };

    const handleDeleteSubSection = async (subSectionId , sectionId) => {
        try {
            const response = await deleteSubSectionApi({subSectionId , sectionId , courseId:course._id} , token);
            dispatch(setCourse(response));
            setShowConfirmationModal(null);
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className=' bg-richblack-700 rounded-lg mt-5 px-3 py-2 font-inter'>
            {
                course.courseContent?.map((section) => {
                    return(
                        <details key={section._id} open className='px-2 py-2 '>
                            <summary className='flex items-center justify-between py-2 text-richblack-25 border-b-[1px] border-richblack-600 cursor-pointer'>
                                <div className='flex items-center gap-x-2'>
                                    <RxDropdownMenu className=' text-2xl text-richblack-200 cursor-pointer'/>
                                    {section.sectionName}
                                </div>

                                <div className='flex items-center gap-x-2 px-2'>
                                    <div onClick={() => handleChangeEditSectionName(section._id , section.sectionName)}>
                                        <HiPencil className='text-2xl text-richblack-200 cursor-pointer'/>
                                    </div>
                                    <div
                                        onClick={() => setShowConfirmationModal({
                                            heading:"Delete this section?",
                                            text:"All the lectures in this section will also be deleted.",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setShowConfirmationModal(null),
                                        })}
                                    >
                                        <RiDeleteBin6Line className='text-xl text-richblack-200 cursor-pointer'/>
                                    </div>
                                    <span className=' text-richblack-400'>|</span>
                                    <div className=' flex items-center cursor-pointer'>
                                        <IoMdArrowDropdown className=' text-xl text-richblack-100'/>
                                    </div>
                                </div>
                                
                            </summary>

                            <div onClick={(e)=> e.stopPropagation()}>
                                {
                                    section?.subSection.map((subSection) => {
                                        return(
                                            <div key={subSection._id} className='flex justify-between my-3 border-b-[1px] border-richblack-600 pb-2'>
                                                <div 
                                                    onClick={() => {setViewLecture(subSection)
                                                                    console.log(subSection)}}
                                                    className='flex items-center gap-x-2 ml-8 cursor-pointer'
                                                >
                                                    <MdVideoFile className=' text-2xl text-richblack-200'/>
                                                    {subSection.subSectionTitle}
                                                </div>

                                                <div className='flex items-center gap-x-2 px-2'>
                                                    <div 
                                                        onClick={() => setEditLecture({...subSection , sectionId: section._id})}
                                                    >
                                                        <HiPencil className='text-2xl text-richblack-200 cursor-pointer'/>
                                                    </div>
                                                    <div
                                                        onClick={() => setShowConfirmationModal({
                                                            heading:"Delete this Subsection?",
                                                            text:"Selected lecture will be deleted",
                                                            btn1Text:"Delete",
                                                            btn2Text:"Cancel",
                                                            btn1Handler: () => handleDeleteSubSection(subSection._id , section._id),
                                                            btn2Handler: () => setShowConfirmationModal(null),
                                                        })}
                                                    >
                                                        <RiDeleteBin6Line className='text-xl text-richblack-200 cursor-pointer'/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className='flex w-full my-2'>
                                <div 
                                    onClick={()=> setAddLecture(section._id)}
                                    className='flex gap-x-1 text-yellow-50 font-semibold items-center bg-transparent cursor-pointer '
                                >
                                    <FaPlus className=' text-sm'/>
                                    <p className=' text-sm'>Add lecture</p>
                                </div>
                            </div>

                        </details>
                    )
                })
            }

            {viewLecture && 
                <SubSectionModal 
                    modalData ={viewLecture}
                    setModalData={setViewLecture}
                    view={true}
                />
            }
            {editLecture && 
                <SubSectionModal
                    modalData ={editLecture}
                    setModalData={setEditLecture}
                    edit={true}
                />
            }
            {addLecture && 
                <SubSectionModal
                    modalData ={addLecture}
                    setModalData={setAddLecture}
                    add={true}
                />
            }

            {showConfirmationModal && <ConfirmationModal modalData={showConfirmationModal}/>}
        </div>
    );
};

export default Section;