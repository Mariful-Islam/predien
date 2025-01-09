import Image from 'next/image'
import React from 'react'
import { TiArrowRight } from 'react-icons/ti'
import animation from '@/assets/hero.gif'


function Introduction() {
  return (
    <div 
      className='max-w-[1200px] mx-auto w-full px-4 sm:px-20 h-[92vh] flex flex-col ml:flex-row items-center justify-between '
    >
      <div className='mt-[150px]'>
        <div>
          <h1 className='text-5xl text-white font-bold '>Software Development</h1>
        </div>
        <div className='mt-4 text-white'>
          Providing top-tier business solutions for success
        </div>
        <div>
          <button 
            className='group bg-[#001440] dark:bg-gray-800 hover:bg-blue-950 dark:hover:bg-blue-800 duration-200 mt-5 px-8 py-1 text-white font-bold rounded-full flex gap-2 items-center'
          >
            Hire <TiArrowRight className='opacity-0 group-hover:opacity-100 group-hover:translate-x-2 duration-200'/>
          </button>
        </div>
      </div>

      <div>
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