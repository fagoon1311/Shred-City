import { addNewMembership, getMyMemberShip, getMyTrialInfo } from '@/api/apiTrial';
import MemberShipCards from '@/components/membershipcards';
import OnGoingSubs from '@/components/ongoingsubs';
import SubscriptionDetails from '@/components/subscriptiondetails';
import TrialsData from '@/components/trialsdata';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners'; 

const MyMemberships = () => {
  const { isLoaded, user } = useUser();
  const [showMembershipForm, setShowMembershipForm] = useState(false)

  const {
    loading: loadingMemberships,
    error: errorMemberships,
    data: membershipsData,
    fn: fnMembershipData,
  } = useFetch(getMyMemberShip, { userId: user?.id });

  const {
    loading: loadingTrialsData,
    error: errorTrialsData,
    data: trialsData,
    fn: fnTrialData,
  } = useFetch(getMyTrialInfo, { userId: user?.id });

  const {
    loading: loadingNewMembership,
    error: errorLoadingNewMembership,
    fn: fnNewMem
  } = useFetch(addNewMembership)

  useEffect(() => {
    if (isLoaded && user?.id) {
      fnMembershipData();
      fnTrialData();
    }
  }, [isLoaded, user?.id]);


  const onSubscribeClick = (id) => {
    console.log("Subscribed to - ", id)
    setShowMembershipForm(true)
  }

  const handleMemberShipData = (data) => {
    console.log("Forms submitted data", data)
    fnNewMem(
      {
        user_id: user?.id,
        name: data?.fullName,
        date_of_birth: data?.dateOfBirth,
        email:data?.email,
        contact:data?.contact,
        address:data?.address,
        type:data?.membership

      }
    )
  }

  if (loadingMemberships || loadingTrialsData) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <PropagateLoader color="#97fb57" size={40} />
      </div>
    );
  }

  if (errorMemberships || errorTrialsData) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <h1 className="text-red-500 text-lg">
          {errorMemberships?.message || errorTrialsData?.message || 'Something went wrong. Please try again.'}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      { trialsData || membershipsData ? (
        <div className="flex flex-col">
          {trialsData && (
            <TrialsData data = {trialsData}/>
          )}
          {membershipsData && (
            <OnGoingSubs data = {membershipsData}/>
            
          )}
        </div>
      ) : ( 
        <div className="flex items-center justify-center flex-col">
            <MemberShipCards renderMode={'subscribe'} onSubscribeClick={onSubscribeClick} />
            {
              showMembershipForm && <SubscriptionDetails setShowMembershipForm={setShowMembershipForm} handleMemberShipData={handleMemberShipData}/>
            }
        </div>
      )}
    </div>
  
)};

export default MyMemberships;
