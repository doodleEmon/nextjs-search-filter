"use client"

import { fetchProducts } from '@/redux/slices/productsSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log("🚀 ~ ProductsPage ~ products:", products);

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);

  return (
    <div>
      hello;
    </div>
  )
}

export default ProductsPage
