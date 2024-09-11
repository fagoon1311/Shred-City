import React from 'react'
import data from '../data/trainingdata.json'
import { CircleCheck } from 'lucide-react'

const ServiceDetail = () => {
  return (
    <div className='p-20'>
        {
            data.map((details)=>{
                return(
                    <div className='grid grid-cols-2'>
                        <div className='flex flex-col col-span-1 gap-10 justify-center p-5 '>
                            <div className='border border-[#97fb57] w-[15rem] rounded-full p-2 text-center mb-5'>{details.title}</div>
                            <h1 className='font-Poppins text-3xl font-semibold'>{details.description}</h1>
                            <ul className=''>
                                {
                                    details.pointers.map((pointer)=><li className='text-xl font-Poppins'><span className='flex gap-2'><CircleCheck color='#97fb57'/> {pointer}</span></li>)
                                }
                            </ul>
                        </div>
                        <div className='col-span-1 flex items-center'>
                            <img className='rounded-3xl h-[50rem]' src={details.image} ></img>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ServiceDetail