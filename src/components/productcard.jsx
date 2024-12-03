import React, { useContext } from 'react';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { addToCart, getCartLength } from '@/api/apiShop';
import { MoonLoader } from 'react-spinners';
import CartContext from '@/context/CartContext';

const ProductCard = ({ productid, name, description, price, imageUrl, isLoaded, isSignedIn, showSignIn, setShowSignIn, user, setShowMoonLoader }) => {
  const {
    loading: loadingNewItemToCart,
    error: errorItemToCart,
    fn: fnCart
  } = useFetch(addToCart)


  const handleAddToCart = async (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the Link
    if (!isSignedIn && isLoaded) {
      setShowSignIn(true);
      return;
    }
    setShowMoonLoader(true)
    
    try {
      await fnCart({
        user_id:user.id,
        name: name,
        quantity:  1,
        price: price,
        image_url:imageUrl
      })
    } catch (error) {
      console.error("Error Adding item to cart",error)
    } finally {
      setShowMoonLoader(false)
    }
    // Add to cart logic here
  }

  if(errorItemToCart) console.error('Error Adding item to cart', errorItemToCart)
  
  

  return (
    <div className='flex flex-col h-[25rem] w-[20rem] items-center m-10 bg-black border-2 rounded-xl overflow-hidden gap-3 select-none'>
      <Link to={`/item/${productid}`} className='h-[50%] w-full overflow-hidden'> {/* Wrap only image in link */}
        <img 
          src={imageUrl} 
          className='h-auto w-full object-cover' 
          alt={name} 
        />
      </Link>
      <div className='h-14'>
        <Link to={`/item/${productid}`}> {/* Wrap only product name in link */}
          <h1 className='font-Poppins text-2xl font-semibold p-2 text-center'>
            {name.length > 20 ? name.substring(0, 20) + "..." : name}
          </h1>
        </Link>
      </div>
      <div>
        <p className='text-[10px] tracking-normal font-light font-Poppins p-2'>
          {description.length > 100 ? description.substring(0, 100) + '...' : description}
        </p>
      </div>
      <div className='flex justify-between items-center px-2 w-full'>
        <h1 className='text-lg font-semibold'>₹ {price}</h1>
        <Button 
          variant='neon' 
          className='h-6 w-32 p-4 rounded-3xl' 
          onClick={handleAddToCart} // Use the handler
        >
          <span className='flex justify-between p-2'>
            <ShoppingCart size='20' />
            <h1 className='text-sm ml-2'>Add to cart</h1>
          </span>
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
