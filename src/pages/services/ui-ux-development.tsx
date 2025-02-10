import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import theme from '@/assets/ui ux.png'
import Footer from '@/components/Footer'
import Introduction from '@/components/UIUXDev/Introduction'
import { BASE_URL } from './custom-software-development'
import Project from '@/components/UIUXDev/Project'
import ServiceHeading from '@/components/services/ServiceHeading'



function UiUxDevelopment({data}:{data:any}) {
  const BASE_URL = 'https://predien.vercel.app'
  return (
    <>
      <Head>
        <title>Predien | UI UX Development</title>
        <link rel="icon" href="/predien.png" />

        <meta name="description" content="Elevate your digital experience with expert UI/UX design and frontend development. We specialize in Figma to create intuitive, user-friendly interfaces." />
  
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${BASE_URL}/services/ui-ux-development`}/>

        <meta property="og:title" content="Predien | UI UX Development" />
        <meta property="og:description" content="Elevate your digital experience with expert UI/UX design and frontend development. We specialize in Figma to create intuitive, user-friendly interfaces." />
        <meta property="og:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/ui%20ux.png?t=2025-01-25T09%3A31%3A30.571Z" />
        <meta property="og:url" content={`${BASE_URL}/services/ui-ux-development`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | UI UX Development" />
        <meta name="twitter:description" content="Elevate your digital experience with expert UI/UX design and frontend development. We specialize in Figma to create intuitive, user-friendly interfaces." />
        <meta name="twitter:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/ui%20ux.png?t=2025-01-25T09%3A31%3A30.571Z" />
        <meta name="twitter:site" content="@predien" />

      </Head>
      <div className="bg-white dark:bg-black">

        <ServiceHeading
          data={{
            title: 'UI UX Development',
            description: 'Building Clean Minimal Modern User Interface and User Experience',
            bgImage: theme,
            color: 'orange'
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

export default UiUxDevelopment



export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/api/projects?type=web`, {cache: 'no-cache'})
  const data = await response.json()

  return {
    props: {data}
  }
}
