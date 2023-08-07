import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCaretDown } from "react-icons/ai";
import { RiDashboard2Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { VscSignOut } from 'react-icons/vsc';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { ACCOUNT_TYPE } from '../../../utils/constants';

const ProfileDropdown = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector( (state) => state.profile );
  const [open , setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref , () => setOpen(false))
  return (
    <div className='relative cursor-pointer z-50'>
      <div className='flex gap-x-1 items-center' onClick={() => setOpen(true)}>
        <img
          src={user?.image}
          alt={`${user?.firstName}`}
          className=' aspect-square w-[32px] rounded-full border-[1px] border-richblack-700'
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {
        open && (
          <div
            onClick={(e) => e.stopPropagation()}
            ref={ref} 
            className='flex flex-col absolute right-[50%] translate-x-12 bg-richblack-800 text-richblack-25 px-[14px] py-4 rounded-lg mt-2 gap-y-3 border-[1px] border-richblack-700'
          >
            <Link to={`${user.accountType === ACCOUNT_TYPE.STUDENT ? ("/dashboard/student"):("/dashboard/profile")}`} onClick={() => setOpen(false)}>
              <div
                className='flex gap-x-2 items-center border-b-[1px] border-richblack-700 pb-2'
              >
                <RiDashboard2Line/>
                Dashboard
              </div>
            </Link>
            <div
            className='flex items-center gap-x-2 cursor-pointer '
              onClick={
                () => {
                  dispatch(logout(navigate));
                  setOpen(false);
                }
              }
            >
              <VscSignOut className="text-lg" />
              Log out
              
            </div>
          </div>
          
        )
      }
      {
        open && (
          <div 
            
            className=' absolute right-[50%] bg-richblack-800 border-l-[1px] border-t-[1px] border-richblack-700 w-[15px] h-[15px] rounded-sm rotate-45 translate-y-[1px] translate-x-[26px] '>

            </div>
    
        )
      }
    </div>
  );
};

export default ProfileDropdown;