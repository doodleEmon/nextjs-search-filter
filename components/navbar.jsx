import Link from 'next/link'
import React from 'react'

const Navbar = () => {

    const navItem = [
        { id: 1, title: 'Home', url: "/" },
        { id: 2, title: 'Products', url: "/products" },
        { id: 3, title: 'About', url: "/about" },
    ]

    return (
        <nav className='bg-blue-500 flex items-center justify-between p-6 text-white'>
            <div>
                <Link href="/" className='text-2xl font-bold uppercase'>E-com.</Link>
            </div>
            <div className='flex items-center gap-6'>
                {
                    navItem.map(item => (
                        <Link key={item.id} href={item.url} className='font-semibold'>{item.title}</Link>
                    ))
                }
            </div>
            <div>
                <Link href="/contact" className='font-semibold bg-white text-slate-600 px-4 py-2 rounded-full shadow-lg'>Contact</Link>
            </div>
        </nav>
    )
}

export default Navbar
