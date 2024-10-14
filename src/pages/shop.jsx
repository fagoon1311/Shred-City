import { getCategories, getProducts } from '@/api/apiShop';
import ProductCard from '@/components/productcard';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/useFetch';
import { SignIn, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { BarLoader, PropagateLoader } from 'react-spinners';
import MyCart from './mycart';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [showSignIn, setShowSignIn] = useState(false);
  const [chosenCategory, setChosenCategory] = useState('All Products');
  const [count, setCount] = useState(0)

  const {
    loading: loadingProducts,
    error: errorProducts,
    data: productsData,
    fn: fnProducts,
  } = useFetch(getProducts, { chosenCategory }, false);

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: categories,
    fn: fnCategories,
  } = useFetch(getCategories, {}, false);

  useEffect(() => {
    fnCategories();
  }, []);

  useEffect(() => {
    fnProducts();
  }, [chosenCategory]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  };

  if (loadingProducts || loadingCategories) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <PropagateLoader color="#97fb57" size={40} />
      </div>
    );
  }

  return (
    <>
      <div className="h-28 bg-[#5f7252] flex flex-col items-center justify-center mt-10">
        <h1 className="font-Poppins text-center text-5xl font-bold tracking-tight">
          Shop our Handpicked Selection of products for your workout
        </h1>
      </div>
      <div className="flex mt-10 w-full justify-between px-4">
        <Select
          value={chosenCategory}
          onValueChange={setChosenCategory}
          className="flex-1 p-2"
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder={chosenCategory} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All Products">All Products</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.category_name}>
                  {cat.category_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      <div className="relative inline-block">
        <Link to='/my-cart'><Button 
          variant='neon' 
          onClick={() => setCount(count + 1)}
        >
          My Cart
        </Button></Link>
        {count > 0 && (
          <div className="absolute top-0 right-0 -mt-2 -mr-2 h-6 w-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center">
            {count}
          </div>
        )}
    </div>
      </div>
      {productsData && (
        <div className="flex justify-center w-full">
          <div className="mt-8 mx-4 w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {productsData.map((product, index) => {
              if (product?.category) {
                return (
                  <ProductCard
                    productid={product.id}
                    key={index}
                    name={product.name}
                    description={product.description}
                    imageUrl={product.image_url}
                    price={product.price}
                    isSignedIn={isSignedIn}
                    isLoaded={isLoaded}
                    showSignIn={showSignIn}
                    setShowSignIn={setShowSignIn}
                    user={user}
                  />
                );
              }
            })}
            {showSignIn && (
              <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
                <SignIn signUpForceRedirectUrl="/shop" fallbackRedirectUrl="/shop" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
