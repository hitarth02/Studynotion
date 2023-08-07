import {setLoading, setToken } from '../../slices/authSlice'
import { apiConnector } from '../apiConnector';
import { endpoints } from '../../services/apis';
import { toast } from 'react-hot-toast';
import { setProfileLoading, setUser } from '../../slices/profileSlice';

//*connecting with send otp controller while signing up
export function sendOtp(email , navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", endpoints.SENDOTP_API, {email});
            console.log(response)
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error (response.data.message);
            }
            console.log(response.data.success);
            toast.success("OTP sent successfully!");
            navigate("/verify-email");
        } catch (error) {
            console.log("Error while sending otp !");
            console.log(error);
            toast.error("user already exists");
        };
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    };
};

//*connecting with sign up controller while signing up
export function signup(firstName , lastName , email , password , accountType , confirmPassword , otp, navigate){
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST" , endpoints.SIGNUP_API , {firstName , accountType , lastName , email , otp , password , confirmPassword});
            if(!response.data.success){
                toast.error("Error while signing up");
                throw new Error(response.data.message);
            };
            toast.success("Account created successfully");
            navigate('/login');
        } catch (error) {
            console.log("Error while signing up !");
            console.log(error);
            toast.error("OTP doesnot match");
        };
        dispatch(setLoading(false));
    };
};

//*connecting with sign up controller while signing up
export function login(email , password , navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Logging in...");
        dispatch(setProfileLoading(true));
        try {
            const response = await apiConnector("POST" , endpoints.LOGIN_API , {email , password} );
            console.log(response)
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
                
            }
            dispatch(setToken(response.data.token));
            const userImage  = response.data?.existingUser?.image ? response.data.existingUser.image : 
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existingUser.firstName} ${response.data.existingUser.lastName}`;
            dispatch(setUser({...response.data.existingUser , image:userImage}));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.existingUser));
            toast.success("Login Successful!");
            navigate("/dashboard/profile");
        } catch (error) {
            console.log("Error while logging in !");
            console.log(error);
            console.error(error);
        }
        dispatch(setProfileLoading(false));
        toast.dismiss(toastId);
    };
};

//* Log out function
export function logout(navigate){
    return async (dispatch) => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("logged out");
        navigate("/");
    };
};

//* connecting with reset password token controller
export function getResetPasswordToken(email , setEmailSent){
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST" , endpoints.RESETPASSTOKEN_API , {email})
            console.log(response);

            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
                
            };
            
            toast.success(response.data.message);
            setEmailSent(true);

        } catch (error) {
            console.log("Error while reseting password!");
        }
        dispatch(setLoading(false));
    };
};

//* connecting with reset password controller
export function updateForgottenPassword(password , confirmPassword , token , changePage ){

    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT",endpoints.RESETPASSWORD_API,{password , confirmPassword , token});
            console.log(response);
            
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            toast.success("Password reset successful");
            changePage();
        } catch (error) {
            console.log("Error while updating password!");
        };
        dispatch(setLoading(false));
    };
};