import { toast } from "react-hot-toast";
import { studentPaymentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from '../../assets/Logo/rzp_logo.png';
import { resetCart } from "../../slices/cartSlice";

const {
    COURSE_PAYMENT_API , 
    COURSE_PAYMENT_VERIFICATION_API
} = studentPaymentEndpoints;

export function loadScript(src){
    return new Promise ((resolve)=>{
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export async function buyCourse(courses , token , userDetails , navigate , dispatch){
    const toastId = toast.loading("Loading...");
    try {
        const appendScriptToDoc = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!appendScriptToDoc){
            console.log("Razorpay SDK failed to laod");
            toast.error("Razorpay SDK failed to laod");
            toast.dismiss(toastId);
            return;
        };

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API , {courses} , { Authorization: `Bearer ${token}`});
        console.log(orderResponse);
        if(!orderResponse.data.message){
            throw new Error(orderResponse.data.message);
        };

        const options = {
            key: process.env.RAZORPAY_KEY_ID,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank You for purchasing" ,
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: `${userDetails.email}`,
            },
            handler: function(orderResponse){
                verifyPayment({...orderResponse , courses} , token , navigate , dispatch);
            },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();

    } catch (error) {
        console.log(error);
        toast.error(error);
    };
    toast.dismiss(toastId);
};

export async function verifyPayment(bodyData , token , navigate , dispatch){
    const toastId = toast.loading("Verifying Payment...")
    try {
        const Verification = await apiConnector("POST",COURSE_PAYMENT_VERIFICATION_API , bodyData , { Authorization: `Bearer ${token}`});
        if(!Verification.data.message){
            throw new Error (Verification.data.message);
        };
        toast.success("Payment verified. Course is added to your library!");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } catch (error) {
        console.log(error);
        toast.error(error)
    };
    toast.dismiss(toastId);
};