import React, { forwardRef } from 'react'
import { Input } from './ui/input'
import { SelectContent, Select, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import useFetch from '@/hooks/useFetch'
import { addNewTrial } from '@/api/apiTrial'
import { Button } from './ui/button'

const schema = z.object({
  name: z.string().min(1, {message: "Enter a valid Name."}),
  email: z.string().min(1, {message: "Enter a valid Email Address."}),
  phone: z.string().min(10, {message: "Enter a valid 10 digit contact number"}).max(10, {message: "Enter a valid 10 digit contact number"}),
  membership: z.enum(['Month to Month', '6 Months', '1 Year'],{message:"Please choose a membership type"})
})

const About = forwardRef(({user,showSignIn, setShowSignIn, isSignedIn, isLoaded}, ref) => {
  const {register, handleSubmit, control, formState:{errors}, reset} = useForm({
    resolver: zodResolver(schema)
  })

  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 7); // Add 7 days
  
  // Format the result (optional)
  const yyyy = futureDate.getFullYear();
  const mm = String(futureDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const dd = String(futureDate.getDate()).padStart(2, '0');
  const expiryDate = `${yyyy}-${mm}-${dd}`;

  const {
    loading: loadingNewTrial,
    error: errorTrial,
    fn: fnTrial
  } = useFetch(addNewTrial)

  const onSubmit = (data) => {
    if(!isSignedIn && isLoaded){
      setShowSignIn(true)
      console.log('button pressed', showSignIn) 
      return
    }
    fnTrial({
      ...data,
      trial_id: user.id,
      expires_on:expiryDate

    }).then(()=>{
      reset()
    })
  }
  return (
    <div ref={ref} className='flex flex-col items-center mt-32'>
        <div className='flex flex-col items-center'>
            <div className='border border-[#a5e87ca4] w-[12rem] rounded-full p-2 text-center mb-16'>About Shred City</div>
            <h1 className='font-Poppins font-bold text-5xl text-center'>
                Hi! We’re a local CrossFit gym in <br></br>New Delhi, India.
            </h1>
            <div className='w-1/2 mt-10 font-Poppins text-center'>
                <p className='text-sm'>At Shred City, we’re dedicated to helping individuals reach their fitness goals, stay healthy, and live life fully. Our mission is to ensure that fitness is a support, not an obstacle, for people in New Delhi.</p>
            </div>
        </div>

        <div className='grid grid-cols-2 gap-24 mt-10'>
            <div className='col-span-1 flex items-center justify-center'>
              <form className='w-[25rem] flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
                <Input 
                type='text'
                placeholder='Name'
                className='bg-black mb-6 text-white border-[#97fb57] border-[3px] h-16 rounded-3xl'
                {...register('name')}
                />

                {
                  errors.name && (
                    <p className='text-red-500'>{errors.name.message}</p>
                  )
                }
              
                <Input 
                type='text'
                placeholder='email'
                className='bg-black text-white border-[#97fb57] border-[3px] mb-6 h-16 rounded-3xl'
                {...register('email')}
                />
                {
                  errors.email && (
                    <p className='text-red-500'>{errors.email.message}</p>
                  )
                }
                <Input 
                type='text'
                placeholder='Phone Number'
                className='bg-black text-white border-[#97fb57] border-[3px] mb-6 h-16 rounded-3xl'
                {...register('phone')}
                />

                {
                  errors.phone && (
                    <p className='text-red-500'>{errors.phone.message}</p>
                  )
                }

                <Controller 
                    name='membership'
                    control={control}
                    render={({field})=>(
                      <Select className='flex-1' onValueChange={field.onChange} {...field}>
                      <SelectTrigger className='bg-black text-white border-[#97fb57] border-[3px] h-16 rounded-3xl'>
                        <SelectValue placeholder="Select Membership" />
                      </SelectTrigger>
                      <SelectContent className='bg-black text-white'  >
                        <SelectItem value="Month to Month">Month to Month</SelectItem>
                        <SelectItem value="6 Months">6 Months</SelectItem>
                        <SelectItem value="1 Year">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                    )}
                />

              {
                errors.membership && (
                  <p className='text-red-500'>{errors.membership.message}</p>
                )
              }
              <Button type='submit' variant='neon' className='mt-5 rounded-3xl w-full'>Submit</Button>

              </form>
              </div>
              <div className='col-span-1'>
                <img src='./about.png' alt='about' className='h-[25rem]'></img>
              </div>
        </div>

    </div>
  )
})

export default About