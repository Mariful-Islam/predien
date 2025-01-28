import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import React, { useState } from "react";
import career from "@/assets/Career.jpg";
import Link from "next/link";
import { HiArrowDownRight, HiArrowTurnRightDown } from "react-icons/hi2";



const API_URL = process.env.NODE_ENV==="production" ? "https://predien.vercel.app" : "http://localhost:3000"


function Career({data}:{data: any}) {

  return (
    <>
      <div className="text-black relative overflow-hidden h-screen bg-gradient-to-l from-blue-600 dark:from-blue-800 via-orange-500 dark:via-orange-700 to-red-400 dark:to-red-700 dark:bg-black ">
        <Header />
        <div className="z-10 relative h-screen flex items-start ml:items-center">
          <div className="max-w-[1200px] mx-auto  px-4 sm:px-20 flex flex-col ml:flex-row gap-10 ml:gap-4 relative">
            <div
              className="w-full ml:w-1/2 h-full"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <h1 className="text-3xl text-center ml:text-start ml:text-6xl text-white mt-16 ml:mt-[100px]">
                Become a part of our dynamic and innovative team{" "}
                <span className="font-bold text-blue-600">_</span>
              </h1>
            </div>

            <div className="w-full ml:w-1/2">
              <div className="group relative h-[400px]">
                <Image
                  src={career}
                  alt="career"
                  className="h-[400px] object-cover rounded-3xl"
                />

                <div className="h-0 overflow-hidden absolute bottom-0 right-0 duration-200 backdrop-blur-md opacity-50 bg-gray-600 w-full group-hover:h-[400px] rounded-3xl "></div>

                <div className="h-0 overflow-hidden absolute bottom-0 right-0 duration-200 w-full group-hover:h-[400px] flex justify-center items-center">
                  <Link
                    href={`#job-list`}
                    className="group relative bg-blue-600 text-white px-12 py-2 rounded-full hover:bg-blue-700 duration-200 font-bold flex gap-2 items-center"
                  >
                    Explore
                    
                    <HiArrowTurnRightDown className="duration-200 stroke-1"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        
      </div>
      
      <div
        className="scroll-mt-[65px] bg-white dark:bg-black"
        id="job-list"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-20 ">
          <div className='dark:text-white text-black font-bold text-2xl pt-8 '>
            Jobs
          </div>
          <div className='flex flex-col gap-8 pt-6 pb-10'>

            {data?.map((item:any, index:number)=>(
              <div key={index} className='relative group flex justify-between items-center'>
                <div>
                  <h1 className="text-black dark:text-white font-bold text-xl sm:text-3xl">{item.job_title}</h1>
                  <div className="flex gap-2 mt-4">
                    <div className="text-blue-500 text-sm font-bold bg-blue-100 px-4 py-1 rounded-full">
                      {item.duration}
                    </div>
                    <div className="text-green-500 text-sm font-bold bg-green-100 px-4 py-1 rounded-full">
                      {item.location}
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    href={`/career/${item.slug}`}
                    className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-700 duration-200"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Career;




export async function getServerSideProps() {
  try {
    const res = await fetch(`${API_URL}/api/jobs/`);  
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