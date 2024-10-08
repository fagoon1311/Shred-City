import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-28'>
        <img src='./sc-logo.png' alt='logo' className='h-14 w-64'></img>
        <h1 className='font-Poppins mt-16 text-xs'>Our Official Partners</h1>
        <div className='flex h-10 space-x-4 items-center justify-evenly mt-10 mb-10 gap-10'>
            <img src='./puma.png' alt='puma' className='h-32 w-32 object-contain'></img>
            <img src='./nike.png' alt='nike' className='h-32 w-32 object-contain'></img>
            <img src='./mb.png' alt='mb' className='h-32 w-32 object-contain'></img>
        </div>
    </div>
  )
}

export default Footer
