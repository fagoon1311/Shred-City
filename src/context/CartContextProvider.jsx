import React, { useState } from 'react'
import CartContext from './CartContext'

const CartContextProvider = ({children}) => {
  const [cartLength, setCartLength] = useState(2)
  return(
    <CartContext.Provider value={{cartLength, setCartLength}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider