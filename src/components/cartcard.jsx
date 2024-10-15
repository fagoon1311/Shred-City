import React, { useState } from 'react';
import { X } from 'lucide-react';

const CartCard = ({ name, quantity, price, image, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='flex flex-col md:flex-row gap-4 m-4'>
      {/* Left section with product details */}
      <div className='w-full md:w-2/4 bg-[#0e100f] rounded-xl p-4'>
        <div className='grid grid-cols-3 md:grid-cols-6 gap-4 items-center'>
          {image && (
            <img 
              src={image} 
              alt={name} 
              className='w-16 h-16 object-cover col-span-1 rounded-lg' 
            />
          )}
          <h1 className={`col-span-2 md:col-span-${image ? '2' : '3'} truncate font-Poppins text-xl text-white`}>
            {name}
          </h1>
          <h1 className='col-span-1 md:col-span-1 text-center text-lg text-[#97fb57]'>
            ₹ {price}
          </h1>
          <h1 className='col-span-1 md:col-span-1 text-center text-lg text-[#97fb57]'>
            Qty - {quantity}
          </h1>
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onRemove} 
            className={`col-span-1 cursor-pointer flex items-center justify-center transition 
              ${isHovered ? 'bg-red-500 text-white' : 'hover:text-red-500'}`}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem' }} // Add padding and border radius
          >
            {isHovered ? (
              <span>Remove</span> // Changed text to "Remove"
            ) : (
              <X className='w-5 h-5' />
            )}
          </div>
        </div>
      </div>

      {/* Right section (currently empty) */}
      <div className='w-full md:w-2/4'>
        {/* You can add any additional content here */}
      </div>
    </div>
  );
};

export default CartCard;