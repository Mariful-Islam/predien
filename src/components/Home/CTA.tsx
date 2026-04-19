import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineLightningBolt } from 'react-icons/hi';

function CTA() {
  const containerVariants:any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants:any = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="bg-white dark:bg-[#020617] py-32 px-6 font-jost overflow-hidden relative">
      
      {/* 1. BACKGROUND AMBIANCE (Floating Orbs) */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 100, 0],
            scale: [1, 1.3, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[150px] rounded-full"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* 2. THE MAIN CARD (Glassmorphism) */}
        <motion.div 
          variants={itemVariants}
          className="relative bg-slate-50 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[40px] p-12 md:p-24 overflow-hidden shadow-2xl"
        >
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="text-left space-y-8">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-blue-500" />
                <span className="text-blue-400 dark:text-blue-400 font-black tracking-widest uppercase text-[14px]">
                  Scaling Next-Gen Tech
                </span>
              </div>

              <h3 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-[0.95]">
                Big ideas need <br />
                <span className="text-blue-500">better code.</span>
              </h3>

              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md">
                We don't just build apps; we architect digital ecosystems that drive real business growth.
              </p>
            </div>

            {/* CTA Actions Group */}
            <div className="flex flex-col gap-6">
              <Link
                href="/contact"
                className="group flex items-center justify-between bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-8 py-8 rounded-3xl transition-all duration-500 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white hover:-translate-y-2 shadow-xl"
              >
                <div className="text-left">
                  <span className="block text-2xl font-black tracking-tight">Book a Strategy Call</span>
                  <span className="text-sm opacity-60 font-medium italic">Response within 24 hours</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:rotate-[-45deg] transition-transform">
                  <HiOutlineArrowRight size={24} />
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/portfolio" 
                  className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 py-6 rounded-3xl text-center font-bold text-slate-900 dark:text-white hover:border-blue-500/50 transition-all"
                >
                  View Work
                </Link>
                <Link 
                  href="/services" 
                  className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 py-6 rounded-3xl text-center font-bold text-slate-900 dark:text-white hover:border-blue-500/50 transition-all"
                >
                  Our Stack
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. TRUST FOOTER */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {['Fintech', 'SaaS', 'E-commerce', 'AI Labs'].map((industry) => (
            <span key={industry} className="text-slate-900 dark:text-white font-black tracking-widest text-[10px] uppercase">
              {industry} Specialist
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CTA;