import { getCart } from '@/api/apiShop'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'

const MyCart = () => {
  const {user} = useUser()
  const {
    loading:loadingCart,
    error: errorCart,
    data: cartItems,
    fn: fnCart
  } = useFetch(getCart, {
    userId: user.id
  })

  useEffect(()=>{
    fnCart()
  },[])

  if(cartItems) console.log(cartItems)
  return (
    <div>
      
    </div>
  )
}

export default MyCart