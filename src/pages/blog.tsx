import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiArrowTurnRightDown } from 'react-icons/hi2'
import blog from '@/assets/blog.jpg'
import { blogItems } from '@/components/Blog/blogSample'
import moment from 'moment'
import { SlCalender } from 'react-icons/sl'
import Head from 'next/head'


export const API_URL = process.env.NODE_ENV==="production" ? "https://predien.vercel.app" : "http://localhost:3000"

function Blog({data}:{data:any}) {

  return (
    <div className=''>
      <Head>
        <title>Predien | Blog</title>
        <link rel='canonical' href='https://predien.vercel.app/blog'/>
      </Head>
      <div className="text-black relative overflow-hidden h-screen bg-gradient-to-l from-green-600 dark:from-green-800 via-violet-500 dark:via-violet-700 to-blue-400 dark:to-blue-700 ">
        <Header />
        <div className="z-10 relative h-screen flex items-start ml:items-center">
          <div className="max-w-[1200px] mx-auto  px-4 sm:px-20 flex flex-col ml:flex-row gap-10 ml:gap-8 relative">
            

            <div className="w-full ml:w-1/2">
              <div className="group relative h-[400px]">
                <Image
                  src={blog}
                  alt="career"
                  className="h-[400px] object-cover rounded-3xl"
                />

                <div className="h-0 overflow-hidden absolute bottom-0 right-0 duration-200 backdrop-blur-md opacity-50 bg-gray-600 w-full group-hover:h-[400px] rounded-3xl "></div>

                <div className="h-0 overflow-hidden absolute bottom-0 right-0 duration-200 w-full group-hover:h-[400px] flex justify-center items-center">
                  <Link
                    href={`#blog-list`}
                    className="group relative bg-blue-600 text-white px-12 py-2 rounded-full hover:bg-blue-700 duration-200 font-bold flex gap-2 items-center"
                  >
                    Explore
                    
                    <HiArrowTurnRightDown className="duration-200 stroke-1"/>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="w-full ml:w-1/2 h-full"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <h1 className="text-3xl text-center ml:text-start ml:text-6xl text-white mt-16 ml:mt-[100px]">
                <div className="text-lg font-bold text-white mb-4">Blog</div>
                
                Deep dive into technology
                <span className="font-bold text-red-400">_</span>
              </h1>

              <div className="text-white mt-6 text-center ml:text-start">Know more about the product. Provide solution of any issue of the product. </div>

            </div>


          </div>
        </div>

       
        
      </div>
      <div className='bg-white dark:bg-black'>
      
        <div
          className="max-w-[1200px] mx-auto px-4 sm:px-20 scroll-mt-[65px] pb-12"
          id="blog-list"
        >
          <div className='dark:text-white text-black font-bold text-2xl pt-8 '>
            Blog 
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6'>
            {data?.map((item:any, index:number)=>(
              <div key={index} className='h-[300px] relative group'>
                <div className=' absolute top-0 w-full group-hover:translate-y-0 duration-200 dark:text-white text-gray-800 bg-slate-200 dark:bg-slate-800 p-4 rounded-t-3xl font-bold group-hover:hidden'>
                  {item.title}
                </div>

                <Image src={blog} alt='' className='h-[300px] rounded-3xl object-cover z-10'/>

                <div className=' z-20 absolute bottom-0 backdrop-blur-3xl bg-black opacity-70 h-0 group-hover:h-full w-full duration-200 rounded-3xl'>
                  
                </div>

                <Link href={`/blog/${item.slug}`} className='z-30 absolute bottom-0 p-6 h-0 w-0 overflow-hidden group-hover:h-full group-hover:w-full duration-200 rounded-3xl'>
                  <div className='text-white font-bold text-xl'>{item.title}</div>
                  <br /> <br />
                  <div className='flex gap-2 items-center mt-6 text-white'><SlCalender /><span className='text-white'>{moment(item.datetime).format('DD-MMMM-YYYY')}</span></div>

                 
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Blog


export async function getServerSideProps() {
  try {
    const res = await fetch(`${API_URL}/api/blogs/`);  
    const data = await res.json();

    // If the request fails, return empty data or handle the error
    if (!res.ok) {
      return { props: { data: [] } };
    }

    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { data: [] } };
  }
}