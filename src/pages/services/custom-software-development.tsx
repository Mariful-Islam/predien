import Header from "@/components/Header";
import Head from "next/head";
import { env } from "process";
import React from "react";
import howWeWork from '@/assets/How We Work Section_ - visual selection.svg'
import Image from "next/image";
import stack from '@/assets/STack.svg'
import stackVisual from '@/assets/stack visuals.svg'
import Link from "next/link";
import theme from "@/assets/724eb7550018979e478737975038495a_high.webp"
import Footer from "@/components/Footer";


function CustomSoftwareDevelopment() {
  const BASE_URL = env.NODE_ENV === "production"
      ? "https://predien.vercel.app"
      : "http://localhost:3000";
  return (
    <>
      <Head>
        <title>Predien | Custom Software Development</title>
        <link rel="icon" href="/predien.png" />

        <meta
          name="description"
          content="Predien creates tailored software solutions to meet yoour business needs. We main focus on django, django rest framework, reactjs, nextjs, react-native and expo."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Md Marful Islam" />
        <link
          rel="canonical"
          href={`${BASE_URL}/services/custom-software-development`}
        />

        <meta
          property="og:title"
          content="Predien | Custom Software Development"
        />
        <meta
          property="og:description"
          content="Description for social sharing"
        />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta
          property="og:url"
          content={`${BASE_URL}/services/custom-software-development`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Predien" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Predien | Custom Software Development"
        />
        <meta
          name="twitter:description"
          content="Page description for Twitter"
        />
        <meta name="twitter:image" content="" />
        <meta name="twitter:site" content="@predien" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="al:ios:app_name" content="Predien" />
      </Head>
      <div className="bg-white dark:bg-black">
        <div className="relative ">
          <div className="z-20 relative">
            <Header />
            <div
                className="max-w-[1200px] mx-auto w-full px-4 sm:px-20 mt-[80px] pb-12"
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <h1 className="text-green-500 text-xl font-bold text-center">
                  Custom Software Development
                </h1>
                <h3 className="text-slate-50 dark:text-slate-300 text-2xl md:text-5xl font-semibold text-center mt-4">
                  Building Scalable and Efficient Solutions with Modern Technologies
                </h3>
                <div className="mt-10 flex flex-col gap-2 xs:flex-row justify-center">
                <Link
                  href="mailto:marifulesgiu@gmail.com"
                  target="_blank"
                  className="border text-center border-green-500 rounded-md px-8 py-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-950 duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className=" ml-0 text-center xs:ml-4 bg-green-500 px-8 py-2 text-white rounded-md hover:bg-green-700 duration-200"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-0 z-10 ">
            <div className="backdrop-blur-3xl bg-black opacity-70 h-full w-full absolute top-0 right-0">

            </div>
            <Image
              src={theme}
              alt=""
              className="h-[430px] w-screen object-cover"
            />
          </div>
        </div>
        <div>
          <div className="max-w-[1200px] mx-auto w-full px-4 py-12 sm:px-20">
           

            <div className="xs:mt-[30px]">
              <div>
                <h1 className="text-green-500 font-bold text-2xl">Introduction</h1>
                <div className="text-slate-500 dark:text-slate-300 mt-2">
                  We specialize in designing custom UI/UX from the ground up,
                  ensuring an intuitive and seamless user experience. Our
                  process begins with creating tailored user interfaces, which
                  are then developed into dynamic front-end solutions using
                  ReactJS and NextJS. Next, we design and implement a robust
                  database structure and backend logic to support the
                  application’s functionality. Finally, we integrate APIs with
                  the front-end to ensure smooth communication and data flow
                  across the platform.
                </div>
              </div>

              <div className="mt-3">
                <h1 className="text-green-500 font-bold text-2xl">Technology</h1>
                <div className="">
                  <Image
                    src={stack}
                    alt="stack"
                    className="w-full"
                  />
                  <Image
                    src={stackVisual}
                    alt="stack-visual"
                    className="w-full"
                  />
                </div>
                <div className="ml-6 mt-2 text-slate-500 dark:text-slate-300">
                  <ul className="list-disc">
                    <li><b>Frontend</b>
                      <ul className="list-disc ml-4">
                        <li>nextjs</li>
                        <li>reactjs</li>
                      </ul>
                    </li>
                    <li><b>Backend</b> 
                      <ul className="list-disc ml-4">
                        <li>django</li>
                      </ul>
                    </li>
                    <li><b>API development </b>
                      <ul className="list-disc ml-4">
                        <li>django rest framework</li>
                      </ul>
                    </li>
                    <li><b>Database</b> 
                      <ul className="list-disc ml-4">
                        <li>Sqlite3</li>
                        <li>MySQL</li>
                        <li>Postgresql</li>
                      </ul>
                    </li>
                    <li><b>Version Control</b> 
                      <ul className="list-disc ml-4">
                        <li>Git / GitHub</li>
                      </ul>
                    </li>
                    <li><b>Deployment & Hosting</b> 
                      <ul className="list-disc ml-4">
                        <li>AWS / Heroku / Docker (or your preferred platforms)</li>
                      </ul>
                    </li>
                    
                    <li><b>Optimize API</b> 
                      <ul className="list-disc ml-4">
                        <li>Database Optimization such as Indexing, Select Related & Prefetch Related, Paginate Results</li>
                        <li>Optimize Serializer Performance such as Use fields to limit serializer data, Avoid Nested Serializers (When Possible)</li>
                        <li>Caching example Use Caching for Expensive Queries</li>
                        <li>Optimize API Endpoints such as Use only() or defer() for Queryset Optimization and Limit Response Size</li>
                        <li>Rate Limiting & Throttling: Use DRF’s built-in throttling to limit the number of requests per client. This helps avoid overloading your API.</li>
                        <li>Use Asynchronous Views (for I/O-bound operations)</li>
                        <li>Code Splitting and Lazy Loading</li>
                        <li>Optimize API Calls</li>
                        <li>Debouncing/Throttling API Requests</li>
                        <li>Caching</li>
                        <li>Optimize Images and Static Assets</li>
                        <li>Server-Side Rendering (SSR) and Static Site Generation (SSG) with Next.js</li>
                        <li>Use a CDN for Static Assets</li>
                        <li>Efficient State Management (React Context, Redux or Zustand, useMemo, useCallback, or React’s PureComponent)</li>
                      </ul>
                    </li>
                    <li><b>Optimize Application</b> 
                      <ul className="list-disc ml-4">
                        <li>Asynchronous Processing for Long-running Tasks (Celery, Django Q)</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-12">
                <h1 className="text-green-500 font-bold">Our Development Process</h1>
                <div>
                  <Image
                    src={howWeWork}
                    alt="how-we-work"
                    className="text-white"
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-2 xs:flex-row justify-center">
                <Link
                  href="mailto:marifulesgiu@gmail.com"
                  target="_blank"
                  className="text-center border border-green-500 rounded-md px-8 py-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-950 duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="#"
                  className=" ml-0 text-center xs:ml-4 bg-green-500 px-8 py-2 text-white rounded-md hover:bg-green-700 duration-200"
                >
                  Learn more
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      
      <Footer/>
    </>
  );
}

export default CustomSoftwareDevelopment;
