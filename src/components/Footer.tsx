import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsArrowUpRight } from "react-icons/bs";

// Replace this with your actual local import path
// import predien from '@/assets/predien.png';

function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Custom Software", href: "custom-software-development" },
    { name: "Mobile Apps", href: "mobile-application-development" },
    { name: "Data Extraction", href: "data-extraction" },
    { name: "GIS Systems", href: "geographic-information-system" },
    { name: "WP Development", href: "wordpress-development" }
  ];

  const companyLinks = [
    { name: "About Us", href: "about" },
    { name: "Our Process", href: "process" },
    { name: "Portfolio", href: "portfolio" },
    { name: "Contact", href: "contact" }
  ];

  const socials = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/predien/" },
    { icon: FaXTwitter, href: "https://x.com/Predien191587" },
    { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61571565728848" },
    { icon: FaInstagram, href: "https://www.instagram.com/predien_software/" }
  ];

  return (
    <footer className="bg-[#020617] text-white pt-32 pb-12 overflow-hidden relative font-jost border-t border-slate-900 transition-colors duration-500">
      
      {/* 1. CINEMATIC BACKGROUND SCROLL (Animated Visual) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.03] translate-y-1/4">
        <motion.h1 
          initial={{ x: "-5%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="text-[25vw] font-black whitespace-nowrap leading-none tracking-tighter"
        >
          PREDIEN SOFTWARE AGENCY PREDIEN SOFTWARE AGENCY
        </motion.h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-16 h-16 relative overflow-hidden bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-blue-500 transition-colors duration-500">
                {/* Image component used here - ensure the import is correct */}
                {/* <Image src={predien} alt="Predien" className="h-10 w-10 object-contain" /> */}
                <div className="w-8 h-8 bg-blue-500 rounded-sm" /> {/* Placeholder for logo */}
              </div>
              <span className="text-4xl font-black tracking-tighter">predien<span className="text-blue-500">.</span></span>
            </div>
            
            <p className="text-slate-400 text-xl leading-relaxed max-w-sm font-medium">
              Architecting <span className="text-white font-bold">digital ecosystems</span> with precision code and data-driven intelligence.
            </p>

            <div className="pt-4">
              <Link
                href='mailto:marifulesgiu@gmail.com'
                className="group flex items-center gap-4 text-slate-300 hover:text-white transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
                  <BsArrowUpRight className="group-hover:rotate-45 transition-transform duration-300 text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Inquiries</span>
                  <span className="text-lg font-bold">marifulesgiu@gmail.com</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation Links (No dots, flowing line hover) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-10">
              <h4 className="text-blue-500 font-black tracking-[0.3em] uppercase text-[11px]">Solutions</h4>
              <ul className="space-y-5 list-none p-0 m-0">
                {services.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={`/services/${item.href}`} 
                      className="relative text-slate-400 hover:text-white transition-colors duration-300 group inline-block py-1 text-lg font-medium"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-500 ease-out group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <h4 className="text-blue-500 font-black tracking-[0.3em] uppercase text-[11px]">Company</h4>
              <ul className="space-y-5 list-none p-0 m-0">
                {companyLinks.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={`/${item.href}`} 
                      className="relative text-slate-400 hover:text-white transition-colors duration-300 group inline-block py-1 text-lg font-medium"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-500 ease-out group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social & Location */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div className="space-y-10">
              <h4 className="text-blue-500 font-black tracking-[0.3em] uppercase text-[11px]">Connect</h4>
              <div className="flex gap-4 flex-wrap">
                {socials.map((social, i) => (
                  <Link 
                    key={i} 
                    href={social.href} 
                    target="_blank"
                    className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-500 group"
                  >
                    <social.icon className="text-2xl group-hover:scale-110 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-12 p-8 bg-slate-900/40 rounded-[32px] border border-slate-800 backdrop-blur-sm group hover:border-blue-500/30 transition-colors duration-500">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-3">Headquarters</p>
              <p className="text-slate-200 font-bold text-lg leading-snug">
                Dhaka, Bangladesh <br />
                <span className="text-sm font-medium text-slate-500">Global Operations</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm font-medium tracking-tight">
            © {currentYear} <span className="text-white font-black tracking-tighter">PREDIEN.</span> All rights reserved.
          </p>
          
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <span className="w-8 h-[1px] bg-slate-800" />
            <span>Crafted by</span>
            <Link href="#" className="text-white font-black hover:text-blue-500 transition-colors tracking-tighter">
              Mariful Islam Saad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;