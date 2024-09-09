import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='shadow-sm border-b sticky top-0 z-30 bg-white p-3'>
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
            {/* logo */}

            <Link className="hidden lg:inline-flex" href="/">
                    <Image src="/insta-logo.png" alt='insta-logo' height={96} width={96} />
            </Link>
            <Link className='lg:hidden' href="/">
                    <Image src="/logo.png" alt='logo' height={40} width={40} />
            </Link>

            {/* Search Items */}

            <input type="text" placeholder='Search'
                className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[300px]'
            />

            {/* menu items */}

            <button className='text-sm semi-bold text-blue-500'>Log In</button>

        </div>
    </div>
  )
}

export default Header