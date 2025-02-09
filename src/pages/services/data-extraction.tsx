import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import theme from '@/assets/data engineer.png'
import Footer from '@/components/Footer'


function DataExtraction() {
  const BASE_URL = 'https://predien.vercel.app' 
  return (
    <>
      <Head>
        <title>Predien | Data Extraction and Analysis </title>
        <link rel="icon" href="/predien.png" />

        <meta name="description" content="Expert data extraction and analysis services using ETL processes and efficient pipelines. Transform raw data into actionable insights for smarter business decisions." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${BASE_URL}/services/data-extraction`}/>

        <meta property="og:title" content="Predien | Data Extraction and Analysis" />
        <meta property="og:description" content="Expert data extraction and analysis services using ETL processes and efficient pipelines. Transform raw data into actionable insights for smarter business decisions." />
        <meta property="og:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/data%20engineer.png" />
        <meta property="og:url" content={`${BASE_URL}/services/data-extraction`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Data Extraction and Analysis" />
        <meta name="twitter:description" content="Expert data extraction and analysis services using ETL processes and efficient pipelines. Transform raw data into actionable insights for smarter business decisions." />
        <meta name="twitter:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/data%20engineer.png" />
        <meta name="twitter:site" content="@predien" />

      </Head>
      <div className="bg-white dark:bg-black">
        <div className="relative ">
          <div className="z-20 relative">
            <Header />
            <div
               className="max-w-[1200px] mx-auto w-full px-4 sm:px-20 flex flex-col justify-center h-[320px]"
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <h1 className="text-violet-500 text-xl font-bold text-center">
                  Data Extraction and Analysis
                </h1>
                <h3 className="text-slate-50 dark:text-slate-300 text-2xl md:text-5xl font-semibold text-center mt-4">
                  Building Scalable and Efficient Solutions with Modern Technologies
                </h3>
                <div className="mt-10 flex flex-col gap-2 xs:flex-row justify-center">
                <Link
                  href="/contact#contact"
                  className="border text-center border-violet-500 rounded-md px-8 py-2 text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950 duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className=" ml-0 text-center xs:ml-4 bg-violet-500 px-8 py-2 text-white rounded-md hover:bg-violet-700 duration-200"
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
      </div>

      <Footer/>
    </>
  )
}

export default DataExtraction