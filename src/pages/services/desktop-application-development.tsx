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
import ServiceHeading from '@/components/services/ServiceHeading'



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

        <ServiceHeading
          data={{
            title: 'Desktop Application Development',
            description: ' Building Robust Scalabale Destop Application',
            bgImage: theme,
            color: 'yellow'
          }}
        />

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
  const response = await fetch(`${BASE_URL}/api/projects?type=desktop`, {cache: 'no-cache'})
  const data = await response.json()

  return {
    props: {data}
  }
}