import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

    const {token , loading: authLoading} = useSelector( (state) => state.auth );
    const {user , loading: profileLoading} = useSelector( (state) => state.profile );

    if( profileLoading || authLoading){
        return (
            <Spinner/>
        )
    };

  return (
    <div className="relative flex w-screen max-w-full min-h-[calc(100vh-70px)]">
      <Sidebar />
      <div className=" h-[calc(100vh-70px)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;