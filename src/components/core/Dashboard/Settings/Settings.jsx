import React from 'react'
import { useLocation } from 'react-router-dom';
import ChangeProfilePicture from './ChangeProfilePicture';
import UpdateProfileDetails from './UpdateProfileDetails';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const Settings = () => {

    const location = useLocation();
    const paths = location.pathname.split("/");
    const currentPath = location.pathname.split("/").at(-1);
    return (
      <div>
        <div className=' text-richblack-100 mb-4'>
           Home / {paths[1]} / <span className={`${ paths[2] === currentPath ? " text-yellow-50" : "text-richblack-100"}`}>{paths[2]}</span>
        </div>
        <div>
          <div className=' font-inter text-3xl font-semibold text-richblack-5'>
            Settings
          </div>

          {/* change profile picture */}
          <ChangeProfilePicture/>
          
          {/* Update additional information */}
          <UpdateProfileDetails/>
          
          {/* Update password */}
          <ChangePassword/>

          {/*Delete Account */}
          <DeleteAccount/>
          
        </div>
      </div>
    )
}

export default Settings