import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [showSignIn, setShowSignIn] = useState()
    const {user} = useUser()
    console.log(user)
  return (
    <>
        <nav className='py-4 flex justify-between items-center w-full px-4'>
            <Link >
                <img src='./sc-logo.png' alt='logo' className='h-14'></img>
            </Link>
            <div className='flex gap-8'>
                <h1>Memberships</h1>
                <h1>Shop</h1>
                <h1>Contact</h1>
                <h1>Login/logout</h1>
            </div>
            {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        </nav>
    </>
  )
}

export default Header