import { getCategories, getProducts } from '@/api/apiShop'
import ProductCard from '@/components/productcard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader, PropagateLoader } from 'react-spinners'

const Shop = () => {
  const [chosenCategory, setChosenCategory] = useState("All Products")
  const {
    loading: loadingProducts,
    error: errorProducts,
    data: productsData,
    fn: fnProducts,
  } = useFetch(getProducts, { chosenCategory }, false); // Pass `false` to skip authentication


  const {
    loading: loadingCategories,
    error: errorCategories,
    data: categories,
    fn: fnCategories
  } = useFetch(getCategories,{}, false)

  useEffect(()=>{
    fnCategories()
  },[])

  useEffect(() => {
    fnProducts(); // Fetch products without requiring login
  }, [chosenCategory]);

  //if(productsData) console.log(productsData)
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
    <div className='flex mt-10 w-full mx-4'>
        <Select
          value={chosenCategory} // Bind selected value to chosenCategory state
          onValueChange={setChosenCategory} // Update state when a category is selected
          className="flex-1 p-10"
        >
          <SelectTrigger className="w-[300px]"> {/* Width 300px */}
            <SelectValue placeholder={chosenCategory} /> {/* Show selected value or placeholder */}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* Add "All Products" option */}
              <SelectItem value="All Products">All Products</SelectItem>
              {/* Map through categories */}
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.category_name}>
                  {cat.category_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
    </div>

    {
    productsData && (
      <div className='flex justify-center w-full'>
        <div className='mt-8 mx-6 w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center'>
          {
            productsData.map((product, index) => {
              if(product?.category){
                return (<ProductCard 
                  productid={product.id}
                  key={index} 
                  name={product.name} 
                  description={product.description} 
                  imageUrl={product.image_url} 
                  price={product.price}
                />)
              }})
          }
        </div>
      </div>
    )
  }
  </>
)}

export default Shop