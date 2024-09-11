import React from 'react'
import services from '../data/servicesdata.json'

const ServiceCards = () => {

  return (
    <div className='flex flex-row gap-10 justify-evenly'>
        {
        services.map((service)=>{
            return (
                <div className='h-[22rem] w-[22rem] rounded-[30px] flex items-center justify-center relative overflow-hidden p-2' key={service.id}>
                  <div className='absolute inset-0 bg-cover bg-center filter blur-[2px]' style={{ backgroundImage: `url(${service.image})` }}></div>
                  <h1 className='text-3xl z-10 text-white font-Poppins text-pretty font-semibold text-center '> {service.title} </h1>
                </div>
              );  
        })
    }
    </div>
    
  )
}

export default ServiceCards