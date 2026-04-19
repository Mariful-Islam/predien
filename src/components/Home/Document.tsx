import Link from "next/link";
import React, { useState } from "react";
import Modal from "../common/Modal"; // Ensure your Modal supports Framer Motion or accepts custom classNames
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiMiniArrowDownTray, HiOutlineXMark } from "react-icons/hi2"; // Cleaner modern icons

function Document() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants:any = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-slate-100 dark:bg-[#020617] relative"> {/* Dark background for modern look */}
      {/* Dynamic Background Glow */}
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-[1280px] mx-auto w-full px-6 sm:px-12 py-32 relative z-10 grid grid-cols-1 md:grid-cols-[1fr,auto] gap-12 items-center"
      >
        
        {/* Left Side: Content */}
        <div className="space-y-6">
          <motion.div variants={textVariants} className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-blue-500" />
            <span className="text-blue-400 font-bold text-sm uppercase tracking-widest">
              Pitch Deck
            </span>
          </motion.div>
          
          <motion.h3 variants={textVariants} className="text-black dark:text-white text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tighter max-w-2xl">
            A quick overview of our <span className="text-blue-500">predien.</span> agency
          </motion.h3>
          
          <motion.p variants={textVariants} className="text-slate-600 dark:text-slate-200 text-lg max-w-xl leading-relaxed">
            Download our official presentation to explore our capabilities, process, and success stories.
          </motion.p>
        </div>

        {/* Right Side: The Modern Button */}
        <motion.div variants={textVariants} className="flex justify-start md:justify-end">
          <button 
            onClick={() => setIsOpen(true)}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-5 bg-blue-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300"
          >
            {/* The primary Icon (Moves right on hover) */}
            <HiMiniArrowDownTray className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
            
            <span>Download Presentation</span>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 block w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </motion.div>

        {/* Modal: Styled for Minimalism */}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {/* Use AnimatePresence in your Modal implementation if possible */}
          <div className="bg-white dark:bg-slate-950 p-8 rounded-lg border border-slate-100 dark:border-slate-800 shadow-2xl relative">
            
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 p-1 text-slate-400 hover:text-red-500">
                <HiOutlineXMark className="w-6 h-6"/>
            </button>
            
            <div className="text-center my-6 flex flex-col items-center gap-4">
              <HiCheckCircle className="w-16 h-16 text-emerald-500 shadow-xl shadow-emerald-500/20 rounded-full" />
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white pt-2">
                Download Predien. Pitch Deck
              </h4>
              <p className="text-slate-500 dark:text-slate-100 text-sm max-w-xs">
                This document provides a detailed overview of our methodology and pricing.
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 -mx-8 -mb-8 p-6 flex flex-col-reverse sm:flex-row gap-3 rounded-b-3xl">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full justify-center px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <Link
                href="/dummy.pdf" 
                download 
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="w-full justify-center inline-flex items-center gap-2 px-5 py-3 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all"
              >
                Confirm Download
                <HiMiniArrowDownTray />
              </Link>
            </div>
          </div>
        </Modal>

      </motion.div>
    </section>
  );
}

export default Document;