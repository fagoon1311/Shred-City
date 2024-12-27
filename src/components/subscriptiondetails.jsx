import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from './ui/input';
import React from 'react';
import { Button } from './ui/button';

const schema = z.object({
  fullName: z.string().min(1, {message: "Enter your fullname"}),
  dateOfBirth: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])(19|20)\d\d$/, {message: "Enter DOB in DDMMYY"}),
  contact: z.string().max(10, {message:"Enter a valid Mobile Number"}).min(10, {message:"Enter a valid Mobile Number"}),
  address: z.string().min(1, {message:"Enter a valid Address"}),
  cardNumber: z.string().min(16, {message: "Invalid Card Number"}).max(16, {message: "Invalid Card Number"}),
  expiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Enter a valid expiration date (MM/YY)" })
    .refine((value) => {
      const [month, year] = value.split('/');
      if (!month || !year) return false;
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      return year > currentYear || (year === currentYear && month >= currentMonth);
    }, { message: "Expiration date should be in future" }),
    cvv: z
    .string()
    .min(3, {message: "Enter a valid CVV"})
    .max(3, {message: "Enter a valid CVV"})
  
})

const subscriptiondetails = () => {
    const {register, handleSubmit, control, formState:{errors}, reset} = useForm({
        resolver: zodResolver(schema)
    })
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center p-10 bg-black bg-opacity-90">
            <form className="w-[25rem] p-6  rounded-lg shadow-lg flex flex-col items-center gap-4 bg-black">
                <Input className="bg-black text-white border-[#97fb57] border-[2px] h-10 rounded-3xl" type="text" placeholder="Enter Full name" {...register('fullName')} />
                {errors.fullName && (
                    <p className="text-red-500">{errors.fullName.message}</p>
                )}
                <Input className="bg-black text-white border-[#97fb57] border-[2px] h-10 rounded-3xl" type="text" placeholder="DOB (DDMMYY)" {...register('dateOfBirth')} />
                {errors.dateOfBirth && (
                    <p className="text-red-500">{errors.dateOfBirth.message}</p>
                )}
                <Input className="bg-black text-white border-[#97fb57] border-[2px] h-10 rounded-3xl" type="text" placeholder="Mobile Number" {...register('contact')} />
                {errors.contact && (
                    <p className="text-red-500">{errors.contact.message}</p>
                )}
                <Textarea placeholder='Address' className='bg-black text-white border-[#97fb57] border-[2px] rounded-3xl' {...register('address')}/>
                {errors.address && (
                    <p className="text-red-500">{errors.address.message}</p>
                )}
                <Input className="bg-black text-white border-[#97fb57] border-[2px] h-10 rounded-3xl" type="text" placeholder="Card Number" {...register('cardNumber')} />
                {errors.cardNumber && (
                    <p className="text-red-500">{errors.cardNumber.message}</p>
                )}
            
                <Input className="bg-black text-white border-[#97fb57] border-[2px] h-10 rounded-3xl" type="text" placeholder="Expiration Date (MM/YY)" {...register('expiration')} />
                {errors.expiration && (
                    <p className="text-red-500">{errors.expiration.message}</p>
                )}
                <Input className="bg-black text-white border-[#97fb57] border-[2px] h-10 rounded-3xl" type="text" placeholder="CVV" {...register('cvv')} />
                {errors.cvv && (
                    <p className="text-red-500">{errors.cvv.message}</p>
                )}
                <Button type="submit" variant="neon" className="mt-5 rounded-3xl w-full">Confirm</Button>
            </form>
        </div>
    )
}

export default subscriptiondetails