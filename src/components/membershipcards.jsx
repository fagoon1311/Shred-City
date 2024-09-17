import React from 'react'
import { Button } from './ui/button'
import membershipdata from '../data/membershipdata.json'
import { CircleCheck } from 'lucide-react'


const MemberShipCards = () => {
  return (
    <div className='flex justify-evenly gap-8'>
        {
        membershipdata.map((data)=>{
            return(
                <div key={data.id} className='bg-[#f7f6f2] p-6 h-[30rem] w-[25rem] rounded-3xl flex flex-col items-center justify-evenly' >
                    <div className='mb-5 mt-10 text-center w-[13rem] items-center'>
                        <h1 className='text-black font-Poppins text-4xl font-bold'>{data.plan}</h1>
                        <h1 className='text-[#5f7252] font-Poppins text-3xl font-bold'>{data.price}</h1>
                    </div>
                    <ul >
                        {
                            data.features.map((feature, index)=> <li key={index}className='font-Poppins tracking-tighter py-2 text-black'><span className='flex gap-2'><CircleCheck color='#5f7252'/> {feature}</span></li>)
                        }
                    </ul>
                    <p className='text-slate-600 mt-2 mb-2'>{data.payment_info}</p>
                    <Button variant='outline' className='rounded-l-full rounded-r-full'>Start 7 day trial</Button>
                </div>
            )
        })
        }
    </div>
    
  )
}

export default MemberShipCards