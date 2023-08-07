import React, { useState } from 'react';
import {RiDeleteBinLine} from 'react-icons/ri';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../../services/operations/settingsAPI';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {

    const {token} = useSelector((state) => state.auth);
    const [deleteConfirmationModal , setDeleteConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <div className=' bg-pink-900 rounded-lg border-[1px] border-pink-700 font-inter text-richblack-5 font-normal px-10 py-8 items-center'>
        <div className=" font-inter text-2xl font-semibold text-richblack-5 flex gap-x-4">
            <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-pink-700'>
                <RiDeleteBinLine/>
            </div>
            <div className='flex flex-col gap-y-3'>
                <p>Delete Account</p>
                <div className=' text-base font-normal'>
                    <p>Would you like to delete account?</p>
                    <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                </div>
                <div 
                    onClick={() => setDeleteConfirmationModal(
                        {
                            heading:"Delete Account",
                            text:"Are you sure? Your account will be deleted permanentaly!",
                            btn1Text:"Delete account",
                            btn2Text:"Cancel",
                            btn1Handler: () => dispatch(deleteAccount(token , navigate)),
                            btn2Handler: () => setDeleteConfirmationModal(null),
                        }
                    )}
                    className=' text-pink-400  text-base font-normal cursor-pointer'
                >
                   <strong>
                    <i>I want to delete my account</i>
                   </strong>
                </div>
            </div>
      </div>
      {deleteConfirmationModal && <ConfirmationModal modalData={deleteConfirmationModal} />}
    </div>
  )
}

export default DeleteAccount;