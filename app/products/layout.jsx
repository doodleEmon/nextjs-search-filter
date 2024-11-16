"use client"

import React, { useEffect, useState } from 'react'
import { fetchProducts, filterProducts } from '@/redux/slices/productsSlice';
import { useSelector, useDispatch } from 'react-redux';

const ProductsLayout = ({ children }) => {
    // const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const dispatch = useDispatch();
    const { products, isLoading, isError } = useSelector((state) => state.products);
    const uniqueCategories = [...new Set(products.map(item => item.category))];
    // const uniqueBrands = [...new Set(products.filter(item => selectedCategory ? item.category === selectedCategory : item.category)))];
    const uniqueBrands = selectedCategory
    ? [...new Set(products.filter(item => item.category === selectedCategory).map(item => item.brand))]
    : [...new Set(products.map(item => item.brand))];

    console.log("🚀 ~ ProductsLayout ~ uniqueBrands:", uniqueBrands)
    const prices = [
        { id: 1, label: 'Less than 100$', value: '<100' },
        { id: 2, label: 'More than 100$', value: '>100' },
    ]
    const [filters, setFilters] = useState({
        category: null,
        brands: [],
        price: null
    })

    // const toggleDropdown = (id) => {
    //     setOpenDropdown(openDropdown === id ? null : id);
    // };

    const handleCategory = (e) => {
        setFilters(pre => ({...pre, category: e.target.value}));
        setSelectedCategory(e.target.value);
    }

    const handleBrand = (e) => {
        setFilters((prev) => ({
            ...prev,
            brands: prev.brands?.includes(e.target.value)
                ? prev.brands // If already included, keep as-is
                : [...(prev.brands || []), e.target.value], // Otherwise, add it
        }));
    }

    const handlePrice = (e) => {
        setFilters(pre => ({...pre, price: e.target.value}))
    }

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(filterProducts(filters));
    }, [filters, dispatch])

    return (
        <div className='flex gap-2'>
            <div className='w-[20%] h-auto bg-gray-100'>
                {/* Category */}
                <div className='m-4'>
                    <h3 className="text-xl font-semibold m-2">Category</h3>
                    {
                        uniqueCategories.map((item, index) => (
                            <div key={index}>
                                <label className='cursor-pointer flex hover:bg-gray-300 px-2 py-1 rounded-md'>
                                    <input onChange={handleCategory} className="cursor-pointer" type="radio" id={item} name="Category" value={item} />
                                    <span htmlFor={item} className='ml-2'>{item}</span>
                                </label>
                            </div>
                        ))
                    }
                </div>

                {/* Brand */}
                <div className='m-4'>
                    <h3 className="text-xl font-semibold m-2">Brand</h3>
                    {
                        uniqueBrands.map((item, index) => (
                            <div key={index}>
                                <label className='cursor-pointer flex hover:bg-gray-300 px-2 py-1 rounded-md'>
                                    <input onChange={handleBrand} className='cursor-pointer' type="checkbox" id={item} name={item} value={item} />
                                    <span htmlFor={item} className='ml-2'>{item}</span>
                                </label>
                            </div>
                        ))
                    }
                </div>

                {/* Price */}
                <div className='m-4'>
                    <h3 className="text-xl font-semibold m-2">Price($)</h3>
                    {
                        prices.map((item, index) => (
                            <div key={index}>
                                <label className='cursor-pointer flex hover:bg-gray-300 px-2 py-1 rounded-md'>
                                    <input onChange={handlePrice} className="cursor-pointer" type="radio" id={item.id} name="Price" value={item.value} />
                                    <span htmlFor={item.id} className='ml-2'>{item.label}</span>
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-[80%] bg-gray-100 p-4'>
                {children}
            </div>
        </div>
    )
}

export default ProductsLayout;