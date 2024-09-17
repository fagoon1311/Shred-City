import React from 'react'
import data from '../data/trainingdata.json'
import { CircleCheck } from 'lucide-react'

const ServiceDetail = () => {
  return (
    <div className='p-20'>
        {
            data.map((details)=>{
                return(
                    details.orientation==='right' ? 
                    <div key={details.id} className='grid grid-cols-2 mt-20 mb-20'>
                        <div className='flex flex-col col-span-1 gap-10 justify-center p-5 '>
                            <div className='border border-[#a5e87ca4] w-[12rem] rounded-full p-2 text-center mb-5'>{details.title}</div>
                            <h1 className='font-Poppins text-5xl font-semibold'>{details.description}</h1>
                            <ul className=''>
                                {
                                    details.pointers.map((pointer, index)=><li key={index} className='font-Poppins py-4'><span className='flex gap-2'><CircleCheck color='#97fb57'/> {pointer}</span></li>)
                                }
                            </ul>
                        </div>
                        <div className='col-span-1 flex items-center'>
                            <img className='rounded-3xl h-[50rem]' src={details.image} ></img>
                        </div>
                    </div>
                    :
                    <div key={details.id} className='grid grid-cols-2 mt-20 mb-20'>
                    
                    <div className='col-span-1 flex items-center'>
                        <img className='rounded-3xl h-[50rem]' src={details.image} ></img>
                    </div>
                    <div className='flex flex-col col-span-1 gap-10 justify-center p-5 '>
                        <div className='border border-[#a5e87ca4] w-[12rem] rounded-full p-2 text-center mb-5'>{details.title}</div>
                        <h1 className='font-Poppins text-5xl font-semibold'>{details.description}</h1>
                        <ul className=''>
                            {
                                details.pointers.map((pointer, index)=><li key={index} className='font-Poppins py-4'><span className='flex gap-2'><CircleCheck color='#97fb57'/> {pointer}</span></li>)
                            }
                        </ul>
                    </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ServiceDetail