import React from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { HiArrowLongDown } from "react-icons/hi2";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/admin/product/ProductGrid";
import AnchorHeadingPage from "@/components/global/AnchorHeadingPage";
import HeadingPage from "@/components/global/HeadingPage";
import SubHeadingPage from "@/components/global/SubHeadingPage";

// Assets
import ProductHero from "@/assets/product.png";
import { API_URL } from "./blog";

interface ProductProps {
  data: any;
}

const Product: React.FC<ProductProps> = ({ data }) => {
  return (
    <div className="selection:bg-blue-500 selection:text-white bg-white dark:bg-[#020617] transition-colors duration-700">
      <Head>
        <title>Predien | Products</title>
        <link rel="canonical" href="https://predien.vercel.app/product" />
      </Head>

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        
        {/* Cinematic Ambient Glow (Visible in Dark Mode) */}
        <div className="absolute inset-0 opacity-0 dark:opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-blue-600/30 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-10"
            >
              <AnchorHeadingPage text="Production Ecosystem" />

              <HeadingPage firstText="Engineered" secondText="Solutions." />

              <SubHeadingPage text="Explore our proprietary lineup of production-ready automation systems, custom SaaS applications, and developer toolkits engineered at Predien." />

              <div className="pt-6">
                <Link
                  href="#products"
                  className="group flex items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:border-transparent transition-all duration-500">
                    <HiArrowLongDown className="text-2xl text-slate-900 dark:text-white group-hover:text-white group-hover:translate-y-2 transition-all" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      Discover
                    </span>
                    <span className="text-slate-950 dark:text-white font-black uppercase tracking-[0.1em] text-sm">
                      Our Software
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Right Visual Column (The Frame) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-slate-100 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10 bg-slate-100">
                <Image
                  src={ProductHero}
                  alt="Predien Software Innovations"
                  priority
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-60" />
              </div>
              
              {/* Decorative Geometric Outline */}
              <div className="absolute -top-8 -right-8 w-full h-full border-[1px] border-slate-200 dark:border-blue-500/20 rounded-[60px] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PRODUCT GRID SECTION --- */}
      <main 
        id="products" 
        className="scroll-mt-[65px] bg-gray-50 dark:bg-[#01040f] py-32 transition-colors duration-700"
      >
        <div className="max-w-[1400px] mx-auto px-8">
          
          <div className="flex items-end justify-between mb-16 border-b border-slate-200 dark:border-slate-800 pb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
              Active Builds<span className="text-blue-600 dark:text-blue-500">_</span>
            </h2>
            <p className="hidden md:block text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
              {data?.length || 0} Ships Released
            </p>
          </div>

          <div className="w-full">
            <ProductGrid data={data} />
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;

export async function getServerSideProps() {
  try {
    const res = await fetch(`${API_URL}/api/products/`);
    const data = await res.json();

    if (!res.ok) {
      return { props: { data: [] } };
    }

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: [] } };
  }
}