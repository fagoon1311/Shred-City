import { getCart } from '@/api/apiShop'
import CartCard from '@/components/cartcard'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'

const MyCart = () => {
  const {user, isLoaded} = useUser()
  if(user)console.log(user)
  
    const {
    loading:loadingCart,
    error: errorCart,
    data: cartItems,
    fn: fnCart
  } = useFetch(getCart, {
    userId: user?.id
  })

  useEffect(()=>{
    if(isLoaded)fnCart()
  },[isLoaded])

  if(errorCart) return(<div className='bg-red-400 rounded-xl'>{errorCart}</div>)
  if(cartItems) console.log(cartItems)
  if (!isLoaded || loadingCart){
      return (
        <div className="flex items-center justify-center h-screen w-screen">
          <PropagateLoader color="#97fb57" size={40} />
        </div>
      );
  }
  return (
    <div>
      {
        cartItems?.map((item)=><CartCard name={item.name} quantity={item.quantity} price={item.price} image={item.image_url}/>)
      }
    </div>
  )
}

export default MyCart