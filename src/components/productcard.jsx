import React from 'react';
import { Button } from './ui/button';

const ProductCard = ({ name, description, price, imageUrl }) => {
  return (
    <div className='flex flex-col h-[30rem] w-[20rem] items-center m-10 bg-gray-800 rounded-3xl overflow-hidden gap-3'>
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
      <div className='flex justify-between items-center p-2 w-full'>
        <h1 className='text-lg font-semibold'>{price}</h1>
        <Button className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'> {/* Adjust button styling */}
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
