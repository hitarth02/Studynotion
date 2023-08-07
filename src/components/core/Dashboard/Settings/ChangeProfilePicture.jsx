import React, { useEffect, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilePicture } from '../../../../services/operations/settingsAPI';

const ChangeProfilePicture = () => {

  const { token } = useSelector( (state) => state.auth );
  const { user } = useSelector( (state) => state.profile );
  const [loading , setLoading] = useState(false);
  const inputFileRef = useRef(null);
  const [imageFile , setImageFile] = useState(null);
  const [previewSource , setPreviewSource] = useState(null);
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      previewFile(file);
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }


  const clickHandler = () => {
    inputFileRef.current.click();
  }

  const fileUploadHandler = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture",imageFile);
      dispatch(changeProfilePicture(token , formData)).then( () => { setLoading(false) } )
    } catch (error) {
      console.log(error)
      return
    };
  }

  useEffect( () => {
    if(imageFile){
      previewFile(imageFile);
    }
  },[imageFile] );

  return (
    <div className='my-10'>
        <div className='flex flex-row gap-x-8 items-center font-inter text-richblack-5 bg-richblack-800 rounded-lg border-[1px] border-richblack-700 px-10 py-8 font-medium'>

            <div>
                <img src={previewSource || user?.image} alt={user?.firstName} className=' w-[110px] aspect-square rounded-full object-cover'/>
            </div>
            <div className='flex flex-col gap-y-6'>
                <div className=' text-richblack-5 font-inter text-xl'>Change your profile picture</div>
                <div className='flex gap-x-5'>
                  <input
                    type='file'
                    ref={inputFileRef}
                    accept='image/*'
                    onChange={fileChangeHandler}
                    className='hidden'
                  />

                    <button
                      onClick={clickHandler}
                      disabled={loading}
                      className=' bg-richblack-600 rounded-lg px-6 py-3'
                    >
                      Select
                    </button>

                    <button onClick={fileUploadHandler} className='flex flex-row-reverse gap-x-3 bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg'>
                      {
                        loading ? ("Uploading..."):(
                          <>
                            <FiUpload/>
                            <p>Upload</p>
                          </>
                          
                        )
                      }
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeProfilePicture