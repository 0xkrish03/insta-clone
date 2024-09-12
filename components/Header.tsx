'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Modal from './Modal';

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);  // State to control modal visibility

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);  // Function to close the modal

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
          <div className='flex gap-4 items-center'>
            <IoMdAddCircleOutline
              className='text-2xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-600'
              onClick={openModal}  // Open the modal when clicked
            />
            <img
              src={session.user?.image ?? '/default-avatar.png'}  // Fallback image
              alt={session.user?.name ?? 'User Avatar'}  // Fallback alt text
              className='h-10 w-10 rounded-full cursor-pointer'
              onClick={() => signOut()}
            />
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

      {/* Modal component */}
      {isOpen && (
        <div className='transition duration-300'>
          <Modal Open={isOpen} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default Header;
