"use client"

import { fetchProducts } from '@/redux/slices/productsSlice';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, isLoading, isError } = useSelector((state) => state.products);
  console.log("🚀 ~ ProductsPage ~ products:", products)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className=''>
      <div className='grid grid-cols-3 gap-2'>
        {
          isLoading ? <p className='text-center'>Loading products...</p> :
            (filteredProducts.length > 0 ? filteredProducts : products).map(item => {
              return (
                <div key={item.id} className='h-auto shadow-xl p-4 relative'>
                  <small className='absolute right-2 top-2 h-5 w-12 bg-gray-600 text-red-600'>{item.brand}</small>
                  <Image src={item.thumbnail} alt={item.title} width={1000} height={1000} />
                  <h3 className='text-md font-bold mt-2'>{item.title}</h3>
                  <p className={`mt-2`}>{item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description}</p>
                </div>
              )
            })
        }
      </div>
    </div>
  )
}

export default ProductsPage
