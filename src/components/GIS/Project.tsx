import { BASE_URL } from '@/pages/services/custom-software-development'
import Link from 'next/link'
import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

function Project({data}:{data:any}) {
  return (
    <div className="mt-8">
      <h1
        className="text-orange-500 font-bold text-2xl"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        Projects
      </h1>
      <div
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 mt-4"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="1000"
      >
        {data?.map((item: any, index: number) => (
          <Link href={`/projects/${item?.slug}/`} key={index}>
            <div className="border border-orange-500 p-5 group relative h-[300px] rounded-xl overflow-hidden shadow-md hover:shadow-2xl">
              <div className="uppercase text-orange-500 text-sm font-semibold relative z-10">
                {item?.type}
              </div>
              <div className="text-slate-800 dark:text-slate-200 text-xl font-semibold group-hover:text-orange-500 duration-200 relative z-10">
                {item.project_name}
              </div>
              <div className={`mt-10 text-black dark:text-slate-200 text-sm translate-x-[400px] group-hover:translate-x-0 duration-500`}>
                {item?.brief}
              </div>
              <div className=" absolute bottom-5 right-7  z-10 group-hover:translate-x-2 border border-orange-500 group-hover:bg-orange-500 duration-200 rounded-full p-4 h-8 w-8 grid justify-center content-center">
                <MdOutlineKeyboardArrowRight className="text-orange-500 h-6 w-6 group-hover:text-white duration-200" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Project



  