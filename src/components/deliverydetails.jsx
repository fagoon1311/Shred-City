import React from 'react'
import { z } from 'zod'


const schema = z.object({
    fullName:z.string().min(1, {message:"Please enter a valid name"}),
    address:z.string().min(1, {message:"Please enter an address"}),

})
const DeliveryDetails = () => {

  return (
    <div>DeliveryDetails</div>
  )
}

export default DeliveryDetails