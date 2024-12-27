import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { CircleX } from 'lucide-react';

const schema = z.object({
  fullName: z.string().min(1, {message: "Enter your fullname"}),
  dateOfBirth: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])(19|20)\d\d$/, {message: "Enter DOB in DDMMYYYY"}),
  email:z.string().regex(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    { message: "Enter a valid email address" }
  ),
  contact: z.string().max(10, {message:"Enter a valid Mobile Number"}).min(10, {message:"Enter a valid Mobile Number"}),
  address: z.string().min(1, {message:"Enter a valid Address"}),
  //membership: z.enum(['Month to Month', '6 Months', '1 Year'],{message:"Please choose a membership type"}),
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

const SubscriptionDetails = ({ setShowMembershipForm, handleMemberShipData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Submitting deets")
        handleMemberShipData(data);
        setShowMembershipForm(false);
    };
    if(errors){console.log(errors)}
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center p-10 bg-black bg-opacity-90">
            <div className="flex-row items-end justify-end">
                <button
                    className="bg-transparent"
                    onClick={() => setShowMembershipForm(false)}
                >
                    <CircleX />
                </button>
            </div>
            <form
                className="w-[25rem] p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 bg-black"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    className={`bg-black text-white border-[2px] h-10 rounded-3xl w-full ${
                        errors.fullName ? "border-red-500" : "border-[#97fb57]"
                    }`}
                    type="text"
                    placeholder={errors.fullName ? errors.fullName.message : "Enter Full Name"}
                    {...register("fullName")}
                />
                

                <Input
                    className={`bg-black text-white border-[2px] h-10 rounded-3xl w-full ${
                        errors.dateOfBirth ? "border-red-500" : "border-[#97fb57]"
                    }`}
                    type="text"
                    placeholder={errors.dateOfBirth ? errors.dateOfBirth.message : "DOB (DDMMYYYY)"}
                    {...register("dateOfBirth")}
                />

                <Input
                    className={`bg-black text-white border-[2px] h-10 rounded-3xl w-full ${
                        errors.email ? "border-red-500" : "border-[#97fb57]"
                    }`}
                    type="text"
                    placeholder={errors.email ? errors.email.message : "Email"}
                    {...register("email")}
                />

                <Input
                    className={`bg-black text-white border-[2px] h-10 rounded-3xl w-full ${
                        errors.contact ? "border-red-500" : "border-[#97fb57]"
                    }`}
                    type="text"
                    placeholder={errors.contact ? errors.contact.message : "Mobile Number"}
                    {...register("contact")}
                />

                <Textarea
                    className={`bg-black text-white border-[2px] rounded-3xl w-full ${
                        errors.address ? "border-red-500" : "border-[#97fb57]"
                    }`}
                    placeholder={errors.address ? errors.address.message : "Address"}
                    {...register("address")}
                />

                <Input
                    className={`bg-black text-white border-[2px] h-10 rounded-3xl w-full ${
                        errors.cardNumber ? "border-red-500" : "border-[#97fb57]"
                    }`}
                    type="text"
                    placeholder={errors.cardNumber ? errors.cardNumber.message : "Card Number"}
                    {...register("cardNumber")}
                />

                <Input
                    className={`bg-black text-white border-[2px] h-10 rounded-3xl w-full ${
                        errors.expiration ? "border-red-500" : "border-[#97fb57]"
                    }`}
                    type="text"
                    placeholder={
                        errors.expiration ? errors.expiration.message : "Expiration Date (MM/YY)"
                    }
                    {...register("expiration")}
                />

                <Input
                    className={`bg-black text-white border-[2px] h-10 rounded-3xl w-full ${
                        errors.cvv ? "border-red-500" : "border-[#97fb57]"
                    }`}
                    type="text"
                    placeholder={errors.cvv ? errors.cvv.message : "CVV"}
                    {...register("cvv")}
                />

                <Button type="submit" variant="neon" className="mt-5 rounded-3xl w-full">
                    Confirm
                </Button>
            </form>
        </div>
    );
};

export default SubscriptionDetails;
    