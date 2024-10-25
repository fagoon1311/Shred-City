import { zodResolver } from '@hookform/resolvers/zod'
import { State } from 'country-state-city'
import React from 'react'
import { z } from 'zod'

const schema = z.object({
    fullName:z.string().min(1, {message:"Please enter a valid name"}),
    address:z.string().min(1, {message:"Please enter an address"}),
    state: z.enum(State.getStatesOfCountry('IN'), {message:"Please choose a state"}),
    pincode:z.string().min(6, {message:"Enter a valid pincode"}).max(6, {message:"Enter a valid pincode"})
})


const DeliveryDetails = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  }
  );

  
  return (
    <div>DeliveryDetails</div>
  )
}

export default DeliveryDetails