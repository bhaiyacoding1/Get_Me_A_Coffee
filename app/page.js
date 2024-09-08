import React from 'react'
import Link from 'next/link'
import Image from 'next/image' // Import Image component

const Main = () => {
  return (
    <>
      <div className="flex flex-col justify-center gap-3 items-center h-[44vh] px-2">
        <div className="flex gap-0 text-3xl md:text-4xl font-bold justify-center items-center">
          Get Me a Coffee 
          <span>
            {/* Replace <img> with Next.js Image component */}
            <Image className='invert' src="/images/coffee-unscreen.gif" width={65} height={65} alt="coffee" />
          </span>
        </div>
        <p className='text-sm text-center md:text-lg'>A crowdfunding platform for creators to fund their project</p>
        <p className='text-sn text-center md:text-lg'>A place where your fans can buy you a coffee. Unleash the power of your fans and get your project funded.</p>
        <div className="btn flex gap-1">
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Start Here</button>
          </Link>
          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>
      </div>

      <div className='bg-slate-50 h-1 opacity-20'></div>

      <div className="text-white mx-auto mb-10">
        <h2 className='text-3xl font-bold text-center my-10'>Your Fans can buy you a Coffee</h2>
        <div className="flex flex-col sm:flex-row gap-5 justify-center sm:justify-around">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            {/* Replace <img> with Next.js Image component */}
            <Image className='bg-slate-400 rounded-full p-2' src="/images/man.gif" width={80} height={80} alt="man" />
            <p className='font-bold'>Found Yourself</p>
            <p>Your fans are available to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            {/* Replace <img> with Next.js Image component */}
            <Image className='bg-slate-400 rounded-full p-2' src="/images/coin.gif" width={80} height={80} alt="coin" />
            <p className='font-bold'>Found Yourself</p>
            <p>Your fans are available to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            {/* Replace <img> with Next.js Image component */}
            <Image className='bg-slate-400 rounded-full p-2' src="/images/teamwork.gif" width={80} height={80} alt="teamwork" />
            <p className='font-bold'>Found Yourself</p>
            <p>Your fans are available to help you.</p>
          </div>
        </div>
      </div>

      <div className='bg-slate-50 h-1 opacity-20'></div>

      <div className="text-white container mx-auto mb-10 flex flex-col items-center">
        <h2 className='text-3xl font-bold text-center my-10'>Learn more about us</h2>
        <div className='w-[90%] h-[40vh] md:w-[50%] md:h-[35vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh] rounded-2xl'>
          <iframe className='w-full h-full' width="450" height="250" src="https://www.youtube.com/embed/uab_EhnO66U?si=063mfey1y5v6xXCq" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </>
  )
}

export default Main
