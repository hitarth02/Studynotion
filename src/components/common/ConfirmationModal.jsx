import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({modalData}) => {
  return (
    <div className="absolute w-full h-full backdrop-blur top-0 left-0 z-20">
      <div className=" bg-richblack-800 text-white absolute top-[50%] left-[50%] -translate-x-36 -translate-y-32 w-[350px] h-[210px] rounded-lg border-[1px] font-inter border-richblack-600 px-8 py-8 flex flex-col justify-center transition ease-linear duration-300">
      <div className="mb-5">
        <div className=" font-semibold text-2xl">{modalData.heading}</div>
        <p className=" text-richblack-200 text-lg">{modalData.text}</p>
      </div>
        <div className="flex gap-x-10 ">
          <IconBtn 
            text={modalData.btn1Text}
            onclick={modalData?.btn1Handler}
            disabled={false}
            active={true}
          />
          <IconBtn 
            text={modalData.btn2Text}
            onclick={modalData?.btn2Handler}
            disabled={false}
            active={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
