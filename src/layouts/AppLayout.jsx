import Footer from '@/components/footer'
import Header from '@/components/header'
import React, { useRef } from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  const aboutRefForScroll = useRef(null)
  const memberShipRefForScroll = useRef(null)
  const scrollToAbout = () => {
    if(aboutRefForScroll.current){
      aboutRefForScroll.current.scrollIntoView({behavior: "smooth"})
    }
  }
  const scrollToMemberShipCards = () => {
    if(memberShipRefForScroll.current){
      memberShipRefForScroll.current.scrollIntoView({behavior:"smooth"})
    }
  }
  return (
    <div>
        <div className='main-background items-center'></div>
        <main className='min-h-screen container min-w-full'>
          <Header onContactClick={scrollToAbout} onMembershipClick={scrollToMemberShipCards}/>
          <Outlet context={{aboutRefForScroll, scrollToAbout, memberShipRefForScroll, scrollToMemberShipCards}}/>
        </main>
        <Footer />
        <div className='p-2 text-center bg-{#0e100f} mt-2'>Made by Fagoon</div>
    </div>
    
  )
}

export default AppLayout