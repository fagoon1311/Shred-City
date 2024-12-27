import { getMyMemberShip, getMyTrialInfo } from '@/api/apiTrial';
import MemberShipCards from '@/components/membershipcards';
import SubscriptionDetails from '@/components/subscriptiondetails';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners'; 

const MyMemberships = () => {
  const { isLoaded, user } = useUser();
  const [showMembershipForm, setShowMembershipForm] = useState(false)
  const [membershipData, setMemberShipData] = useState(null)

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
    setMemberShipData(data)
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
  if(membershipData)console.log("Membership data collected from form ", membershipData)
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      {/* {trialsData || membershipsData ? (
        <div className="flex flex-col">
          {trialsData && (
            <div>
              <h2>Trials</h2>
              <pre>{JSON.stringify(trialsData, null, 2)}</pre>
            </div>
          )}
          {membershipsData && (
            <div>
              <h2>Memberships</h2>
              <pre>{JSON.stringify(membershipsData, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : ( */}
        <div className="flex items-center justify-center flex-col">
            <MemberShipCards renderMode={'subscribe'} onSubscribeClick={onSubscribeClick} />
            {
              showMembershipForm && <SubscriptionDetails setShowMembershipForm={setShowMembershipForm} handleMemberShipData={handleMemberShipData}/>
            }
        </div>
      
    </div>
  );
};

export default MyMemberships;
