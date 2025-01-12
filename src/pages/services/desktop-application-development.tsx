import Header from '@/components/Header'
import Head from 'next/head'
import { env } from 'process'
import React from 'react'

function DesktopApplicationDevelopment() {
  const BASE_URL = env.NODE_ENV === "production" ? 'https://predien.vercel.app' : 'http://localhost:3000'
  return (
    <>
      <Head>
        <title>Predien | Desktop Application Development </title>
        <link rel="icon" href="/predien.png" />

        <meta name="description" content="Custom desktop application development services for seamless, high-performance software solutions tailored to your business requirements and workflow." />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Md Marful Islam" />
        <link rel="canonical" href={`${BASE_URL}/services/desktop-application-development`}/>

        <meta property="og:title" content="Predien | Desktop Application Development " />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content={`${BASE_URL}/services/desktop-application-development`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Desktop Application Development " />
        <meta name="twitter:description" content="Page description for Twitter" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:site" content="@predien" />


        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="al:ios:app_name" content="Predien" />



      </Head>
      <div>
        <Header/>
        DataExtraction
      </div>
    </>
  )
}

export default DesktopApplicationDevelopment