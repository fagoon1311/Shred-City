import { zodResolver } from '@hookform/resolvers/zod'
import { SelectContent, Select, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { State } from 'country-state-city'
import React from 'react'
import { z } from 'zod'
import { Input } from './ui/input'
import { Controller } from 'react-hook-form'


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
  )

  return (
    <div>
      <form>
        <Input type='text' placeholder='Enter Full name' {...register('fullName')}/>
            {
              errors.fullName && (
                <p className='text-red-500'>{errors.fullName.message}</p>
              )
            }
        <Input type='text' placeholder='Enter Billing Address' {...register('address')}/>
            {
              errors.address && (
                <p className='text-red-500'>{errors.address.message}</p>
              )
            }
        <Controller
              name='state'
              control={control}
              render={({field})=>(
                <Select className='flex-1' onValueChange={field.onChange} {...field}>
                  <SelectTrigger className='bg-black text-white border-[#97fb57] border-[3px] h-16 rounded-3xl'>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className='bg-black text-white'  >
                    {
                      State.getStatesOfCountry("IN").map((state)=>{
                        <SelectItem value={state}>{state}</SelectItem>
                      })
                    }
                  </SelectContent>
                </Select>
                )}
                />
            {
              errors.state && (
                <p className='text-red-500'>{errors.state.message}</p>
              )
            }
        <Input type='text' placeholder='Enter Pincode' {...register('pincode')}/>
            {
              errors.pincode && (
                <p className='text-red-500'>{errors.pincode.message}</p>
              )
            }
        
        <Button type='submit' variant='neon' className='mt-5 rounded-3xl w-full'>Confirm Order</Button>
      </form>
    </div>
  )
}

export default DeliveryDetails