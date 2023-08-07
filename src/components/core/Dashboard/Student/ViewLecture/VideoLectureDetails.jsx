import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Player } from 'video-react';
import {MdOutlineReplay} from 'react-icons/md';
import { markLectureAsCompleted } from '../../../../../services/operations/courseAPI';
import { updateCompletedLectures } from '../../../../../slices/viewCourseSlice';

const VideoLectureDetails = () => {

  const {
    courseId,
    sectionId,
    subSectionId
  } = useParams();

  const {
    fullCourseData ,
    courseLectureData , 
    completedLectureData
  } = useSelector((state) => state.viewCourse);

  const {token} = useSelector((state) => state.auth);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const [videoData , setVideoData] = useState([]);
  const [videoEnded , setVideoEnded] = useState(false);
  const [loading , setLoading] = useState(false);

  useEffect(() => {

    const setVideoSpecificDetails = () => {
      if(!courseLectureData?.length){
        return;
      };
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses");
      }else{

        const filteredData = courseLectureData?.filter(
          (course) =>  course._id === sectionId
        );

        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (lecture) => lecture._id ===subSectionId
        );

        setVideoData(filteredVideoData?.[0]);
        setVideoEnded(false);
      };
    };
    setVideoSpecificDetails();

  },[location.pathname, courseLectureData, fullCourseData]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseLectureData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseLectureData?.[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }else{
      return false;
    };
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseLectureData.findIndex(
      (data) => data._id === sectionId
    );
    const sectionLength = courseLectureData.length;

    const currentSubSectionIndex = courseLectureData?.[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );
    const subSectionLength = courseLectureData?.[currentSectionIndex]?.subSection.length;

    if(currentSectionIndex === sectionLength - 1 && currentSubSectionIndex === subSectionLength -1){
      return true;
    }else{
      return false;
    };
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseLectureData?.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseLectureData?.[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );
    const subSectionLength = courseLectureData?.[currentSectionIndex]?.subSection.length;

    if(currentSubSectionIndex !== subSectionLength -1){
      //*same section ki next video pr jaana hai
      const nextVideo = courseLectureData?.[currentSectionIndex]?.subSection[currentSubSectionIndex +1]._id;
      navigate(`/view-lecture/${courseId}}/section/${sectionId}/sub-section/${nextVideo}`);
    }else{
      //*diffrent section ki first video
      const nextSectionId = courseLectureData[currentSectionIndex +1]._id;
      const nextVideo = courseLectureData[currentSectionIndex +1].subSection[0]._id;
      navigate(`/view-lecture/${courseId}}/section/${nextSectionId}/sub-section/${nextVideo}`);
    };
  };

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseLectureData.findIndex(
      (data) => data._id === sectionId
    );

    const subSectionLength = courseLectureData?.[currentSectionIndex]?.subSection.length;
    const currentSubSectionIndex = courseLectureData?.[currentSectionIndex]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );

    if(currentSubSectionIndex !== 0){
      //*same section ki previous video pr jaana hai
      const prevVideo = courseLectureData?.[currentSectionIndex]?.subSection[currentSubSectionIndex -1]._id;
      navigate(`/view-lecture/${courseId}}/section/${sectionId}/sub-section/${prevVideo}`);
    }else{
      //*diffrent section ki last video
      const prevSubSectionLength = courseLectureData?.[currentSectionIndex -1]?.subSection.length;
      const prevSectionId = courseLectureData[currentSectionIndex -1]._id;
      const prevVideo = courseLectureData?.[currentSectionIndex -1]?.subSection?.[prevSubSectionLength -1]._id;
      navigate(`/view-lecture/${courseId}}/section/${prevSectionId}/sub-section/${prevVideo}`);
    };
  };

  const handleLectureCompeletion = async () => {

    try {
      const res = await markLectureAsCompleted({courseId:courseId , subSectionId:subSectionId} , token);
      console.log("COMPELETED RESPONSE",res);
      if(res){
        dispatch(updateCompletedLectures(subSectionId));
      };
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className=' text-white'>
      <div className={` bg-richblack-800 rounded-lg px-3 py-3 mt-4 border border-richblack-700 relative }`}>
        <Player 
          src={videoData?.videoUrl}
          autoPlay={false}
          onEnded={()=>setVideoEnded(true)}
          ref={playerRef}
          className={`${videoEnded && ""}`}
        >
          { videoEnded &&
            <div className='absolute z-10 w-[100%] h-[100%] bg-opacity-50 bg-richblack-900 top-0 left-0'>

            </div>
          }
          {
            videoEnded && (
              <div className={`flex flex-col justify-center items-center gap-3 absolute top-[50%] left-[50%] -translate-x-[65%] -translate-y-[50%] z-20 ${videoEnded && " blur-0"}}`}>
                <button
                  onClick={()=>{
                    if(playerRef?.current){
                      playerRef?.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  className='flex flex-col gap-1 font-inter text-lg justify-center items-center'
                >
                  <MdOutlineReplay className='text-5xl font-semibold text-white'/>
                  Replay
                </button>

                {
                  !completedLectureData?.includes(subSectionId) && (
                    <button
                      onClick={handleLectureCompeletion}
                      className='px-3 py-2 text-white bg-richblack-600 rounded-lg font-inter text-base'
                    >
                      Mark as completed
                    </button>
                  )
                }
                
                <div className='flex gap-x-3'>
                  {!isFirstVideo() && (
                    <button
                      onClick={goToPreviousVideo}
                      className='px-3 py-2 text-white bg-richblack-600 rounded-lg font-inter text-base'
                    >
                      Previous
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button
                      onClick={goToNextVideo}
                      className='px-6 py-2 text-richblack-900 bg-yellow-50 rounded-lg text-base font-inter'
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )
          }
        </Player>
      </div>
      <div>
        <div className=' font-inter text-2xl mt-4 mb-3'>
          {
            videoData?.subSectionTitle
          }
        </div>
        <div className=' font-inter text-richblack-100'>
          {
            videoData?.subSectionDescription
          }
        </div>
      </div>
    </div>
  )
}

export default VideoLectureDetails