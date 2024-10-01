import { getSingleProduct } from '@/api/apiShop'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/useFetch'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'


const Item = () => {
    const {id} = useParams()
    const {
        loading: loadingItem,
        data: itemData,
        error: itemDataError,
        fn:fnItem
    } = useFetch(getSingleProduct, { product_id: id }, false)

    useEffect(()=>{
        console.log("Calling api")
        fnItem()
    },[])

    if(itemData) console.log(itemData)
    if(loadingItem) return (
        <div className='flex items-center justify-center h-screen w-screen'>
          <PropagateLoader color="#97fb57" size={40} />
        </div>
      );
      return (
        <div className="grid grid-cols-2 h-screen">
          <div className="col-span-1 flex flex-col items-center justify-center h-full">
            <img className="rounded-2xl h-[30rem]" src={itemData?.image_url} />
          </div>
          <div className="col-span-1 flex flex-col justify-evenly h-full px-10">
            {/* Large bold heading */}
            <h1 className="text-5xl font-bold mb-6 font-Poppins">{itemData?.name}</h1>
            
            {/* Description with medium size */}
            <h1 className='text-2xl font-Poppins'>Description</h1>
            <p className="text mb-4 font-Poppins rounded-2xl border-2 p-4">{itemData?.description}</p>
            
            {/* Price with larger font and some margin */}
            <h1 className="text-3xl font-semibold  text-green-500 mb-8">₹{itemData?.price}</h1>
            
            {/* Button styling */}
            <Button variant="neon" className="w-1/3 py-3">Add to Cart</Button>
          </div>
        </div>
      );
      
      
}

export default Item