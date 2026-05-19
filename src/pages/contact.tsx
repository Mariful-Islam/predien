import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiArrowLongDown } from "react-icons/hi2";
import { FiMail, FiPhone, FiMapPin, FiUser } from "react-icons/fi";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/Home/FAQ";
import Quote from "@/components/Contact/Quote";
import { Flags } from "@/components/Contact/Flags";
import AnchorHeadingPage from '@/components/global/AnchorHeadingPage';
import HeadingPage from '@/components/global/HeadingPage';
import SubHeadingPage from '@/components/global/SubHeadingPage';

function ContactUs() {
  return (
    <div className="selection:bg-blue-500 selection:text-white bg-white dark:bg-[#020617] transition-colors duration-700">
      <Head>
        <title>Predien | Contact</title>
        <link rel="canonical" href="https://predien.vercel.app/contact"/>
      </Head>

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 lg:pb-0">
        
        {/* Cinematic Ambient Glow */}
        <div className="absolute inset-0 opacity-0 dark:opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-600/30 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 blur-[130px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content: Profile Description */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-8"
            >
              <AnchorHeadingPage text="Global Scale Agency" />
              
              <HeadingPage firstText="Let's build" secondText="Together." />

              <SubHeadingPage text="Predien is a decentralized global engineering agency specializing in bespoke software architectures, premium UI/UX interfaces, and high-conversion web infrastructure. Operating completely remotely, we build bleeding-edge products with unmatched technical precision." />

              <div className="pt-4">
                <Link href="#contact" className="group flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:border-transparent transition-all duration-500">
                    <HiArrowLongDown className="text-2xl text-slate-900 dark:text-white group-hover:text-white group-hover:translate-y-2 transition-all" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Get a Quote</span>
                    <span className="text-slate-950 dark:text-white font-black uppercase tracking-[0.1em] text-sm">Drop a message</span>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Right Content: Modern Premium Informational Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-slate-50 dark:bg-[#090d16] border border-slate-200/60 dark:border-white/5 rounded-[40px] p-8 sm:p-10 space-y-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-none z-10 relative">
                
                <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-widest uppercase pb-4 border-b border-slate-200 dark:border-slate-800">
                  Directory_
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                      <FiUser />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Founder</p>
                      <p className="text-sm font-bold text-slate-950 dark:text-white">Mariful Islam Saad</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                      <FiMapPin />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Headquarters</p>
                      <p className="text-sm font-bold text-slate-950 dark:text-white">Remote / Distributed</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                      <FiMail />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Email Directly</p>
                      <Link href="mailto:marifulesgiu@gmail.com" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        marifulesgiu@gmail.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                      <FiPhone />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Hotline</p>
                      <p className="text-sm font-bold text-slate-950 dark:text-white">+8801823242870</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-4">Social Ecosystem</p>
                  <div className="flex items-center gap-3">
                    <Link href="https://www.linkedin.com/company/predien/" target="_blank" className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-500 hover:scale-105 transition-all duration-300">
                      <FaLinkedin className="text-lg" />
                    </Link>
                    <Link href="https://x.com/Predien191587" target="_blank" className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:scale-105 transition-all duration-300">
                      <FaXTwitter className="text-lg" />
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=61571565728848" target="_blank" className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-600 hover:scale-105 transition-all duration-300">
                      <FaFacebook className="text-lg" />
                    </Link>
                    <Link href="https://www.instagram.com/predien_software/" target="_blank" className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-500 hover:scale-105 transition-all duration-300">
                      <FaInstagram className="text-lg" />
                    </Link>
                  </div>
                </div>

              </div>
              <div className="absolute -top-6 -right-6 w-full h-full border border-slate-200 dark:border-blue-500/10 rounded-[40px] pointer-events-none hidden sm:block" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECTION: GLOBAL DISTRIBUTION (FLAGS) --- */}
      <section className="bg-gray-50 dark:bg-[#01040f] py-32 transition-colors duration-700">
        <div className="max-w-[1400px] mx-auto px-8">
          
          <div className="flex items-end justify-between mb-20 border-b border-slate-200 dark:border-slate-800 pb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
              Global Footprint<span className="text-blue-600 dark:text-blue-500">_</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
              Demographics Summary
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Flags.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white dark:bg-[#090d16] border border-slate-200/60 dark:border-slate-900/60 rounded-3xl p-4 flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-500"
              >
                <div className="w-full aspect-[2/1] rounded-xl overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Image 
                    src={item.src} 
                    alt="Client Regional Demographics" 
                    fill
                    sizes="(max-w-768px) 50vw, 15vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- QUOTE SYSTEM SECTION --- */}
      <div className="scroll-mt-[80px]" id="contact">
        <Quote />
      </div>

      {/* --- FAQ SECTION --- */}
      <FAQ />

      <Footer />
    </div>
  );
}

export default ContactUs;