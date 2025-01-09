import Head from 'next/head'
import { env } from 'process'
import React from 'react'

function GeographicInformationSystem() {
  const BASE_URL = env.NODE_ENV === "production" ? 'https://predien.vercel.app' : 'http://localhost:3000'
  return (
    <>
      <Head>
        <title>Predien | Geographic Information System </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="Leverage ArcGIS and Web GIS for powerful, scalable mapping and spatial analysis solutions. Enhance decision-making with interactive, real-time geospatial data." />
        {/* <meta name="keywords" content="nextjs, seo, web development" /> */}
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
      DataExtraction
    </>
  )
}

export default GeographicInformationSystem