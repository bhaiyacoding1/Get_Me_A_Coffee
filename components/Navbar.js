"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image' // Import Image component from Next.js

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <nav className=' w-full flex justify-between items-center h-16 px-2 md:px-14 bg-slate-800 text-white'>
      <div className="logo text-lg font-bold ml-2 sm:ml-0">
        <Link href={"/"} className='flex justify-center items-center'>
          <span>
            {/* Replace <img> with Next.js Image component */}
            <Image 
              src="/images/coffee-unscreen.gif" 
              alt="coffee" 
              width={40} 
              height={40} 
              className='invert' 
            />
          </span>
          <span>Get_Me_a_Coffee!</span>
        </Link>
      </div>

      <div className="login-btn relative">
        {session && (
          <>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              id="dropdownUserAvatarButton" 
              data-dropdown-toggle="dropdown" 
              className="relative flex text-sm bg-gray-800 rounded-full md:me-0" 
              type="button"
            >
              <span className="sr-only">{session.user.name}</span>
              {/* Replace <img> with Next.js Image component */}
              <Image 
                src={session.user.image} 
                alt="user photo" 
                width={40}  // Set width and height for avatar
                height={40} 
                className="rounded-full ring-1 ring-white"
              />
            </button>
            <div id="dropdown" className={`z-10 ${showDropdown ? "" : "hidden"} absolute right-0 top-14 bg-slate-700 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 `}>
              <div className="px-4 py-3 text-base text-white dark:text-white">
                <div>{session.user.name}</div>
                <div className="font-medium truncate  text-xs">{session.user.email}</div>
              </div>
              <ul className="py-2 text-sm text-white dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-800">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-800">Your Page</Link>
                </li>
                <li>
                  {session && <button className='block px-4 py-2 hover:bg-gray-800' onClick={() => signOut()}>Sign out</button>}
                </li>
              </ul>
            </div>
          </>
        )}

        {!session && (
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">
              Log in
            </button>
          </Link>
        )}
      </div>
    </nav >
  )
}

export default Navbar
