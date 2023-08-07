import RenderSteps from "./RenderSteps";
import {AiFillThunderbolt} from 'react-icons/ai';

export default function AddCourse(){

    return(
        <>
            <div className=" text-richblack-5 font-inter flex gap-x-10">
                <div>
                    <div className=' text-richblack-100 mb-4'>
                        Home / dashboard / <span className={" text-yellow-50"}>Add course</span>
                    </div>
                    <h2 className=" text-3xl font-semibold mb-6">Add Course</h2>
                    <div>
                        <RenderSteps/>
                    </div>
                </div>

                <div className=" bg-richblack-800 border-[1px] border-richblack-700 rounded-lg px-6 py-8 h-[410px] sticky top-10">
                    <p className=" font-semibold text-lg flex gap-x-2 items-center"><AiFillThunderbolt className=" text-yellow-50"/> Course Upload Tips</p>
                    <ul className=" text-xs leading-8 mb-6">
                        <li>#   Set the Course Price option or make it free.</li>
                        <li>#   Standard size for the course thumbnail is 1024x576.</li>
                        <li>#   Video section controls the course overview video.</li>
                        <li>#   Course Builder is where you create & organize a course.</li>
                        <li>#   Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>#   Information from the Additional Data section shows up on the course single page.</li>
                        <li>#   Make Announcements to notify any important</li>
                        <li>#   Notes to all enrolled students at once.</li>
                    </ul>
                </div>
                
            </div>  
        </>
    );
};