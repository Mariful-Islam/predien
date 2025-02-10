import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import theme from '@/assets/gis.png'
import Footer from '@/components/Footer'
import Introduction from '@/components/GIS/Introduction'
import TechStack from '@/components/GIS/TechStack'
import { BASE_URL } from './custom-software-development'
import Project from '@/components/GIS/Project'
import ServiceHeading from '@/components/services/ServiceHeading'

function GeographicInformationSystem({data}: {data: any}) {
  const BASE_URL = 'https://predien.vercel.app'
  return (
    <>
      <Head>
        <title>Predien | Geographic Information System </title>
        <link rel="icon" href="/predien.png" />

        <meta name="description" content="Leverage ArcGIS and Web GIS for powerful, scalable mapping and spatial analysis solutions. Enhance decision-making with interactive, real-time geospatial data." />
    
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${BASE_URL}/services/geographic-information-system`}/>

        <meta property="og:title" content="Predien | Geographic Information System " />
        <meta property="og:description" content="Expert GIS solutions using ArcGIS & QGIS for accurate mapping and spatial analysis. Unlock the power of geographic data with our advanced GIS software and services." />
        <meta property="og:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/gis.png" />
        <meta property="og:url" content={`${BASE_URL}/services/geographic-information-system/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Geographic Information System " />
        <meta name="twitter:description" content="Expert GIS solutions using ArcGIS & QGIS for accurate mapping and spatial analysis. Unlock the power of geographic data with our advanced GIS software and services." />
        <meta name="twitter:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/gis.png" />
        <meta name="twitter:site" content="@predien" />

      </Head>
      <div className="bg-white dark:bg-black">

        <ServiceHeading
          data={{
            title: 'Geographic Information System',
            description: 'Building Interactive Mapping with Modern Technologies',
            bgImage: theme,
            color: 'orange'
          }}
        />
      
        <div className="max-w-[1200px] mx-auto w-full px-4 py-20 sm:px-20">
          <Introduction/>
          <Project data={data} />
          <TechStack/>
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default GeographicInformationSystem


export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/api/projects?type=gis`, {cache: 'no-cache'})
  const data = await response.json()

  return {
    props: {data}
  }
}