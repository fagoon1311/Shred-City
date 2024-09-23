import { getProducts } from '@/api/apiShop'
import ProductCard from '@/components/productcard'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'

const Shop = () => {  
  const {
    loading: loadingProducts,
    error: errorProducts,
    data: productsData,
    fn: fnProducts,
  } = useFetch(getProducts, {}, false); // Pass `false` to skip authentication

  useEffect(() => {
    fnProducts(); // Fetch products without requiring login
  }, []);

  if (loadingProducts) return <div>Loading products...</div>;
  if (errorProducts) return <div>Error fetching products: {errorProducts.message}</div>;
  if(productsData) console.log(productsData)
  return (
    productsData && 
    <div className='flex items-center w-[100%] justify-center'>
    <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-10 '>
      {
        productsData.map((product, index)=>{
          return <ProductCard key={index} name={product.name} description={product.description} imageUrl={product.image_url} price={product.price}/>
        })
      }
    </div>
    </div>
  )
}

export default Shop