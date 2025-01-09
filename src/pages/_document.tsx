import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
