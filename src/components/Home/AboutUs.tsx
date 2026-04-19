import Link from "next/link";
import React from "react";
import { HiOutlineCheckBadge } from "react-icons/hi2"; // Thinner, modern icon
import { aboutUsItems } from "./AboutUsItems";
import img from '@/assets/20250103_161042.jpg'
import Image from "next/image";
import { motion } from "framer-motion";

function AboutUs() {
  return (
    <section className="bg-white dark:bg-[#020617] py-24 overflow-hidden font-jost">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[1px] bg-blue-500" />
            <span className="text-blue-400 font-bold tracking-[0.2em] uppercase text-sm">
              Our Identity
            </span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mt-6">
            Dedicated to delivering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">
              exceptional service.
            </span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Creative Image Composition */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background Decorative Element */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-3xl -z-10 animate-pulse" />
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={img}
                alt="Predien Team"
                className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
                <p className="text-blue-500 text-4xl font-black tracking-tighter">10+</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Years Experience</p>
            </div>
          </motion.div>

          {/* Right: Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Welcome to <strong className="text-slate-900 dark:text-white">Predien</strong>, where 
              software development combines innovation and precision. We are a dedicated team of
              <span className="text-blue-500 font-semibold"> engineers, designers, and strategists </span> 
              developing cutting-edge solutions that help organizations prosper in the digital age.
            </div>

            <div className="space-y-6">
              <h4 className="text-slate-900 dark:text-white font-bold text-xl">Core Expertise:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
                {aboutUsItems && aboutUsItems.map((item, index) => (
                  <li key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                      <HiOutlineCheckBadge className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-slate-800 dark:text-slate-100 font-bold text-sm">
                        {item.name}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-slate-900 dark:text-slate-100 font-bold italic border-l-4 border-blue-500 pl-4">
              "What differentiates us is our dedication to teamwork and absolute customer satisfaction."
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#"
                className="bg-blue-500 px-10 py-4 text-white font-bold rounded-full hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                Learn More
              </Link>
              <Link
                href="/contact#contact"
                className="border border-slate-200 dark:border-slate-700 px-10 py-4 text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;