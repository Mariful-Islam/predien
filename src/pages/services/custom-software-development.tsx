import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import howWeWork from "@/assets/How We Work Section_ - visual selection.svg";
import Image from "next/image";
import stack from "@/assets/STack.svg";
import stackVisual from "@/assets/stack visuals.svg";
import Link from "next/link";
import theme from "@/assets/724eb7550018979e478737975038495a_high.webp";
import Footer from "@/components/Footer";
import Project from "@/components/CustomSoftwareDevelopment/Project";
import Introduction from "@/components/CustomSoftwareDevelopment/Introduction";
import ServiceHeading from "@/components/services/ServiceHeading";

export const BASE_URL = process.env.NODE_ENV === "production" ? "https://predien.vercel.app" : "http://localhost:3000";

function CustomSoftwareDevelopment({data}: {data: any}) {


  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false); // Hide button when back to the top
    }
  };

  // Listen to the scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Predien | Custom Software Development</title>
        <link rel="icon" href="/predien.png" />

        <meta
          name="description"
          content="Custom software development tailored to your business needs. We create innovative, scalable solutions that drive growth and optimize performance for any industry."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://predien.vercel.app/services/custom-software-development"
        />

        <meta
          property="og:title"
          content="Predien | Custom Software Development"
        />
        <meta
          property="og:description"
          content="Custom software development tailored to your business needs. We create innovative, scalable solutions that drive growth and optimize performance for any industry."
        />
        <meta
          property="og:image"
          content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/undefined_image%20(1).png"
        />
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
          content="Custom software development tailored to your business needs. We create innovative, scalable solutions that drive growth and optimize performance for any industry."
        />
        <meta
          name="twitter:image"
          content="https://muuqbjrcjnumvsekecmg.supabase.co/storage/v1/object/public/avatars/undefined_image%20(1).png"
        />
        <meta name="twitter:site" content="@predien" />
      </Head>

      <div className="bg-white dark:bg-black">

        <ServiceHeading
          data={{
            title: 'Custom Software Development',
            description: 'Building Scalable and Efficient Solutions with Modern Technologies',
            bgImage: theme,
            color: 'green'
          }}  
       />


        <div>
          <div className="max-w-[1200px] mx-auto w-full px-4 py-20 md:px-20">
            <div 
              className=""
              
            >
             
              <Introduction/>

              <Project data={data} />

              <div className="mt-8">
                <h1 
                  className="text-green-500 font-bold text-2xl"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                >
                  Technology
                </h1>
                <div 
                  className="flex flex-col gap-6 items-center"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                >
                  <Image
                    src={stack}
                    alt="stack"
                    className="w-[600px] h-[600px]"
                  />
                  <Image
                    src={stackVisual}
                    alt="stack-visual"
                    className="w-[600px] h-[600px]"
                  />
                </div>
                <div className="ml-6 mt-2 text-slate-500 dark:text-slate-300">
                  <ul className="list-disc">
                    <li>
                      <b>Frontend</b>
                      <ul className="list-disc ml-4">
                        <li>nextjs</li>
                        <li>reactjs</li>
                      </ul>
                    </li>
                    <li>
                      <b>Backend</b>
                      <ul className="list-disc ml-4">
                        <li>django</li>
                      </ul>
                    </li>
                    <li>
                      <b>API development </b>
                      <ul className="list-disc ml-4">
                        <li>django rest framework</li>
                      </ul>
                    </li>
                    <li>
                      <b>Database</b>
                      <ul className="list-disc ml-4">
                        <li>Sqlite3</li>
                        <li>MySQL</li>
                        <li>Postgresql</li>
                      </ul>
                    </li>
                    <li>
                      <b>Version Control</b>
                      <ul className="list-disc ml-4">
                        <li>Git / GitHub</li>
                      </ul>
                    </li>
                    <li>
                      <b>Deployment & Hosting</b>
                      <ul className="list-disc ml-4">
                        <li>
                          AWS / Heroku / Docker (or your preferred platforms)
                        </li>
                      </ul>
                    </li>

                    <li>
                      <b>Optimize API</b>
                      <ul className="list-disc ml-4">
                        <li>
                          Database Optimization such as Indexing, Select Related
                          & Prefetch Related, Paginate Results
                        </li>
                        <li>
                          Optimize Serializer Performance such as Use fields to
                          limit serializer data, Avoid Nested Serializers (When
                          Possible)
                        </li>
                        <li>
                          Caching example Use Caching for Expensive Queries
                        </li>
                        <li>
                          Optimize API Endpoints such as Use only() or defer()
                          for Queryset Optimization and Limit Response Size
                        </li>
                        <li>
                          Rate Limiting & Throttling: Use DRF’s built-in
                          throttling to limit the number of requests per client.
                          This helps avoid overloading your API.
                        </li>
                        <li>
                          Use Asynchronous Views (for I/O-bound operations)
                        </li>
                        <li>Code Splitting and Lazy Loading</li>
                        <li>Optimize API Calls</li>
                        <li>Debouncing/Throttling API Requests</li>
                        <li>Caching</li>
                        <li>Optimize Images and Static Assets</li>
                        <li>
                          Server-Side Rendering (SSR) and Static Site Generation
                          (SSG) with Next.js
                        </li>
                        <li>Use a CDN for Static Assets</li>
                        <li>
                          Efficient State Management (React Context, Redux or
                          Zustand, useMemo, useCallback, or React’s
                          PureComponent)
                        </li>
                      </ul>
                    </li>
                    <li>
                      <b>Optimize Application</b>
                      <ul className="list-disc ml-4">
                        <li>
                          Asynchronous Processing for Long-running Tasks
                          (Celery, Django Q)
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-12">
                <h1 className="text-green-500 font-bold">
                  Our Development Process
                </h1>
                <div className="flex justify-center">
                  <Image
                    src={howWeWork}
                    alt="how-we-work"
                    className="text-white w-[600px] h-[600px]"
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-2 xs:flex-row justify-center">
                <Link
                  href="/contact#contact"
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

      <Footer />
    </>
  );
}

export default CustomSoftwareDevelopment;



export async function getServerSideProps() {
  const response = await fetch(`${BASE_URL}/api/projects?type=web`, {cache: 'no-cache'})
  const data = await response.json()

  return {
    props: {data}
  }
}

