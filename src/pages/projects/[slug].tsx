import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft } from "react-icons/hi";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { slateToHtml } from "@/components/slatetoHtml";
import { GoArrowLeft } from "react-icons/go";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://predien.vercel.app"
    : "http://localhost:3000";

interface ProjectDetailsProps {
  data: {
    title?: string;
    project_name?: string;
    brief?: string;
    description?: any;
    category?: string;
    client_region?: string;
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ data }:any) => {
  const router = useRouter();

  const serializeToHtml = useMemo(() => {
    if (!data?.description) return "";
    try {
      const parsedData = typeof data.description === "string" 
        ? JSON.parse(data.description) 
        : data.description;
      return slateToHtml(parsedData);
    } catch (e) {
      return "";
    }
  }, [data?.description]);

  return (
    <div className="selection:bg-slate-200 dark:selection:bg-slate-800 bg-white dark:bg-[#02040a] text-slate-900 dark:text-slate-100 transition-colors duration-500 min-h-screen flex flex-col font-sans antialiased">
      <Head>
        <title>{`Predien — ${data?.meta?.title || "Case Study"}`}</title>
        <meta name="description" content={data?.meta?.description || "In-depth project case study."} />
        <link rel="icon" href="/predien.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${API_URL}/projects/${data?.slug}`} />
      </Head>

      <Header />

      {/* --- MAIN EDITORIAL FRAME --- */}
      <main className="flex-grow max-w-[1300px] mx-auto px-8 sm:px-12 pt-12 pb-32 w-full">
        
        {/* Back navigation element styled like a footnotes link */}
        <div className="mb-8 mt-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <button
            onClick={() => router.push("/project")}
            className="group flex gap-4 items-center text-slate-400 hover:text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
              <GoArrowLeft className="text-lg group-hover:text-white transition-colors" />
            </div>
            Back
          </button>
        </div>

        {/* Dynamic Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          
          {/* LEFT SIDEBAR: Static Primary Spec Blocks */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Project Name Tracker */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400 block">Project Title</span>
              <p className="text-xl font-medium tracking-tight text-slate-600 dark:text-slate-300">
                {data?.project_name || "System Project"}
              </p>
            </div>

            {/* Quick Metadata Metadata Parameters */}
            <div className="grid grid-cols-2 gap-8 border-t border-slate-100 dark:border-slate-900 text-xs">
              <div className="space-y-1">
                <span className="uppercase font-bold tracking-widest text-slate-400 text-[9px]">Classification</span>
                <p className="font-medium text-slate-700 dark:text-slate-300">{data?.category || "Custom Build"}</p>
              </div>
              <div className="space-y-1">
                <span className="uppercase font-bold tracking-widest text-slate-400 text-[9px]">Scope Region</span>
                <p className="font-medium text-slate-700 dark:text-slate-300">{data?.client_region || "International"}</p>
              </div>
            </div>

            {/* Dynamic Project Abstract Summary */}
            {data?.brief && (
              <div className="border-t border-slate-100 dark:border-slate-900 ">
                <p className="text-base sm:text-lg leading-relaxed font-normal text-slate-500 dark:text-slate-400 italic">
                  “ {data.brief} ”
                </p>
              </div>
            )}
          </div>

          {/* RIGHT VIEWPORT: Smooth Rich Narrative Streaming Window */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Clean Massive Context Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-slate-950 dark:text-white"
            >
              {"Project Overview"}
            </motion.h1>

            {/* Injected Content Payload Pipeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-t border-slate-100 dark:border-slate-900"
            >
              {serializeToHtml ? (
                <div
                  className="prose prose-slate dark:prose-invert max-w-none
                  prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:text-base prose-p:leading-7 prose-p:mb-6
                  prose-headings:text-slate-950 dark:prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-strong:text-slate-950 dark:prose-strong:text-white prose-strong:font-semibold
                  prose-a:text-slate-950 dark:prose-a:text-white prose-a:underline hover:opacity-70
                  prose-li:text-slate-600 dark:prose-li:text-slate-400"
                  dangerouslySetInnerHTML={{ __html: serializeToHtml }}
                />
              ) : (
                <p className="text-xs font-mono text-slate-400 tracking-wide">[Void Log Data]</p>
              )}
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetails;

export async function getServerSideProps(context: any) {
  const { slug } = context.params;

  try {
    const res = await fetch(`${API_URL}/api/projects/${slug}/`);
    const data = await res.json();

    if (!res.ok) {
      return { props: { data: {} } };
    }

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: {} } };
  }
}