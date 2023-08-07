import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categoryPageDetails, courseEndpoints } from "../apis";

export const categoryPageCourses = async(categoryId) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST" , categoryPageDetails.GET_CATEGORY_PAGE_DETAILS_API , {categoryId: categoryId});
        result = response.data.data;
    } catch (error) {
        console.log(error);
    };
    toast.dismiss(toastId);
    return result;
};

export const fullCourseDetails = async(courseId , token) => {
    let result1;
    let result2;
    const toastId = toast.loading("Loading...");
    console.log("LOADINGGG")
    try {
        const response = await apiConnector("POST" , courseEndpoints.GET_FULL_COURSE_DETAILS_API_UNAUTHORISED , {courseId: courseId} , { Authorization: `Bearer ${token}`});
        if(!response.data.data){
            throw new Error (response.data.message);
        };
        console.log("FULL COURSE DETAILS",response)
        result1 = response.data.data;
        result2 = response.data.completedVideosData;
        
    } catch (error) {
        console.log(error);        
    };
    toast.dismiss(toastId);
    let result = {result1 , result2}
    return result;
};

export const fullCourseDetailsUnauthorised = async(courseId) => {
    let result;
    const toastId = toast.loading("Loading...");
    console.log("LOADINGGG")
    try {
        const response = await apiConnector("POST" , courseEndpoints.GET_FULL_COURSE_DETAILS_API_UNAUTHORISED , {courseId: courseId});
        if(!response.data.data){
            throw new Error (response.data.message);
        };
        console.log("FULL COURSE DETAILS",response)
        result = response.data.data
        
    } catch (error) {
        console.log(error);        
    };
    toast.dismiss(toastId);
    return result;
};

export const fullCourseDetailsInstructor = async(courseId , token) => {
    let result1;
    let result2;
    const toastId = toast.loading("Loading...");
    console.log("LOADINGGG")
    try {
        const response = await apiConnector("POST" , courseEndpoints.GET_FULL_COURSE_DETAILS_API_INSTRUCTOR , {courseId: courseId} , { Authorization: `Bearer ${token}`});
        if(!response.data.data){
            throw new Error (response.data.message);
        };
        console.log("FULL COURSE DETAILS",response)
        result1 = response.data.data;
        result2 = response.data.completedVideosData;
        
    } catch (error) {
        console.log(error);        
    };
    toast.dismiss(toastId);
    let result = {result1 , result2}
    return result;
};