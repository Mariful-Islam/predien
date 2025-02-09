import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import theme from '@/assets/desktop application developmetnt.png'
import Footer from '@/components/Footer'
import Introduction from '@/components/DesktopAppDev/Introduction'
import { BASE_URL } from './custom-software-development'
import Project from '@/components/DesktopAppDev/Project'



function DesktopApplicationDevelopment({data}: {data:any}) {
  const BASE_URL = 'https://predien.vercel.app'
  return (
    <>
      <Head>
        <title>Predien | Desktop Application Development </title>
        <link rel="icon" href="/predien.png" />

        <meta name="description" content="Custom desktop application development services for seamless, high-performance software solutions tailored to your business requirements and workflow." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${BASE_URL}/services/desktop-application-development`}/>

        <meta property="og:title" content="Predien | Desktop Application Development " />
        <meta property="og:description" content="Specialized in desktop application development for enterprise platforms. We create robust, scalable desktop solutions to enhance business productivity and performance." />
        <meta property="og:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/desktop%20application%20developmetnt.png?t=2025-01-25T09%3A48%3A05.615Z" />
        <meta property="og:url" content={`${BASE_URL}/services/desktop-application-development`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Desktop Application Development " />
        <meta name="twitter:description" content="Specialized in desktop application development for enterprise platforms. We create robust, scalable desktop solutions to enhance business productivity and performance." />
        <meta name="twitter:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/desktop%20application%20developmetnt.png?t=2025-01-25T09%3A48%3A05.615Z" />
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
                <h1 className="text-yellow-500 text-xl font-bold text-center">
                  Desktop Application Development
                </h1>
                <h3 className="text-slate-50 dark:text-slate-300 text-2xl md:text-5xl font-semibold text-center mt-4">
                  Building Robust Scalabale Application
                </h3>
                <div className="mt-10 flex flex-col gap-2 xs:flex-row justify-center">
                <Link
                  href="/contact#contact"
                  className="border text-center border-yellow-500 rounded-md px-8 py-2 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950 duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className=" ml-0 text-center xs:ml-4 bg-yellow-500 px-8 py-2 text-white rounded-md hover:bg-yellow-700 duration-200"
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

        <div className="max-w-[1200px] mx-auto w-full px-4 py-20 md:px-20 text-slate-800 dark:text-slate-200 ">
          <Introduction/>
          <Project data={data} />
        </div>
      </div>
      

      <Footer/>
    </>
  )
}

export default DesktopApplicationDevelopment


export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/api/projects?type=web`, {cache: 'no-cache'})
  const data = await response.json()

  return {
    props: {data}
  }
}