import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ name, description, price, imageUrl }) => {
  return (
    <div className='flex flex-col h-[25rem] w-[20rem] items-center m-10 bg-black border-2 rounded-3xl overflow-hidden gap-3'>
      <div className='h-[50%] w-full overflow-hidden'> {/* Container to hide overflow */}
        <img 
          src={imageUrl} 
          className='h-auto w-full object-cover' // Use object-cover to maintain aspect ratio
          alt={name} // Always good to add alt text for accessibility
        />
      </div>
      <div className='h-14'>
        <h1 className='font-Poppins text-2xl font-semibold p-2 text-center'>{name.length > 20 ? name.substring(0, 20) + "..." : name}</h1>
      </div>
      <div>
        <p className='text-[10px] tracking-normal font-light font-Poppins p-2'>
            {description.length > 100 ? description.substring(0, 100) + '...' : description}
        </p>
      </div>
      <div className='flex justify-between items-center px-2 w-full'>
        <h1 className='text-lg font-semibold'>₹ {price}</h1>
        <Button variant='neon' className='h-6 w-32 p-4 rounded-3xl'> {/* Adjust button styling */}
          <span className='flex justify-between p-2'><ShoppingCart size='20' /><h1 className='text-sm ml-2'>Add to cart</h1></span>
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
