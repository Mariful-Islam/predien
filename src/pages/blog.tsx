import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLongDown } from 'react-icons/hi2';
import { SlCalender } from 'react-icons/sl';
import moment from 'moment';
import Head from 'next/head';

// Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Asset (Ensure this path is correct in your project)
import blogHero from '@/assets/blog.jpg';
import AnchorHeadingPage from '@/components/global/AnchorHeadingPage';
import HeadingPage from '@/components/global/HeadingPage';
import SubHeadingPage from '@/components/global/SubHeadingPage';



export const API_URL = process.env.NODE_ENV === "production" 
  ? "https://predien.vercel.app" 
  : "http://localhost:3000";

interface BlogProps {
  data: any[];
}

const Blog: React.FC<BlogProps> = ({ data }) => {
  return (
    <div className=" selection:bg-blue-500 selection:text-white">
      <Head>
        <title>Predien | Engineering Journal</title>
        <link rel="canonical" href="https://predien.vercel.app/blog" />
      </Head>

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center bg-white dark:bg-[#020617] transition-colors duration-700 overflow-hidden pt-20">
        
        {/* Cinematic Ambient Glow (Visible in Dark Mode) */}
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

              <AnchorHeadingPage text="The Engineering Journal" />
              


              <HeadingPage firstText="Digital" secondText="Dialogue." />

              <SubHeadingPage text="Deep dives into software architecture, minimalist design, and scalable automation." />

              <div className="pt-6">
                <Link href="#articles" className="group flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:border-transparent transition-all duration-500">
                    <HiArrowLongDown className="text-2xl text-slate-900 dark:text-white group-hover:text-white group-hover:translate-y-2 transition-all" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Explore</span>
                    <span className="text-slate-950 dark:text-white font-black uppercase tracking-[0.1em] text-sm">Latest Articles</span>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Right Visual (The Frame) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-slate-100 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10 bg-slate-100">
                <Image 
                  src={blogHero} 
                  alt="Predien Journal" 
                  priority
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-60" />
              </div>
              {/* Decorative Geometric Outline */}
              <div className="absolute -top-8 -right-8 w-full h-full border-[1px] border-slate-200 dark:border-blue-500/20 rounded-[60px] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ARTICLE GRID --- */}
      <main id="articles" className="bg-gray-50 dark:bg-[#01040f] py-12 transition-colors duration-700">
        <div className="max-w-[1400px] mx-auto px-8">
          
          <div className="flex items-end justify-between mb-12 b2">
            <h2 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
              Featured Insights<span className="text-blue-600 dark:text-blue-500">_</span>
            </h2>
            <p className="hidden md:block text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
              {data?.length || 0} Total Publications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.map((item: any, i: number) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${item.slug}`} className="space-y-8 block">
                  {/* Image Container with Custom Hover Logic */}
                  <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <Image 
                      src={blogHero} // Use item.image if available dynamically
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-6 left-6 px-4 py-1 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Tech Insight</span>
                    </div>
                  </div>

                  <div className="space-y-5 px-2">
                    <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                      <SlCalender className="text-blue-600 dark:text-blue-500" />
                      <span>{moment(item.datetime).format('MMM DD, YYYY')}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 dark:text-white tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Animated Flowing Underline */}
                    <div className="relative h-[2px] w-12 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <motion.div 
                        // className="absolute inset-y-0 left-0 bg-blue-600 dark:bg-blue-500"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        className="h-full w-0 group-hover:w-full bg-blue-600 dark:bg-blue-500 transition-all duration-700 ease-in-out"
                      />
                    </div>

          
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>



      </main>

      <Footer />
    </div>
  );
};

export default Blog;

export async function getServerSideProps() {
  try {
    const res = await fetch(`${API_URL}/api/blogs/`);  
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