"use client"

import React, { useState } from 'react'

export const sidebarItem = [
    {
        id: 1, title: 'Category', options: [
            { id: 1, label: 'T-Shirt', value: 'tShirt' },
            { id: 2, label: 'Hoodies', value: 'hoodies' },
            { id: 3, label: 'Full Sleve Shirt', value: 'fullSleveShirt' },
            { id: 4, label: 'Cosmetics', value: 'cosmetics' },
        ]
    },
    {
        id: 2, title: 'Brand', options: [
            { id: 1, label: 'Adidas', value: 'tShirt' },
            { id: 2, label: 'Polo', value: 'tShirt' },
            { id: 3, label: 'Jaguar', value: 'tShirt' },
            { id: 4, label: 'Raymond', value: 'tShirt' },
        ]
    },
    {
        id: 3, title: 'Price', options: [
            { id: 1, label: 'Less than 100$', value: '<100' },
            { id: 2, label: 'More than 100$', value: '>100' },
            { id: 3, label: 'Custom', value: 'custom' }
        ]
    }
]

const ProductsLayout = ({ children }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    return (
        <div className='flex gap-2'>
            <div className='w-[20%] h-[100vh] bg-gray-100'>
                {sidebarItem.map((item) => (
                    <div key={item.id} className="mt-5 px-1">
                        <button
                            onClick={() => toggleDropdown(item.id)}
                            className="flex items-center justify-between w-full text-left font-bold py-2 px-4 rounded bg-gray-300"
                        >
                            <span>{item.title}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-600 ${openDropdown === item.id ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.708l3.71-3.5a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {openDropdown === item.id && (
                            <div className="mt-2">
                                {
                                    item.title === 'Category' || item.title === 'Price' ? (
                                        item.options.map((option) => (
                                            <label key={option.id} className='cursor-pointer flex hover:bg-gray-300 px-2 py-1 rounded-md'>
                                                <input className="cursor-pointer" type="radio" id={option.id} name="Category" value={option.value} />
                                                <span for={option.id} className='ml-2'>{option.label}</span>
                                            </label>
                                        ))
                                    ) : (
                                        item.options.map((option) => (
                                            <label key={option.id} className='cursor-pointer flex hover:bg-gray-300 px-2 py-1 rounded-md'>
                                                <input className='cursor-pointer' type="checkbox" id={option.id} name={option.id} value={option.value} />
                                                <span for={option.id} className='ml-2'>{option.label}</span>
                                            </label>
                                        ))
                                    )
                                }
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='w-[80%] bg-gray-100 p-4'>
                {children}
            </div>
        </div>
    )
}

export default ProductsLayout;
