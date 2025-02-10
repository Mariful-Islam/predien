import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import theme from "@/assets/mobile application development.png";
import Footer from "@/components/Footer";
import TechStack from "@/components/MobileAppDev/TechStack";
import Introduction from "@/components/MobileAppDev/Introduction";
import { BASE_URL } from "./custom-software-development";
import Project from "@/components/MobileAppDev/Project";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { FiArrowDownRight } from "react-icons/fi";
import ServiceHeading from "@/components/services/ServiceHeading";



function MobileApplicationDevelopment({data}: {data:any}) {
  const BASE_URL = "https://predien.vercel.app"
  return (
    <>
      <Head>
        <title>Predien | Mobile Application Development</title>
        <link rel="icon" href="/predien.png" />

        <meta
          name="description"
          content="Top mobile app development company creating custom software solutions for businesses. Innovative, scalable apps that deliver seamless digital experiences."
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${BASE_URL}/services/mobile-application-development`}/>

        <meta property="og:title" content="Predien | Mobile Application Development" />
        <meta property="og:description" content="Top mobile app development company creating custom software solutions for businesses. Innovative, scalable apps that deliver seamless digital experiences."/>
        <meta property="og:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/mobile%20application%20development.png" />
        <meta property="og:url" content={`${BASE_URL}/services/mobile-application-development`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Mobile Application Development" />
        <meta name="twitter:description" content="Top mobile app development company creating custom software solutions for businesses. Innovative, scalable apps that deliver seamless digital experiences."  />
        <meta name="twitter:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/mobile%20application%20development.png" />
        <meta name="twitter:site" content="@predien" />

      </Head>
      
      <div className="bg-white dark:bg-black">

        <ServiceHeading 
          data={{
            title: 'Mobile Application Development', 
            description: 'Building Scalable and Efficient Solutions with Modern Technologies',
            bgImage: theme,
            color: 'blue'
          }}/>

        <div className="max-w-[1200px] mx-auto w-full px-4 py-12 sm:px-20 mt-[20px]">
          
          <Introduction/>
          <Project data={data} />
          
          <TechStack/>

          <div>

          </div>
        
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MobileApplicationDevelopment;




export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/api/projects?type=mobile`, {cache: 'no-cache'})
  const data = await response.json()

  return {
    props: {data}
  }
}
