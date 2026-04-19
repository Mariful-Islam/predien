import React from "react";
import { TeamMembers } from "./teamMembers";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";

function Team() {
  // Staggered Entrance Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants:any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // AI Background Animation: Defines 3 complex data flow paths
  const AIPaths = [
    "M0,100 C150,200 350,0 500,100",
    "M0,50 C200,150 400,-50 600,50",
    "M0,150 C100,250 300,50 450,150"
  ];

  const textVariants:any = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-white dark:bg-[#020617] py-24 relative overflow-hidden transition-colors duration-500 font-jost">
      
      {/* NEW: Animated AI Background Visual 
        (Lightweight SVG Neural Net simulation)
      */}
      <div className="absolute top-0 right-0 z-0 h-[600px] w-[600px] opacity-20 dark:opacity-40 pointer-events-none ml:block hidden">
        <svg 
          viewBox="0 0 600 200" 
          className="w-full h-full mix-blend-screen"
        >
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {AIPaths.map((path, i) => (
            <React.Fragment key={i}>
              {/* Static "Neural Connection" Line */}
              <path
                d={path}
                stroke="#60a5fa" 
                strokeWidth="1"
                fill="none"
                opacity="0.2"
              />
              {/* Animated "Data Flow" (Animated Stroke) */}
              <motion.path
                d={path}
                stroke="url(#aiGradient)" 
                strokeWidth="2"
                fill="none"
                strokeDasharray="50, 150"
                strokeDashoffset="200"
                animate={{ strokeDashoffset: -200 }}
                transition={{ 
                  duration: 8 + i * 2, // Varied speeds
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * 1.5 // Staggered start
                }}
              />
            </React.Fragment>
          ))}
          {/* Subtle central node glow */}
          <circle cx="300" cy="100" r="10" fill="#22d3ee" className="animate-pulse" opacity="0.5" />
        </svg>
      </div>

      {/* Main Content (Remains z-10 for interactivity) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div variants={textVariants as any} className="flex items-center gap-3">
          <span className="w-12 h-[1px] bg-blue-500" />
          <span className="text-blue-400 font-bold text-sm uppercase tracking-widest">
            Visionaries
          </span>
        </motion.div>

        {/* Header Block with 'read.' emphasis */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4 mt-6"
        >

          <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter max-w-2xl leading-tight">
            The minds driving our <span className="text-blue-500">excellence.</span>
          </h3>
        </motion.div>

        {/* Team Grid */}
        <motion.ul 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 list-none"
        >
          {TeamMembers.map((item) => (
            <motion.li 
              key={item.id} 
              variants={itemVariants}
              className="group relative"
            >
              {/* Modern Glass Card */}
              <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-sm transition-all duration-500 group-hover:border-blue-500/30 group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
                
                {/* Image Container (with pulse effect on hover) */}
                <div className="relative mb-6 flex justify-center">
                  <div className="absolute inset-0 bg-blue-500 rounded-full scale-0 group-hover:scale-105 transition-transform duration-500 opacity-10" />
                  <Image
                    src={item.image || ""}
                    alt={item.name}
                    width={160}
                    height={160}
                    className="h-40 w-40 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-4 border-transparent group-hover:border-white dark:group-hover:border-slate-800 shadow-xl"
                  />
                </div>

                {/* Content */}
                <div className="text-center space-y-1">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white transition-colors group-hover:text-blue-600">
                    {item.name}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide">
                    {item.role}
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center gap-4">
                  <Link 
                    href={item.connect.linkedin} 
                    target="_blank"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white hover:bg-[#0077B5] transition-all"
                  >
                    <FaLinkedinIn size={18} />
                  </Link>

                  <Link 
                    href={`mailto:${item.connect.email}`} 
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white hover:bg-blue-600 transition-all"
                  >
                    <HiOutlineMail size={18} />
                  </Link>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default Team;