'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const { data: session } = useSession();
  console.log(session);

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
        <input
          type="text"
          placeholder='Search'
          className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[300px]'
        />

        {/* menu items */}
        {session ? (
          <div>
            {session.user?.image ? (
              <img
                src={session.user.image ?? '/default-avatar.png'}  // Fallback image
                alt={session.user?.name ?? 'User Avatar'}  // Fallback alt text
                className='h-10 w-10 rounded-full cursor-pointer'
                onClick={()=>signOut()}
              />
            ) : (
              <img
                src='/default-avatar.png'  // Fallback image
                alt='Default Avatar'  // Fallback alt text
              />
            )}
          </div>
        ) : (
          <button
            onClick={() => signIn()}  // Wrap signIn in an arrow function
            className='text-sm font-semibold text-blue-500'
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
