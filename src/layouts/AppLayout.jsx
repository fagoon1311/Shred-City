import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <div className='main-background'></div>
        <main className='min-h-screen container'>
          {/* <Header /> */}
          <Outlet />
        </main>
        <div className='p-2 text-center bg-{#0e100f} mt-2'>Made by Fagoon</div>
    </div>
    
  )
}

export default AppLayout