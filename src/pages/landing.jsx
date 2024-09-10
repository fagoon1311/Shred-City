import { Button } from '@/components/ui/button'
import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <main>
        <section className="relative section-bg min-h-screen flex flex-col items-center justify-center px-6">
          <h1 className="font-Poppins text-white z-10  lg:text-8xl font-semibold md:text-6xl">Crush your health and <br></br>fitness goals in no time.</h1>
          <Button variant='neon' className='mt-10 hover:cur' size='xl'>Start your Trial</Button>

        </section>
      </main>

    </div>
  )
}

export default LandingPage