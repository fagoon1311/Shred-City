import ServiceCards from '@/components/servicecards'
import ServiceDetail from '@/components/servicedetails'
import { Button } from '@/components/ui/button'
import React from 'react'

const LandingPage = () => {
  const handleTrialBooking = () => {

  }
  return (
    <div>
      <main>
        {/* Greeting section */}
        <section className="relative section-bg min-h-screen flex flex-col items-center justify-center px-6 z-10">
          <h1 className="font-Poppins text-white   lg:text-8xl font-semibold md:text-6xl">Crush your health and <br></br>fitness goals in no time</h1>
          <p className='font-Poppins text-white mt-5 text-center md:text-sm'>It doesn’t matter if your goal is to get stronger, burn fat, or to just stay fit <br></br> our world class coaches will guide you every step of the way.</p>
          <Button variant='neon' className='mt-10 hover:cur' size='xl' onClick={handleTrialBooking}>Start your Trial</Button>
        </section>

        {/* Services Provided */}
        <section className='flex flex-col px-6'>
          <h1 className='font-Poppins text-white lg:text-5xl md:text-4xl text-center font-bold mt-32 mb-32'>We offer something for <br></br> everybody</h1>
          <ServiceCards />
        </section>

        {/* Description of services */}
        <section>
          <ServiceDetail />
        </section>
      </main>



    </div>
  )
}

export default LandingPage