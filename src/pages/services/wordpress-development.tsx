import Header from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import theme from '@/assets/wordpress.png'
import Footer from '@/components/Footer'
import Introduction from '@/components/WordpressDevelopment/Introduction'

function WordpressDevelopment() {
  const BASE_URL = 'https://predien.vercel.app'
  return (
    <>
      <Head>
        <title>Predien | Wordpress Development </title>
        <link rel="icon" href="/predien.png" />
        <meta name="description" content="Boost your online presence with custom WordPress and web development services. We create responsive, SEO-friendly websites tailored to your business needs." />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Md Marful Islam" />
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
        <div className="relative ">
          <div className="z-20 relative">
            <Header />
            <div
                className="max-w-[1200px] mx-auto w-full px-4 sm:px-20 flex flex-col justify-center h-[320px]"
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <h1 className="text-sky-500 text-xl font-bold text-center">
                  Wordpress Development
                </h1>
                <h3 className="text-slate-50 dark:text-slate-300 text-2xl md:text-5xl font-semibold text-center mt-4">
                  Build Responsive, Functional and Modern Website
                </h3>
                <div className="mt-10 flex flex-col gap-2 xs:flex-row justify-center">
                <Link
                  href="mailto:marifulesgiu@gmail.com"
                  target="_blank"
                  className="border text-center border-sky-500 rounded-md px-8 py-2 text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950 duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className=" ml-0 text-center xs:ml-4 bg-sky-500 px-8 py-2 text-white rounded-md hover:bg-sky-700 duration-200"
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

      </div>

      </div>

      
      <Footer/>
    </>
  )
}

export default WordpressDevelopment