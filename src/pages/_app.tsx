import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
import Head from "next/head";
import ScrollToTop from "@/components/common/scrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { TopicProvider } from "@/context/TopicContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
    // Refresh AOS to ensure animations work on client-side transitions
    AOS.refresh();
  }, []);

  const BASE_URL = "https://predien.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Predien",
    url: "https://predien.vercel.app/",
    mainEntityOfPage: "https://predien.vercel.app/",
  };

  return (
    // Apply the variable and the className to the wrapper
    <main className={`${roboto.variable} font-sans`}>
      <Head>
        <title>Predien | Software development agency</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Verification & Adsense Config */}

        <meta name="google-adsense-account" content="ca-pub-9169170789711891" />

        {/* Global Meta Tags (Static) */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Md Marful Islam" />
        <meta property="og:site_name" content="Predien" />
        <meta property="al:ios:app_name" content="Predien" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@predien" />



        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Use a standard script tag for AdSense to avoid the data-nscript error */}
 
      </Head>
      <ThemeProvider>
        <SessionProvider session={session}>
          <TopicProvider>
            <div className={roboto.className}>
              <Component {...pageProps} />
              <ScrollToTop />
              <ToastContainer position="bottom-right" />
            </div>
          </TopicProvider>
        </SessionProvider>
      </ThemeProvider>
    </main>
  );
}
