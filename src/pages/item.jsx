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

          <div className="col-span-1 flex flex-col items-end justify-center h-full mr-10">
            <img className="rounded-xl h-[20rem] md:h-[30rem] lg:h-[30rem]" src={itemData?.image_url} />
          </div>

          <div className="col-span-1 flex flex-col items-start justify-center h-full pr-10">
            <h1 className="text-5xl font-bold mb-10 font-Poppins">{itemData?.name}</h1>
            <h1 className="text-3xl font-bold text-green-500 mb-4 tracking-tight">
              ₹{itemData?.price} <span className="text-base font-medium text-gray-400">+ Shipping Charges</span>
            </h1>
            <p className="text mb-4 font-Poppins rounded-2xl border-2 p-4">Fuel your fitness journey with our premium range of gym essentials designed to keep you performing at your best. Whether you're looking to conquer your workouts in high-performance footwear, boost your progress with quality supplements, or track every step with cutting-edge wearables, our products are crafted to support every stride, lift, and goal. Elevate your training experience and embrace a lifestyle that brings your fitness vision to life.</p> 
            <span className='w-full'><Button variant="neon" className="w-1/3 py-3">Add to Cart</Button></span>
            <div className='bg-gray-500 h-[1px] mt-5 w-full'></div>
          </div>
        </div>
      );
      
      
}

export default Item