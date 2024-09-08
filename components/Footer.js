import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white w-full sm:w-full">
            <div className=" px-8 py-2.5 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <div className="logo text-lg font-bold">
                    <Link href={"/"} className='flex justify-center items-center'>
                        <span>
                            {/* Use the Next.js Image component */}
                            <Image 
                                src="/images/coffee-unscreen.gif" 
                                alt="coffee" 
                                width={40}  // Set the width for the image
                                height={40}  // Set the height for the image
                                className='invert'
                            />
                        </span>
                        <span>
                            Get_Me_a_Coffee!
                        </span>
                    </Link>
                </div>
                <div >
                    <p className='md:text-center'>© 2024 GetMeaCoffee. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
