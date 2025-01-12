import Header from '@/components/Header'
import Head from 'next/head'
import { env } from 'process'
import React from 'react'

function MobileApplicationDevelopment() {
  const BASE_URL = env.NODE_ENV === "production" ? 'https://predien.vercel.app' : 'http://localhost:3000'
  return (
    <>
      <Head>
        <title>Predien | Mobile Application Development</title>
        <link rel="icon" href="/predien.png" />

        <meta name="description" content="Build high-performance, cross-platform mobile apps with React Native, Expo, and Django REST Framework. Eensuring seamless user experiences across iOS and Android devices." />
  
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Md Marful Islam" />
        <link rel="canonical" href={`${BASE_URL}/services/mobile-application-development`}/>

        <meta property="og:title" content="Predien | Mobile Application Development" />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content={`${BASE_URL}/services/mobile-application-development`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Mobile Application Development" />
        <meta name="twitter:description" content="Page description for Twitter" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:site" content="@predien" />


        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="al:ios:app_name" content="Predien" />

      </Head>
      <div>
        <Header/>
      </div>
    </>
  )
}

export default MobileApplicationDevelopment