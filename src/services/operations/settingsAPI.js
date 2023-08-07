import { profile } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";

export function changeProfilePicture(token , formData){
    return async (dispatch) => {
        const toastId = toast.loading("Updating...");
        try {
            const response = await apiConnector("PUT" , profile.CHANGE_PROFILE_PICTURE , formData , {"Content-Type":"multipart/form-data" , Authorization:`Bearer ${token}`});
            console.log(response);
            
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            };
            dispatch( setUser(response.data.data));
            localStorage.setItem("user",JSON.stringify(response.data.data))
            toast.success("Profile picture updated successfully !");
            
        } catch (error) {
            console.log(error);
            toast.error("Cannot update Profile picture");
        };
        toast.dismiss(toastId);
    };
};

export function updateProfileDetails(token , data){
    return async (dispatch) => {
        const toastId = toast.loading("Updating profile details...")
        try {
            const response = await apiConnector("PUT" , profile.UPDATE_PROFILE , data , {Authorization: `Bearer ${token}`});
            console.log(response)
            if(!response.data.success){
                toast.error("Issue while updating profile details");
                throw new Error (response.data.message);
            }
           dispatch(setUser(response.data.data));
           localStorage.setItem("user",JSON.stringify(response.data.data));
           toast.success("profile updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Error updating profile!");
        };
        toast.dismiss(toastId);
    };
};

export function changePassword(token , data){
    return async (dispatch) => {
        const toastId = toast.loading("Changing password...")
        try {
            const response = await apiConnector("PUT" , profile.UPDATE_PASSWORD , data , {Authorization: `Bearer ${token}`});
            console.log(response);
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error (response.data.message);
            }
            dispatch(setUser(response.data.data));
            localStorage.setItem("user" , JSON.stringify(response.data.data));
            toast.success("Password updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Error updating password!");
        }
        toast.dismiss(toastId); 
    };
};

export function deleteAccount(token , navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Deleting account...");
        try {
            const response = await apiConnector("DELETE" , profile.DELETE_ACCOUNT , {},{Authorization:`Bearer ${token}`});
            dispatch(setUser(null));
            console.log(response);
            toast.success("Account deleted successfully!");
            dispatch(setUser(null));
            dispatch(setToken(null));
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Cannot delete account due to some error!")
        };
        toast.dismiss(toastId);
    };
};