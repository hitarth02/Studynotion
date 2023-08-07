import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CartItems from './CartItems';
import CartSummary from './CartSummary';
import { resetCart } from '../../../../slices/cartSlice';
import { toast } from 'react-hot-toast';

const Cart = () => {
    const location = useLocation();
    const paths = location.pathname.split("/");
    const currentPath = location.pathname.split("/").at(-1);
    const {total ,  totalItems , cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div>
        <div className=' text-richblack-100 mb-4'>
           Home / {paths[1]} / <span className={`${ paths[2] === currentPath ? " text-yellow-50" : "text-richblack-100"}`}>My {paths[2]}</span>
        </div>
        <div className=' text-white'>
          <div className=' font-inter text-3xl font-semibold text-richblack-5 mb-3'>
            My Cart
          </div>
          <div className=' border-b border-richblack-600 pb-1 text-richblack-100 mb-3 flex justify-between'>
            <p >{totalItems} courses in your cart.</p>
            <p 
              className=' cursor-pointer text-yellow-25 pr-1' 
              onClick={()=> {
                dispatch(resetCart())
                toast.success("All courses removed from cart")
                }}>{
                  cart.length > 0 && (`Reset cart`)
                }</p>
          </div>
          <div>
            {
                totalItems > 0 ? (
                    <div className='flex gap-x-8'>
                        <CartItems/>
                        <CartSummary total={total}/>
                    </div>
                ) : (<div className='flex justify-center w-full h-[300px] items-center text-lg font-inter text-richblack-50'>Your cart is empty</div>)
            }
          </div>
        </div>
    </div>
  )
}

export default Cart