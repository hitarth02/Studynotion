import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
};

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        //todo: add to cart
        addToCart: (state , action) =>{
            //* get the course you want to add to cart
            const course = action.payload;
            //* Find the index of that particular course in the course array
            const index = state.cart.findIndex( (item) => item._id === course._id );
            //* check if course already exists in cart
            if(index >=0){
                toast.error("Course is already added to cart!");
                return;
            };
            //*if not, then add the course to cart
            state.cart.push(course);
            state.totalItems++;
            // let price = course.coursePrice;
            // state.total += price
            state.cart.forEach((cours)=>{
                state.total += cours.coursePrice
            })
            //* update the local storage as well
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("total",JSON.stringify(state.total));
            //* show success toast
            toast.success("Course added to cart successfully!");
        },
        //todo: remove from cart
        removeFromCart: (state , action) => {
            //* get the course id you want to remove
            const courseId = action.payload;
            //* Find the index of that particular course in the course array
            const index = state.cart.findIndex( (item) => item._id === courseId);

            if( index >= 0){
                state.totalItems--
                state.total -= state.cart[index].coursePrice;
                //* If course is found in the course array, remove it!
                state.cart.splice(index , 1);
                //* update the local storage after removing 
                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
                localStorage.setItem("total",JSON.stringify(state.total));
                //* show success toast
                toast.success("Course removed from cart!");
            }
        },
        //todo: reset cart
        resetCart:(state , action) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            //* reset these in local storage as well
            localStorage.removeItem("cart");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("total");
        },
    }
});

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;
export default cartSlice.reducer; 