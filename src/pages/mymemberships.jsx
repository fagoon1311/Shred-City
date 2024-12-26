import { getMyMemberShip, getMyTrialInfo } from '@/api/apiTrial';
import MemberShipCards from '@/components/membershipcards';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { PropagateLoader } from 'react-spinners';
import { z } from 'zod';

const schema = z.object({
  fullName: z.string().min(1, {message: "Enter your fullname"}),
  DOB: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])(19|20)\d\d$/, {message: "Enter DOB in DDMMYY"}),
  contact: z.string().max(10, {message:"Enter a valid Mobile Number"}).min(10, {message:"Enter a valid Mobile Number"}),
  Address: z.string().min(1, {message:"Enter a valid Address"}),
  cardNumber: z.string().min(16, {message: "Invalid Card Number"}).max(16, {message: "Invalid Card Number"}),
  cardHolderName: z
    .string()
    .min(1, "Enter a valid name"),
  expiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Enter a valid expiration date (MM/YY)" })
    .refine((value) => {
      const [month, year] = value.split('/');
      if (!month || !year) return false;
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      return year > currentYear || (year === currentYear && month >= currentMonth);
    }, { message: "Expiration date should be in future" }),
    cvv: z
    .string()
    .min(3, {message: "Enter a valid CVV"})
    .max(3, {message: "Enter a valid CVV"})
  
})

const MyMemberships = () => {
  const { isLoaded, user } = useUser();
   

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
            <MemberShipCards renderMode={'subscribe'} onSubscribeClick={onSubscribeClick}/>
            <form>

            </form>
        </div>
      
    </div>
  );
};

export default MyMemberships;
