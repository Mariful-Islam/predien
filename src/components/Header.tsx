import React, { useState } from 'react'
import { NavItems } from './NavItems'
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { TiArrowRight } from 'react-icons/ti';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';

function Header() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false)

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className=''>
      <div className='flex justify-between items-center pt-6 max-w-[1200px] mx-auto w-full px-4 sm:px-20'>
        <div className='flex gap-16 lg:gap-20  ml:items-center '>
          <div>
            <h1 className='text-xl font-bold text-gray-50'>predien</h1>
          </div>
          <div>
            <nav >
              <ul className='hidden ml:flex gap-10 '>
              {NavItems.map((item, index)=>(
                <li key={index} >
                <Link
                  href={item.link} 
                  className='flex gap-2 items-center cursor-pointer text-white text-nowrap font-bold hover:text-slate-300 duration-200'
                  onMouseEnter={()=>handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.name} 
                  { item.subItems.length ?  activeIndex === index ? (
                    <div className='duration-150'>
                      <SlArrowDown className='w-3 h-3'/>
                      <div className='absolute ml-[-100px] pt-6 shadow-xl z-20'>
                        <Link href={`/services/`} className='bg-white  dark:bg-gray-700 p-4 rounded-md grid grid-cols-1 ml:grid-cols-2'>
                          {item.subItems.map((subItem, index)=>(
                            <Link href={`/services/${subItem.link}`} className='group hover:bg-slate-100 dark:hover:bg-slate-600 duration-200 p-2 rounded-md w-[310px]'>
                              <div className='text-md font-bold text-gray-600 dark:text-slate-200 flex gap-1 items-center'>
                                {subItem.name} <TiArrowRight className={` group-hover:translate-x-2 opacity-0 group-hover:opacity-100 duration-200`}/>
                              </div>
                              <div className='text-slate-400 text-sm font-normal text-wrap'>
                                {subItem.description}
                              </div>
                            </Link>
                          ))}
                        </Link>
                      </div>
                    </div>
                  )
                    : 
                      <SlArrowUp className='w-3 h-3'/> 
                    : 
                    <></>
                  } 
                </Link>
                </li>
              ))}

              </ul>
            </nav>
          </div>
          <div>
            <ThemeToggle/>
          </div>
        </div>
        <div className='flex items-center'>
          <Link
            href='#' 
            className='hidden ml:flex items-center group bg-white hover:bg-gray-100 duration-200 shadow-md rounded-full text-slate-600 font-bold text-sm px-6 py-1'
          >
            Meeting <TiArrowRight className='opacity-0 group-hover:translate-x-2 group-hover:opacity-100 duration-200'/>
          </Link>
          <button className='ml:hidden block' onClick={()=>setIsOpenMobileMenu(true)}>
            <IoReorderThreeOutline className='w-8 h-8 text-white bg-white backdrop-blur-lg bg-opacity-20 rounded-full'/>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`z-20 bg-white dark:bg-black ml:hidden flex flex-col absolute left-0 top-0 right-0 duration-200 ${ isOpenMobileMenu ? 'h-screen opacity-100': 'h-0 opacity-0 overflow-hidden'}`}>
        <div className='flex flex-col p-5 w-full'>
          <button 
            onClick={()=>setIsOpenMobileMenu(false)}
            className='flex justify-end '
          >
            <RxCross1 className='text-black dark:text-white hover:text-gray-500 w-6 h-6'/>
          </button>
          <div className=''>
            {NavItems.map((item, index)=>(
              <Link
                href={item.link} 
                key={index} 
                className='flex gap-1 items-center py-6 text-blue-950 dark:text-white text-nowrap font-bold hover:text-slate-300 duration-200'
                onClick={()=>{
                  if(!activeIndex){
                    handleMouseEnter(index)
                  } else{
                    handleMouseLeave()
                  }
                }}
                onMouseLeave={handleMouseLeave}
              >
                {item.name} 
                { item.subItems.length ?  activeIndex === index ? (
                  <div className='duration-150'>
                    <SlArrowDown className='w-3 h-3'/>
                    <div className='absolute ml-[-80px] pt-6 shadow-xl'>
                      <Link href={`/services/`} className='bg-white  dark:bg-gray-700 p-4 rounded-md grid grid-cols-1 ml:grid-cols-2'>
                        {item.subItems.map((subItem, index)=>(
                          <Link href={`/services/${subItem.link}`} className='group hover:bg-slate-100 dark:hover:bg-slate-600 duration-200 p-2 rounded-md w-[310px]'>
                            <div className='text-md font-bold text-gray-600 dark:text-slate-200 flex gap-1 items-center'>
                              {subItem.name} <TiArrowRight className={` group-hover:translate-x-2 opacity-0 group-hover:opacity-100 duration-200`}/>
                            </div>
                            <div className='text-slate-400 text-sm font-normal hidden ml:block'>
                              {subItem.description}
                            </div>
                          </Link>
                        ))}
                      </Link>
                    </div>
                  </div>
                )
                  : 
                  <SlArrowUp className='w-3 h-3'/> 
                  : 
                  <></>
                } 
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header