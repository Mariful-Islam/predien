import { Html, Head, Main, NextScript } from "next/document";
import { env } from "process";

export default function Document() {
  const BASE_URL = env.NODE_ENV === "production" ? 'https://predien.vercel.app' : 'http://localhost:3000'
  
  return (
    <Html lang="en">
      <Head>
        <title>Predien | Software development agency</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* <meta name="description" content="Predien creates tailored software solutions to meet yoour business needs. We main focus on django, django rest framework, reactjs, nextjs, react-native and expo." /> */}
        {/* <meta name="keywords" content="nextjs, seo, web development" /> */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Md Marful Islam" />
        <link rel="canonical" href={`${BASE_URL}/`}></link>

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




        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4EW3H102VV"></script>
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
      </Head>
      <body className="antialiased dark:bg-black bg-white dark:text-white text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
