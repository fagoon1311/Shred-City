import React from 'react';

const ProductCard = ({ name, description, price, imageUrl }) => {
  return (
    <div className='flex flex-col h-[30rem] w-[20rem] items-center m-10 bg-gray-800 rounded-3xl overflow-hidden gap-3'>
      <div className='h-[50%] w-full overflow-hidden'> {/* Container to hide overflow */}
        <img 
          src={imageUrl} 
          className='h-auto w-full' // Allow height to auto, full width
          alt={name} // Always good to add alt text for accessibility
        />
      </div>
      <div className='h-14'>
        <h1 className='font-Poppins text-2xl font-semibold p-2 text-center'>{name.substring(0,20) + ".."}</h1>
      </div>
      <div>
        <p className='text-[10px] tracking-normal font-light font-Poppins p-2'>
            {description.substring(0, 100) + '...'}
        </p>
      </div>
      <h1>{price}</h1>
    </div>
  );
}

export default ProductCard;
