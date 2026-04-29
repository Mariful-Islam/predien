import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const BASE_URL = 'https://predien.vercel.app';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Predien",
    "url": "https://predien.vercel.app/",
    "mainEntityOfPage": "https://predien.vercel.app/",
  };

  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        {/* Favicons & Icons */}
        <link rel="icon" href="/predien.png" />
        <link rel="apple-touch-icon" href="/predien.png" />
        
        {/* Verification & Adsense Config */}
        <meta name="google-site-verification" content="0eB9dS8KcnJhSKZfdIbPDKlV9Mu2paLVQPPqiAind" />
        <meta name="google-adsense-account" content="ca-pub-9169170789711891" />

        {/* Global Meta Tags (Static) */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Md Marful Islam" />
        <meta property="og:site_name" content="Predien" />
        <meta property="al:ios:app_name" content="Predien" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@predien" />

        {/* Fonts / Icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Use a standard script tag for AdSense to avoid the data-nscript error */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9169170789711891"
          crossOrigin="anonymous"
        ></script>
      </Head>
      
      <body className="antialiased dark:bg-black bg-white dark:text-white text-black">
        <Main />
        <NextScript />

        {/* Analytics & Ads - Loading after hydration for performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4EW3H102VV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4EW3H102VV');
          `}
        </Script>
        

      </body>
    </Html>
  );
}