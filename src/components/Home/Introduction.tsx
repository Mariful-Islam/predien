import Image from 'next/image'
import React from 'react'
import { TiArrowRight } from 'react-icons/ti'
import animation from '@/assets/hero.gif'
import Link from 'next/link'


function Introduction() {
  return (
    <div 
      className='max-w-[1200px] mx-auto w-full px-4 sm:px-20 h-fit ml:h-screen flex flex-col ml:flex-row items-center justify-between overflow-hidden'
    >
      <div 
        className='mt-[150px] ml:mt-0'
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <div>
          <h1 className='text-5xl text-white font-bold '>Software Development</h1>
        </div>
        <div className='mt-4 text-gray-300 font-bold'>
          Providing top-tier business solutions for success
        </div>
        <div>
          <Link
            href="/contact#contact"
            rel="noopener noreferrer"
            className='group bg-[#001440] dark:bg-blue-800 hover:bg-blue-950 dark:hover:bg-blue-900 duration-200 mt-5 px-8 py-1 text-white font-bold rounded-full flex gap-2 items-center w-fit'
          >
            Hire <TiArrowRight className='opacity-0 group-hover:opacity-100 group-hover:translate-x-2 duration-200'/>
          </Link>
        </div>
      </div>

      <div
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <Image
          src={animation}
          alt=''
          className='h-[500px] w-[500px]'
        />
      </div>
    </div>
  )
}

export default Introduction