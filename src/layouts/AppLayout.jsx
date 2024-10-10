import Footer from '@/components/footer'
import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <div className='main-background items-center'></div>
        <main className='min-h-screen container min-w-full'>
          <Header />
          <Outlet />
        </main>
        <Footer />
        <div className='p-2 text-center bg-{#0e100f} mt-2'>Made by Fagoon</div>
    </div>
    
  )
}

export default AppLayout