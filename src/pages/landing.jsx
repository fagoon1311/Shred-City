import About from '@/components/about'
import MemberShipCards from '@/components/membershipcards'
import ServiceCards from '@/components/servicecards'
import ServiceDetail from '@/components/servicedetails'
import { Button } from '@/components/ui/button'
import { SignIn, useUser } from '@clerk/clerk-react'
import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useOutletContext, useSearchParams } from 'react-router-dom'


const LandingPage = () => {
  const {isLoaded, user, isSignedIn} = useUser()
  const [showSignIn, setShowSignIn] = useState(false)
  const [search, setSearch] = useSearchParams()
  const {aboutRefForScroll, scrollToAbout, memberShipRefForScroll, scrollToMemberShipCards} = useOutletContext()

  useEffect(()=>{
    if(search.get('sign-in')){
      setShowSignIn(true)
    }
  }, [search])

  const handleOverlayClick = (e) =>{
    if(e.target === e.currentTarget){
      setShowSignIn(false)
      setSearch({})
    }
  }

  return (
    <div>
      <main>
        {/* Greeting section */}
        <section className="relative section-bg min-h-screen flex flex-col items-center justify-center px-6 z-10">
          <h1 className="font-Poppins text-white   lg:text-8xl font-semibold md:text-6xl">Crush your health and <br></br>fitness goals in no time</h1>
          <p className='font-Poppins text-white mt-5 text-center md:text-sm'>It doesn’t matter if your goal is to get stronger, burn fat, or to just stay fit <br></br> our world class coaches will guide you every step of the way.</p>
          <Button variant='neon' className='mt-10 hover:cur' size='xl' onClick={()=>{
            scrollToAbout()
            if(!isSignedIn && isLoaded)setShowSignIn(true) 
            }}>Start your Trial</Button>
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
          <MemberShipCards onStartTrialClick={scrollToAbout} ref={memberShipRefForScroll}/>
        </section>
        {/* About Section */}
        <section>
          <About ref={aboutRefForScroll} user={user} showSignIn={showSignIn} setShowSignIn={setShowSignIn} isSignedIn={isSignedIn} isLoaded={isLoaded} />
        </section>
        {
          showSignIn && <div className='fixed inset-10 z-30 flex items-center justify-center' onClick={handleOverlayClick}>
          <SignIn 
            signUpForceRedirectUrl='/'
            fallbackRedirectUrl='/'            
          />
        </div>
        }

      </main>



    </div>
  )
}

export default LandingPage