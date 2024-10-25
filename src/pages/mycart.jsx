import { getCart } from '@/api/apiShop';
import CartCard from '@/components/cartcard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import { ArrowRight, Carrot } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
    }, { message: "Expiration date should be in future" }),
    cvv: z
    .string()
    .min(3, {message: "Enter a valid CVV"})
    .max(3, {message: "Enter a valid CVV"})
});

const MyCart = () => {
  const { user, isLoaded } = useUser();
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  
  //console.log(user)
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

  useEffect(()=>{
    if(cartItems) setCart(cartItems)
  }, [cartItems])

  useEffect(()=>{
    if(cart){
      setTotalPrice(cart?.reduce((acc, curr)=> acc + curr.price * curr.quantity, 0))
    }
  },[cart])

  const handleItemRemoval = (id) => {
    setCart(cart?.filter(item=>item.id !== id))
  }

  if (errorCart) return <div className='bg-red-400 rounded-xl'>{errorCart}</div>;
  //if (cartItems) console.log(cartItems);
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

        <h2 className="text-white text-2xl ml-7 font-semibold mb-4">Cart Items</h2>
        
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
          {cart?.map((item,index) => (
            <CartCard
              key={index}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              image={item.image_url}
              onItemRemoval={handleItemRemoval}
            />
          ))}
        </div>
      </div>
  
      {/* Right section with form */}
      <div className="md:w-1/2 w-full bg-[#0e100f] flex flex-col p-4 rounded-xl">
        {/* Image section */}
        <div className='flex justify-between mt-5'>
          <h1 className="text-white text-2xl ml-7 font-semibold mb-4">Card Details</h1>
          <img src={user?.imageUrl} className='h-20 rounded-xl'></img>
        </div>
        <h1 className="text-white text-sm ml-7 mt-4">Accepted Cards</h1>
        <div className="flex p-5 gap-2">
          <img src="/mastercard.png" alt="Card brands" className='px-1 h-10'/>
          <img src="/visa.png" alt="Card brands" className='px-1 h-10'/>
          <img src="/amex.png" alt="Card brands" className='px-1 h-10'/>
          <img src="/paytm.png" alt="Card brands" className='px-1 h-10'/>
          <img src="/google-pay.png" alt="Card brands" className='px-1 h-10'/>
        </div>

        {/* Form section */}
        <div className="p-5">
          <form className=" flex flex-col " onSubmit={handleSubmit(data => console.log(data))}>
            <div className="flex flex-col">
              <Input
                {...register("cardNumber")}
                className="bg-white text-black mx-2 my-3 w-[100] border-0 rounded-lg p-3"
                type="text"
                placeholder="Card Number"
              />
              <Input
                {...register("cardHolderName")}
                className="bg-white text-black mx-2 my-3 w-[100] border-0 rounded-lg p-3"
                type="text"
                placeholder="Cardholder's Name"
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <Input
                {...register("expiration")}
                className="bg-white text-black mx-2 my-3 flex-1 border-0 rounded-lg p-3"
                type="text"
                placeholder="Expiration"
              />
              <Input
              {...register("cvv")}
                className="bg-white text-black mx-2 my-3 flex-1 border-0 rounded-lg p-3"
                type="text"
                placeholder="CVV"
              />
            </div>
          </form>
        </div>
        <div className='h-2 bg-gray-400'></div>
        <div className='rounded-l p-10'>
            <span className='flex justify-between'><h1>Cart Total</h1><h1>₹ {totalPrice}</h1></span>
            <span className='flex justify-between'><h1>Shipping</h1><h1> ₹ 99</h1></span>
            <span className='flex justify-between'><h1>Total(including taxes)</h1><h1> ₹ {totalPrice + 99}</h1></span>
        </div>
        <Button variant='neon'>
          <div className='flex justify-between w-full items-center'>
            <h1>₹ {totalPrice}</h1>
            <span className='flex items-center justify-center'><h1 className='mx-2'>Checkout</h1><ArrowRight /></span>
          </div>
        </Button>

      </div>
    </div>
  );
};

export default MyCart;
