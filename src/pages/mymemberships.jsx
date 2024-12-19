import { getMyMemberShip, getMyTrialInfo } from '@/api/apiTrial'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'

const MyMemberships = () => {
  const {isLoaded, user} = useUser()

  const {
    loading: loadingMemberships,
    error: errorMemberships,
    data: membershipsData,
    fn: fnMembershipData
  } = useFetch(getMyMemberShip, {
    userId: user?.id
  })

  const {
    loading: loadingTrialsData,
    error: errorTrialsData,
    data: trialsData,
    fn: fnTrialData
  } = useFetch(getMyTrialInfo, {
    userId: user?.id
  })


  useEffect(()=>{
    if(isLoaded){
      fnMembershipData()
      fnTrialData()
    }
  },[])  

  if(trialsData) console.log(trialsData)
  if(membershipsData) console.log(membershipsData)
  return (
    trialsData || membershipsData ?
    <div className='flex flex-col'>
      <div>
        
      </div>
      <div>
        
      </div>
    </div>
    :
    <div className='flex items-center justify-center flex-col h-screen'>
    <h1 className='font-Poppins text-6xl font-semibold mb-5'>You dont have any active subscriptions / trials.</h1>
    </div>
  )
}

export default MyMemberships