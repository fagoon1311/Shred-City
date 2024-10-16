import { getCart } from '@/api/apiShop';
import CartCard from '@/components/cartcard';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PropagateLoader } from 'react-spinners';
import { z } from 'zod';

const schema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Enter a valid card number" })
    .max(16, { message: "Enter a valid card number" }),
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
    }, { message: "Expiration date should be in future" })
});

const MyCart = () => {
  const { user, isLoaded } = useUser();
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

  const {
    loading: loadingCart,
    error: errorCart,
    data: cartItems,
    fn: fnCart,
  } = useFetch(getCart, {
    userId: user?.id,
  });

  useEffect(() => {
    if (isLoaded) fnCart();
  }, [isLoaded]);

  if (errorCart) return <div className='bg-red-400 rounded-xl'>{errorCart}</div>;
  if (cartItems) console.log(cartItems);
  if (!isLoaded || loadingCart) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <PropagateLoader color="#97fb57" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-10 items-stretch h-screen">
      {/* Left section with cart cards */}
      <div className="md:w-1/2 w-full p-4 flex flex-col">
        {/* Heading for the items */}
        <h2 className="text-white text-xl font-semibold mb-4">Items</h2>
        
        {/* Scrollable list of cart items */}
        <div
          className="flex flex-col overflow-y-auto overflow-x-hidden"
          style={{
            maxHeight: 'calc(100vh - 100px)', // Adjusting for the space taken by the heading and padding
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For Internet Explorer and Edge
          }}
          /* Hide scrollbar for WebKit browsers */
          css={`
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          {cartItems?.map((item) => (
            <CartCard
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              image={item.image_url}
            />
          ))}
        </div>
      </div>
  
      {/* Right section with form */}
      <div className="md:w-1/2 w-full bg-[#0e100f] flex flex-col justify-between p-4">
        <div className='p-5 mt-10'>
          <form className='gap-10 flex flex-col p-2'>
            <div className='flex flex-col'>
              <Input className="bg-white text-black mx-2 my-2 w-full border-0" type='text' placeholder="Card Number" />
              <Input className="bg-white text-black mx-2 my-2 w-full border-0" type='text' placeholder="Cardholder's Name" />
            </div>
            <div className='flex flex-row justify-between items-center'>
              <Input className="bg-white text-black mx-2 my-2 flex-1 border-0" type='text' placeholder="Expiration" />
              <Input className="bg-white text-black mx-2 my-2 flex-1 border-0" type='text' placeholder="CVV" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
