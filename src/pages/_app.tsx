import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from 'aos';
import Head from "next/head";
import { env } from "process";
import ScrollToTop from "@/components/common/scrollToTop";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
    // Initialize AOS on component mount
    AOS.init({
      duration: 1000,  // Animation duration (1 second)
      once: true,      // Animation runs once when element comes into view
      easing: 'ease-in-out', // Easing function for the animation
    });
  }, []);
  
  const BASE_URL = env.NODE_ENV === "production" ? 'https://predien.vercel.app' : 'http://localhost:3000'

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

        <meta property="og:title" content="Predien | Custom Software Development" />
        <meta property="og:description" content="Description for social sharing" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Predien | Custom Software Development" />
        <meta name="twitter:description" content="Page description for Twitter" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:site" content="@predien" />


        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="al:ios:app_name" content="Predien" />


        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4EW3H102VV"/>
        <Script
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
        
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
        <ScrollToTop/>
      </ThemeProvider>
    </>
  )
}
