import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { env } from 'process'
import React from 'react'
import theme from '@/assets/gis.png'
import Footer from '@/components/Footer'
import Introduction from '@/components/GIS/Introduction'
import TechStack from '@/components/GIS/TechStack'

function GeographicInformationSystem() {
  const BASE_URL = env.NODE_ENV === "production" ? 'https://predien.vercel.app' : 'http://localhost:3000'
  return (
    <>
      <Head>
        <title>Predien | Geographic Information System </title>
        <link rel="icon" href="/predien.png" />

        <meta name="description" content="Leverage ArcGIS and Web GIS for powerful, scalable mapping and spatial analysis solutions. Enhance decision-making with interactive, real-time geospatial data." />
    
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Md Marful Islam" />
        <link rel="canonical" href={`${BASE_URL}/services/geographic-information-system`}/>

        <meta property="og:title" content="Predien | Geographic Information System " />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content={`${BASE_URL}/services/geographic-information-system`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Geographic Information System " />
        <meta name="twitter:description" content="Page description for Twitter" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:site" content="@predien" />


        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="al:ios:app_name" content="Predien" />

      </Head>
      <div className="bg-white dark:bg-black">
        <div className="relative ">
          <div className="z-20 relative">
            <Header />
            <div
                className="max-w-[1200px] mx-auto w-full px-4 sm:px-20 mt-[80px] pb-12"
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <h1 className="text-orange-500 text-xl font-bold text-center">
                  Geographic Information System
                </h1>
                <h3 className="text-slate-50 dark:text-slate-300 text-2xl md:text-5xl font-semibold text-center mt-4">
                  Building Interactive Mapping with Modern Technologies
                </h3>
                <div className="mt-10 flex flex-col gap-2 xs:flex-row justify-center">
                <Link
                  href="mailto:marifulesgiu@gmail.com"
                  target="_blank"
                  className="border text-center border-orange-500 rounded-md px-8 py-2 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950 duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className=" ml-0 text-center xs:ml-4 bg-orange-500 px-8 py-2 text-white rounded-md hover:bg-orange-700 duration-200"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-0 z-10 ">
            <div className="backdrop-blur-3xl bg-black opacity-80 h-full w-full absolute top-0 right-0">

            </div>
            <Image
              src={theme}
              alt=""
              className="h-[430px] w-screen object-cover"
            />
          </div>
        </div>
      
        <div className="max-w-[1200px] mx-auto w-full px-4 py-12 sm:px-20 xs:mt-[30px]">
          <Introduction/>
          <TechStack/>
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default GeographicInformationSystem