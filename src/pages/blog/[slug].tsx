import Footer from "@/components/Footer";
import Header from "@/components/Header";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { GoArrowLeft } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { slateToHtml } from "@/components/slatetoHtml";
import Head from "next/head";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://predien.vercel.app"
    : "http://localhost:3000";

function Blog({ data }: { data: any }) {
  const router = useRouter();

  // Memoize HTML serialization for performance
  const serializeToHtml = useMemo(() => {
    try {
      return slateToHtml(JSON.parse(data?.description || "[]"));
    } catch (e) {
      return "";
    }
  }, [data?.description]);

  // Extract structured headings for the sidebar
  const headings = useMemo(() => {
    try {
      const nodes = JSON.parse(data?.description || "[]");
      return nodes.filter(
        (n: any) => n.type === "heading-one" || n.type === "heading-two",
      );
    } catch (e) {
      return [];
    }
  }, [data?.description]);


  console.log("Blog data:", data);

  return (
    <div className="font-jost selection:bg-blue-500 selection:text-white">
      <Head>
        <title>{`Predien | ${data?.meta?.title}`}</title>
        <link rel="icon" href="/predien.png" />
        <meta name="description" content={data?.meta?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${API_URL}/blog/${data?.slug}`} />
      </Head>

      {/* --- CINEMATIC HEADER SPACE --- */}
      <div className="bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-900 transition-colors duration-500">
        <Header />
      </div>

      <main className="bg-white dark:bg-[#020617] transition-colors duration-500 ">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-20">
          {/* Navigation & Metadata */}
          <div className="mb-8 mt-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <button
              onClick={() => router.push("/blog")}
              className="group flex gap-4 items-center text-slate-400 hover:text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] transition-all"
            >
              <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                <GoArrowLeft className="text-lg group-hover:text-white transition-colors" />
              </div>
              Back to Journal
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-20">
            {/* --- MAIN CONTENT AREA (8/12 Columns) --- */}
            <article className="w-full lg:w-3/4">
              <h1 className="text-5xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter leading-[0.9] mb-12">
                {data?.title}
              </h1>

              <div className="flex gap-6 items-center text-slate-500 font-bold uppercase tracking-[0.3em] text-[12px]">
                <div className="flex items-center  gap-3">
                  <SlCalender className="text-blue-500 " size={20}/>
                  <span>
                    {moment(data?.datetime).format("DD MMMM YYYY")}
                  </span>
                </div>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="text-blue-500">{data?.topic?.name || "No Topic"}</span>
              </div>

              {/* Featured Image placeholder if data?.image exists */}
              {data?.image && (
                <div className="mb-16 mt-12 rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-900 shadow-2xl">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              )}

              {/* Prose Styling for Slate Content */}
              <div
                className="mt-10 prose prose-lg md:prose-xl dark:prose-invert prose-slate max-w-none 
                prose-headings:tracking-tighter prose-headings:font-black prose-headings:text-slate-950 dark:prose-headings:text-white
                prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-medium
                prose-strong:text-blue-600 dark:prose-strong:text-blue-500
                prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: serializeToHtml }}
              />
            </article>

            {/* --- SIDEBAR: TABLE OF CONTENTS (4/12 Columns) --- */}
            <aside className="w-full lg:w-1/4">
              <div className="sticky top-32 space-y-10">
                <div className="space-y-4">
                  <h4 className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">
                    On this page
                  </h4>
                  <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-900" />
                </div>

                <nav className="flex flex-col gap-6">
                  {headings.map((item: any, index: number) => {
                    const text = item.children[0].text;
                    const id = text.replace(/\s+/g, "-").toLowerCase();
                    const isActive = router.asPath.includes(`#${id}`);

                    return (
                      <Link
                        key={index}
                        href={`#${id}`}
                        className={`group relative text-sm font-bold tracking-tight transition-all duration-300 ${
                          isActive
                            ? "text-blue-500 pl-2"
                            : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {/* Flowing Line for active/hover state */}
                        <div
                          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] -translate-x-1 bg-blue-500 transition-all duration-500 ${isActive ? "h-full" : "h-0 group-hover:h-full"}`}
                        />
                        <span
                          className={
                            isActive
                              ? "translate-x-1 inline-block transition-transform"
                              : ""
                          }
                        >
                          {text}
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Newsletter / CTA Box */}
                <div className="mt-20 p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">
                    Newsletter
                  </p>
                  <p className="text-slate-900 dark:text-white font-bold mb-6">
                    Get technical insights delivered weekly.
                  </p>
                  <div className="relative h-[2px] w-full bg-slate-200 dark:bg-slate-800">
                    <div className="absolute inset-0 w-0 bg-blue-500 group-hover:w-full transition-all" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}/`);
    const data = await res.json();
    if (!res.ok) return { props: { data: {} } };
    return { props: { data } };
  } catch (error) {
    return { props: { data: {} } };
  }
}
