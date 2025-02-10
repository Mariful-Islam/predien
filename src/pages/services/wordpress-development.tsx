import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import theme from '@/assets/wordpress.png'
import Footer from '@/components/Footer'
import Introduction from '@/components/WordpressDevelopment/Introduction'
import { BASE_URL } from './custom-software-development'
import Project from '@/components/WordpressDevelopment/Project'
import ServiceHeading from '@/components/services/ServiceHeading'

function WordpressDevelopment({data}: {data: any}) {
  const BASE_URL = 'https://predien.vercel.app'
  return (
    <>
      <Head>
        <title>Predien | Wordpress Development </title>
        <link rel="icon" href="/predien.png" />
        <meta name="description" content="Boost your online presence with custom WordPress and web development services. We create responsive, SEO-friendly websites tailored to your business needs." />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${BASE_URL}/services/wordpress-development`}/>

        <meta property="og:title" content="Predien | Wordpress Development" />
        <meta property="og:description" content="Boost your online presence with custom WordPress and web development services. We create responsive, SEO-friendly websites tailored to your business needs." />
        <meta property="og:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/wordpress.png" />
        <meta property="og:url" content={`${BASE_URL}/services/wordpress-development`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Wordpress Development" />
        <meta name="twitter:description" content="Boost your online presence with custom WordPress and web development services. We create responsive, SEO-friendly websites tailored to your business needs." />
        <meta name="twitter:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/wordpress.png" />
        <meta name="twitter:site" content="@predien" />

      </Head>
      <div className="bg-white dark:bg-black">

        <ServiceHeading
          data={{
            title: 'Wordpress Development',
            description: 'Build Responsive, Functional and Modern Website',
            bgImage: theme,
            color: 'sky'
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

export default WordpressDevelopment



export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/api/projects?type=wordpress`, {cache: 'no-cache'})
  const data = await response.json()

  return {
    props: {data}
  }
}
