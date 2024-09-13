import React from 'react'
import { Input } from './ui/input'
import { SelectContent, Select, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const About = () => {
  return (
    <div className='flex flex-col items-center mt-32'>
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
              <form className='w-[25rem]'>
                <Input 
                type='text'
                placeholder='Name'
                />
                <Input 
                type='text'
                placeholder='email'
                />
                <Input 
                type='text'
                placeholder='Phone Number'
                />
                <Select >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Membership" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="light">Month to Month</SelectItem>
                    <SelectItem value="dark">6 Months</SelectItem>
                    <SelectItem value="system">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </form>
              </div>
              <div className='col-span-1'>
                <img src='./about.png' alt='about' className='h-[25rem]'></img>
              </div>
        </div>

    </div>
  )
}

export default About