import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import theme from '@/assets/data engineer.png'
import Footer from '@/components/Footer'
import Introduction from '@/components/DataAnalysis/Introduction'
import { BASE_URL } from './custom-software-development'
import Project from '@/components/DataAnalysis/Project'
import ServiceHeading from '@/components/services/ServiceHeading'



function DataExtraction({data}: {data: any}) {
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

        <ServiceHeading 
          data={{
            title: 'Data Extraction and Analysis',
            description: 'Building Scalable and Efficient Solutions with Modern Technologies',
            bgImage: theme,
            color: 'violet'
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

export default DataExtraction


export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/api/projects?type=data`, {cache: 'no-cache'})
  const data = await response.json()

  return {
    props: {data}
  }
}
