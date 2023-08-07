import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { enrolledCourses , profile } from "../apis";

export async function getUserEnrolledCourses(token){
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        
        const response = await apiConnector("GET" , enrolledCourses.GET_USER_ENROLLED_COURSES , {} , {Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            toast.error(response.data.message);
            throw new Error (response.data.message);
        };
            
        result = response.data.data;

    } catch (error) {
        console.log(error);
        toast.error("Error while fetching enrolled courses");
    };
    toast.dismiss(toastId);
    return result;
};

export async function instructorStats(token){
    let result;
    const toastId = toast.loading("Loading...");
    try {
        
        const response = await apiConnector("GET" , profile.INSTRUCTOR_STATS , {} , {Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            toast.error(response.data.message);
            throw new Error (response.data.message);
        };
            
        result = response.data.data;

    } catch (error) {
        console.log(error);
        toast.error("Error while fetching instructor stats");
    };
    toast.dismiss(toastId);
    return result;
};