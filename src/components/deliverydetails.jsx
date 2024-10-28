import { zodResolver } from '@hookform/resolvers/zod'
import { SelectContent, Select, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { State } from 'country-state-city'
import React from 'react'
import { z } from 'zod'
import { Input } from './ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { CircleX } from 'lucide-react'
import { Textarea } from './ui/textarea'


const schema = z.object({
    fullName:z.string().min(1, {message:"Please enter a valid name"}),
    address:z.string().min(1, {message:"Please enter an address"}),
    state: z.enum(State.getStatesOfCountry('IN').map((state) => state.name), {message:"Please choose a state"}),
    pincode:z.string().min(6, {message:"Enter a valid pincode"}).max(6, {message:"Enter a valid pincode"})
})


const DeliveryDetails = ({handleDeliveryData, showDeliveryDetails, setShowDeliveryDetails }) => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  }
  )
  console.log("from DD",showDeliveryDetails)

  const onSubmit = (data) => {
    handleDeliveryData(data)
    setShowDeliveryDetails(false)
        
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-10 bg-black bg-opacity-90">
      <form className="w-[25rem] p-6  rounded-lg shadow-lg flex flex-col items-center gap-4 bg-black " onSubmit={handleSubmit(onSubmit)}>
      <div className='flex-row items-end justify-end'><button className='bg-transparent' onClick={()=>{
        setShowDeliveryDetails(false)
        console.log("X pressed")
        }}><CircleX /></button></div>
        <Input className="bg-black text-white border-[#97fb57] border-[2px] h-10 rounded-3xl" type="text" placeholder="Enter Full name" {...register('fullName')} />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}
        <Textarea placeholder='Billing Address' className='bg-black text-white border-[#97fb57] border-[2px] rounded-3xl' {...register('address')}/>
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <Select className="flex-1" onValueChange={field.onChange} {...field}>
              <SelectTrigger className="bg-black text-white border-[#97fb57] border-[2px] h-10 rounded-3xl">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                {State.getStatesOfCountry("IN").map((state) => 
                <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>
                )}
              </SelectContent>
            </Select>
          )}
        />
        {errors.state && (
          <p className="text-red-500">{errors.state.message}</p>
        )}
        <Input className="bg-black text-white border-[#97fb57] border-[2px] h-10 rounded-3xl" type="text" placeholder="Enter Pincode" {...register('pincode')} />
        {errors.pincode && (
          <p className="text-red-500">{errors.pincode.message}</p>
        )}
        <Button type="submit" variant="neon" className="mt-5 rounded-3xl w-full">Confirm Order</Button>
      </form>
    </div>
  );

}

export default DeliveryDetails