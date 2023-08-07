import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { categories, courseEndpoints } from '../apis';

export async function getAllCategories(){
    let result = [];
    try {
        const response = await apiConnector("GET" , categories.CATEGORIES_API);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data?.data;
    } catch (error) {
        console.log(error);
        toast.error("Cannot fetch categories!");
    };
    return result;
};

export async function createCourse(data , token){
    console.log("calling create course api");
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndpoints.COURSE_INFORMATION_API , data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

export async function editCourseStatusDetails(data , token , courseId){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT" , courseEndpoints.EDIT_COURSE_STATUS_API , data , { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function editCourseDetails(data , token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT" , courseEndpoints.EDIT_COURSE_STATUS_API , data , { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function createSectionApi(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST" , courseEndpoints.CREATE_SECTION_API , data , { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function updateSectionApi(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT" , courseEndpoints.UPDATE_SECTION_API , data , { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function deleteSectionApi(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE" , courseEndpoints.DELETE_SECTION_API , data , { Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function createSubSectionApi(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST" , courseEndpoints.CREATE_SUB_SECTION_API , data , { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function editSubSectionApi(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT" , courseEndpoints.EDIT_SUB_SECTION_API , data , { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function deleteSubSectionApi(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE" , courseEndpoints.DELETE_SUB_SECTION_API , data , { Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function getInstructorCourses(token){
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET" , courseEndpoints.GET_INSTRUCTOR_COURSES , {} , { Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function getfullCourseDetails(data , token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET" , courseEndpoints.GET_INSTRUCTOR_COURSES , data , { Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function deleteCourseApi(data , token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE" , courseEndpoints.DELETE_COURSE_API , data , { Authorization: `Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function getAllCourses(){
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET" , courseEndpoints.GET_ALL_COURSES_API);
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function submitRating(data , token){
    let result;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST" , courseEndpoints.CREATE_RATING_AND_REVIEW_API , data , { Authorization: `Bearer ${token}`});
        console.log(response);
        if(response.data.success === false){
            toast.error(response?.data?.message);
            toast.dismiss(toastId);
            return;
        };
        result = response.data.data;
        toast.success("Review added Successfully!")
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function getAllReviews(){
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET" , courseEndpoints.GET_ALL_RATING_AND_REVIEWS_API);
        console.log(response);
        if(!response.data.success){
            throw new Error (response.data.message);
        };
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;
};

export async function markLectureAsCompleted(data , token){
    let result = null;
    console.log("mark complete data", data);
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST" , courseEndpoints.UPDATE_COURSE_PROGRESS_API , data ,{ Authorization: `Bearer ${token}`});
        console.log("prinigg",response);
        if (!response.data.message) {
        throw new Error(response.data.error);
        };
        toast.success("Lecture Completed");
        result = true;
    } catch (error) {
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
        toast.error(error.message);
        result = false;
    };
    toast.dismiss(toastId);
    return result;
};

export async function getProgressPrecentage(data,token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET" , courseEndpoints.GET_PROGRESS_PERCENTAGE_PROTECTED_API , data , { Authorization: `Bearer ${token}`});
        console.log("prinigg",response);
        if (!response.data.message) {
        throw new Error(response.data.error);
        };
        toast.success("Lecture Completed");
        result = response.data.data;
    } catch (error) {
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
        toast.error(error.message);
    };
    toast.dismiss(toastId);
    return result;
};