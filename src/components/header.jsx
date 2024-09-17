import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'

const Header = () => {
    
    const [showSignIn, setShowSignIn] = useState(false)
    const {user} = useUser()
    console.log(user)

    const [search, setSearch] = useSearchParams()

    useEffect(()=>{
      if(search.get('sign-in')){
        setShowSignIn(true)
      }
    }, [search])


    const handleOverlayClick = (e) => {
      if(e.target === e.currentTarget){
        setShowSignIn(false)
        setSearch({})
      }
    }

  return (
    <>
        <nav className='py-4 flex justify-between items-center w-full px-4'>
            <Link >
                <img src='./sc-logo.png' alt='logo' className='h-14'></img>
            </Link>
            <div className='flex gap-12'>
                <h1>Memberships</h1>
                <h1><span className='flex gap-2'><ShoppingBag color='#97fb57' />Shop</span></h1>
                <h1>Contact</h1>
                <div>
                  <SignedOut>
                    <Button variant='neon' className='rounded-l-full rounded-r-full h-8' onClick={()=>setShowSignIn(true)}> Login </Button>
                  </SignedOut>
                  <SignedIn>
                    <UserButton appearance={{
                        elements:{
                        avatarBox: "w-10 h-10"
                      }
                    }}>
                      <UserButton.MenuItems>
                        <UserButton.Link label='My Membership' href='/my-memberships'/>
                      </UserButton.MenuItems>
                    </UserButton>
                  </SignedIn>
                </div>
            </div>
            
        </nav>
        {
          showSignIn && <div className='fixed inset-10 z-30 flex items-center justify-center' onClick={handleOverlayClick}>
            <SignIn 
              signUpForceRedirectUrl='/'
              fallbackRedirectUrl='/'            
            />
          </div>
        }
    </>
  )
}

export default Header