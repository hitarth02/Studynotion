import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import SidebarLink from "./SidebarLink";
import Spinner from "../../common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { SlHome } from "react-icons/sl";
import ConfirmationModal from "../../common/ConfirmationModal";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { BsCart3 } from "react-icons/bs";
import { slide as Menu } from "react-burger-menu";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const location = useLocation();
  const pathNames = location.pathname.split("/");
  if (profileLoading || authLoading) {
    return <Spinner />;
  }

  return (
    <div className=" w-[14%] h-[calc(100vh-70px)] bg-richblack-800">
      <div className="flex flex-col my-3">
        {user.accountType === ACCOUNT_TYPE.STUDENT && (
          <NavLink to={"/dashboard/student"} className={`my-2 mt-3`}>
            <div
              className={`${
                pathNames.includes("student")
                  ? " text-richblack-5 pl-3"
                  : " text-richblack-200 pl-4"
              } gap-x-3 items-center flex text-lg text-richblack-200 py-2 `}
            >
              <SlHome />
              <div>Dashboard</div>
            </div>
          </NavLink>
        )}

        {sidebarLinks.map((link) => {
          if (link.type && user.accountType !== link.type) return null;

          return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
        })}

        {user.accountType === ACCOUNT_TYPE.STUDENT && (
          <NavLink to={"/dashboard/cart"} className={` my-2`}>
            <div
              className={`${
                pathNames.includes("cart")
                  ? " text-richblack-5 pl-3"
                  : " text-richblack-200 pl-4"
              } gap-x-3 items-center flex text-lg text-richblack-200 py-2 `}
            >
              <BsCart3 />
              <div>My Cart</div>
            </div>
          </NavLink>
        )}

        <div className="w-10/12 mx-auto my-6 h-[1px] bg-richblack-600"></div>

        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName={"VscSettingsGear"}
          />

          <button
            onClick={() =>
              setConfirmationModal({
                heading: "Confirm",
                text: "Are you sure? You will be logged out.",
                btn1Text: "Log Out",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex pl-4 text-lg text-richblack-200 my-2"
          >
            <div className="flex gap-x-3 items-center">
              <VscSignOut />
              <div>Log out</div>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
