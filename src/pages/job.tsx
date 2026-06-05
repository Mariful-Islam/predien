import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { HiArrowLongDown } from 'react-icons/hi2';
import { FiBriefcase, FiMapPin, FiArrowRight } from 'react-icons/fi';

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnchorHeadingPage from '@/components/global/AnchorHeadingPage';
import HeadingPage from '@/components/global/HeadingPage';
import SubHeadingPage from '@/components/global/SubHeadingPage';

// Assets
import CareerHero from "@/assets/career.png";

export const API_URL = process.env.NODE_ENV === "production" 
  ? "https://predien.vercel.app" 
  : "http://localhost:3000";

interface CareerProps {
  data: any[];
}

const Career: React.FC<CareerProps> = ({ data }) => {
  return (
    <div className="selection:bg-blue-500 selection:text-white">
      <Head>
        <title>Predien | Career</title>
        <link rel="canonical" href="https://predien.vercel.app/career" />
      </Head>

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center bg-white dark:bg-[#020617] transition-colors duration-700 overflow-hidden pt-20">
        
        {/* Cinematic Ambient Glow */}
        <div className="absolute inset-0 opacity-0 dark:opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-blue-600/30 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-10"
            >
              <AnchorHeadingPage text="Join Our Crew" />
              
              <HeadingPage firstText="Build the" secondText="Future." />

              <SubHeadingPage text="Become a part of our dynamic and innovative team. Find your fit, contribute to bleeding-edge systems, and gain world-class engineering perspective." />

              <div className="pt-6">
                <Link href="#job-list" className="group flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:border-transparent transition-all duration-500">
                    <HiArrowLongDown className="text-2xl text-slate-900 dark:text-white group-hover:text-white group-hover:translate-y-2 transition-all" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Explore</span>
                    <span className="text-slate-950 dark:text-white font-black uppercase tracking-[0.1em] text-sm">Open Positions</span>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Right Visual Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-slate-100 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10 bg-slate-100">
                <Image 
                  src={CareerHero} 
                  alt="Predien Careers" 
                  priority
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-60" />
              </div>
              <div className="absolute -top-8 -right-8 w-full h-full border-[1px] border-slate-200 dark:border-blue-500/20 rounded-[60px] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- OPEN JOBS LIST SECTION --- */}
      <main id="job-list" className="bg-gray-50 dark:bg-[#01040f] py-12 transition-colors duration-700 scroll-mt-[65px]">
        <div className="max-w-[1200px] mx-auto px-8">
          
          <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-12">
            <h2 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
              Available Positions<span className="text-blue-600 dark:text-blue-500">_</span>
            </h2>
            <p className="hidden md:block text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
              {data?.length || 0} Open Opportunities
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {data?.map((item: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white dark:bg-[#090d16] border border-slate-200/60 dark:border-slate-900 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300">
                    {item.job_title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-4 py-1.5 rounded-full">
                      <FiBriefcase />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-1.5 rounded-full">
                      <FiMapPin />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-auto self-stretch sm:self-auto flex items-center">
                  <Link
                    href={`/job/${item.slug}`}
                    className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold tracking-wide rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300 group-hover:scale-[1.02] sm:group-hover:scale-100"
                  >
                    <span>Apply Position</span>
                    <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}

            {(!data || data.length === 0) && (
              <div className="text-center py-20 bg-white dark:bg-[#090d16] border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <p className="text-slate-400 font-medium">No open positions at this moment. Check back later!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Career;

export async function getServerSideProps() {
  try {
    const res = await fetch(`${API_URL}/api/jobs/`);  
    const data = await res.json();

    if (!res.ok) {
      return { props: { data: [] } };
    }

    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { data: [] } };
  }
}