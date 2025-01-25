import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from 'aos';
import Head from "next/head";
import { env } from "process";
import ScrollToTop from "@/components/common/scrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    // Initialize AOS on component mount
    AOS.init({
      duration: 1000,  // Animation duration (1 second)
      once: true,      // Animation runs once when element comes into view
      easing: 'ease-in-out', // Easing function for the animation
    });
  }, []);
  
  const BASE_URL = 'https://predien.vercel.app'

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Predien",
    "url": "https://predien.vercel.app/",
    "mainEntityOfPage": "https://predien.vercel.app/",
  };


  return (
    <>
      <Head>
        <title>Predien | Software development agency</title>
        <link rel="icon" href="/predien.png" />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Md Marful Islam" />
        <link rel="canonical" href={`${BASE_URL}/`}/>

        <meta
          name="description"
          content="Custom software solutions tailored to your needs. Our expert team specializes in innovative development and R&D to drive your business forward."
        />

        <meta property="og:title" content="Predien | Custom Software Development" />
        <meta property="og:description" content="Discover innovative, custom software solutions tailored to your needs. Our expert team specializes in developing cutting-edge software and conducting advanced research and development to drive your business forward." />
        <meta property="og:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/cover.png" />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Custom Software Development" />
        <meta name="twitter:description" content="Building custom software solutions & driving innovation through R&D. We create what you need to elevate your business." />
        <meta name="twitter:image" content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/cover.png" />
        <meta name="twitter:site" content="@predien" />


        <link rel="apple-touch-icon" href="/predien.png" />
        <meta property="al:ios:app_name" content="Predien" />


        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4EW3H102VV"></script>
        <meta name="google-adsense-account" content="ca-pub-9169170789711891"/>
        
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9169170789711891"
          crossOrigin="anonymous"></script>
          
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4EW3H102VV');
            `,
          }}
        />
        <link rel="canonical" href="https://predien.vercel.app"></link>
        <meta name="google-site-verification" content="0eB9dS8KcnJhSKZfdIbPDKlV9Mu2paLVQPPqiAind" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
        <ScrollToTop/>
        <ToastContainer />
      </ThemeProvider>
    </>
  )
}
