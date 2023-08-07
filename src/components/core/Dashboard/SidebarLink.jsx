import React from 'react';
import * as Icons from 'react-icons/vsc';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({link , iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();

    function matchRoute(route){
        return matchPath({path:route},location.pathname);
    };

  return (
    <NavLink
        to={link.path} 
        className={"my-2 font-inter text-lg"}
    >
        <div className={`${matchRoute(link.path) ? " bg-richblack-600 text-richblack-5 pl-3" :" bg-transparent text-richblack-200 pl-4"} py-2 flex `}>
            <div className='flex items-center gap-x-3  font-inter'>
                <Icon className="text-lg"/>
                <div>
                    {link.name}
                </div>
            </div>
        </div>
    </NavLink>
  )
}

export default SidebarLink;