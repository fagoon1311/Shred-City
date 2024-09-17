import About from '@/components/about'
import MemberShipCards from '@/components/membershipcards'
import ServiceCards from '@/components/servicecards'
import ServiceDetail from '@/components/servicedetails'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import React, { useRef } from 'react'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/protectedroute'



const LandingPage = () => {
  const {isLoaded, user, isSignedIn} = useUser()
  

  const aboutRef = useRef() 
  const handleTrialBooking = (ref) => {
      if (ref?.current) {
        window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
      } else {
        console.error("Ref is not available yet.");
    }  
  }
  return (
    <div>
      <main>
        {/* Greeting section */}
        <section className="relative section-bg min-h-screen flex flex-col items-center justify-center px-6 z-10">
          <h1 className="font-Poppins text-white   lg:text-8xl font-semibold md:text-6xl">Crush your health and <br></br>fitness goals in no time</h1>
          <p className='font-Poppins text-white mt-5 text-center md:text-sm'>It doesn’t matter if your goal is to get stronger, burn fat, or to just stay fit <br></br> our world class coaches will guide you every step of the way.</p>
          <Button variant='neon' className='mt-10 hover:cur' size='xl' onClick={()=>handleTrialBooking(aboutRef)}>Start your Trial</Button>
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
        {/* Memberships */}
        <section className='flex flex-col gap-6 bg-[#5f7252] pt-10 pb-20'>
          <div className='flex flex-col items-center gap-10 mb-8 mt-20'>
              <div className='border border-white rounded-l-full rounded-r-full w-[10rem] p-2 text-center '>
                Memberships
              </div>
              <div className='w-2/3 text-center'>
                <h1 className='font-Poppins text-5xl font-bold'>
                  Crushing your health and fitness goals starts here...
                </h1>
              </div>
          </div>
          <MemberShipCards />
        </section>
        {/* About Section */}
        <section>
          <About ref={aboutRef} user={user} />
        </section>

      </main>



    </div>
  )
}

export default LandingPage