import { getSingleProduct } from '@/api/apiShop'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/useFetch'
import { CircleCheck } from 'lucide-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"



const Item = () => {
    const { id } = useParams()
    const {
        loading: loadingItem,
        data: itemData,
        error: itemDataError,
        fn: fnItem
    } = useFetch(getSingleProduct, { product_id: id }, false)

    useEffect(() => {
        fnItem()
    }, [])

    if (loadingItem) return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <PropagateLoader color="#97fb57" size={40} />
        </div>
    );

    return (
        <div className='flex flex-col items-center px-20 py-10 m-3 rounded-lg'>
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{itemData?.name.substr(0, 10)}..</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            </div>

            <div className="flex flex-row w-full max-w-7xl h-screen items-center justify-between">

                {/* Image Section */}
                <div className="flex flex-1 items-center justify-center pr-10">
                    <img className="rounded-lg h-[20rem] md:h-[30rem] lg:h-[30rem]" src={itemData?.image_url} alt={itemData?.name} />
                </div>

                {/* Product Details Section */}
                <div className="flex flex-1 flex-col items-start justify-center pl-10 space-y-4">
                    <h1 className="text-5xl font-bold font-Poppins">{itemData?.name}</h1>
                    <h1 className="text-3xl font-bold text-green-500">
                        ₹{itemData?.price} <span className="text-base font-medium text-gray-400">+ Shipping Charges</span>
                    </h1>
                    <p className="text mb-4 font-Poppins rounded-2xl border-2 p-4">
                        Fuel your fitness journey with our premium range of gym essentials designed to keep you performing at your best. Whether you're looking to conquer your workouts in high-performance footwear, boost your progress with quality supplements, or track every step with cutting-edge wearables, our products are crafted to support every stride, lift, and goal.
                    </p> 
                    <span className='w-full'>
                      <Button variant="neon" className="w-1/3 py-3">Add to Cart</Button>
                      
                    </span>
                    <div className='bg-gray-500 h-[1px] w-full my-5'></div>

                    {/* Guarantee Section */}
                    <div className='space-y-2'>
                        <h1 className='text-base font-medium text-gray-400'>Safe Shipping</h1>
                        <div className='flex gap-2 items-center'><CircleCheck color='#5f7252' size='20' /><p className='text-base font-medium text-gray-400'>No-Risk Money Back Guarantee</p></div>
                        <div className='flex gap-2 items-center'><CircleCheck color='#5f7252' size='20' /><p className='text-base font-medium text-gray-400'>Hassle Free Refunds</p></div>
                        <div className='flex gap-2 items-center'><CircleCheck color='#5f7252' size='20' /><p className='text-base font-medium text-gray-400'>Secure Payments</p></div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className='border-t border-gray-300 w-full max-w-7xl pt-6 mt-6'>
                <h1 className='text-2xl font-semibold mb-2'>Description</h1>
                <p className="text-gray-400">{itemData?.description}</p>
            </div>
        </div>
    );
}

export default Item
