import React, { useState } from 'react'
import CartContext from './CartContext'
import { useUser } from '@clerk/clerk-react'

const CartContextProvider = ({children}) => {
  const [cartLength, setCartLength] = useState(0)

  return(
    <CartContext.Provider value={{cartLength, setCartLength}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider