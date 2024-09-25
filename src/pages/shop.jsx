import { getCategories, getProducts } from '@/api/apiShop'
import ProductCard from '@/components/productcard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader, PropagateLoader } from 'react-spinners'

const Shop = () => {
  const [category, setCategory] = useState("")
  const {
    loading: loadingProducts,
    error: errorProducts,
    data: productsData,
    fn: fnProducts,
  } = useFetch(getProducts, {}, false); // Pass `false` to skip authentication

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: categories,
    fn: fnCategories
  } = useFetch(getCategories, {category}, false)

  useEffect(() => {
    fnProducts(); // Fetch products without requiring login
    fnCategories()
  }, [category]);

  if(categories) console.log(categories)
  if (loadingProducts) {
    return (
      <div className='flex items-center justify-center h-screen w-screen'>
        <PropagateLoader color="#97fb57" size={40} />
      </div>
    );
  }

  if (loadingCategories) {
    return (
      <div className='flex items-center justify-center h-screen w-screen'>
        <PropagateLoader color="#97fb57" size={40} />
      </div>
    );
  }



  return (
    <>
    <div className='h-28 bg-[#5f7252]  flex flex-col items-center justify-center mt-10'><h1 className='font-Poppins text-center text-5xl font-bold tracking-tight'>Shop  our  Handpicked  Selection  of  products  for  your  workout</h1></div>
    <div className='flex mt-10 w-full'>
      <Select className='flex-1'>
        <SelectTrigger className="w-[300px]"> {/* Increased width to 300px */}
          <SelectValue placeholder="All Products" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {
              categories?.map((cat) => {
                return <SelectItem key={cat.id} value={cat.category_name}>{cat.category_name}</SelectItem>
              })
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    {
    productsData && (
      <div className='flex justify-center w-full'>
        <div className='mt-8 mx-auto w-full grid md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center'>
          {
            productsData.map((product, index) => (
              <ProductCard 
                key={index} 
                name={product.name} 
                description={product.description} 
                imageUrl={product.image_url} 
                price={product.price}
              />
            ))
          }
        </div>
      </div>
    )
  }
  </>
)}

export default Shop