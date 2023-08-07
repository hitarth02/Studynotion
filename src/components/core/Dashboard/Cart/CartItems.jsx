import React from 'react'
import { useSelector } from 'react-redux'
import CartItemCard from './CartItemCard';

const CartItems = () => {

  const {cart} = useSelector((state)=> state.cart);
  console.log(cart);

  return (
    <div className=' w-[100%]'>
      {
        cart.map((course , index)=> {
          return(
            <CartItemCard course={course} key={index}/>
          )
        })
      }
    </div>
  )
}

export default CartItems