import React, { useEffect, useState } from 'react';
import { NavItems } from './NavItems';
import { HiChevronDown } from "react-icons/hi2"; // Cleaner modern icons
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { HiMenuAlt3 } from 'react-icons/hi'; // Thinner, more modern menu icon
import { RxCross1 } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = pathname === '/' ? window.innerHeight - 80 : 50;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <h1 className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${
            !isScrolled && pathname === '/' ? 'text-slate-950 dark:text-white' : 'text-slate-950 dark:text-white'
          }`}>
            predien<span className="text-blue-500">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden ml:flex items-center gap-8">
          <ul className="flex items-center gap-1 list-none">
            {NavItems.map((item, index) => (
              <li 
                key={index} 
                className="relative"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Link
                  href={item.link}
                  className={`px-4 py-2 flex gap-1.5 items-center text-sm font-semibold transition-all duration-300 rounded-full hover:bg-gray-800 dark:hover:bg-slate-800 ${
                    !isScrolled && pathname === '/' 
                      ? 'text-gray-800 dark:text-white hover:text-white' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-50 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                  {item.subItems.length > 0 && (
                    <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Modern Dropdown */}
                <AnimatePresence>
                  {item.subItems.length > 0 && activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-1/2 -translate-x-1/2 pt-4 w-[600px] z-[110]"
                    >
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2">
                        {item.subItems.map((subItem, sIdx) => (
                          <Link
                            key={sIdx}
                            href={`/services/${subItem.link}`}
                            className="group p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-900 dark:text-slate-100">{subItem.name}</span>
                              <HiOutlineArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {subItem.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ThemeToggle isVisible={isScrolled} />
          </div>
          
          <Link
            href="/contact#contact"
            className={`group hidden ml:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
              isScrolled 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20' 
                : 'bg-white text-slate-950 hover:bg-slate-100 shadow-xl'
            }`}
          >
            Get Started
            <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="ml:hidden p-2 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800" 
            onClick={() => setIsOpenMobileMenu(true)}
          >
            <HiMenuAlt3 className={`w-8 h-8 ${!isScrolled && pathname === '/' ? 'text-black' : 'text-slate-900 dark:text-white'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpenMobileMenu && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white dark:bg-slate-950 p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black tracking-tighter dark:text-white">predien.</span>
              <button onClick={() => setIsOpenMobileMenu(false)} className="p-2">
                <RxCross1 className="w-8 h-8 dark:text-white" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {NavItems.map((item, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <Link 
                    href={item.link}
                    onClick={() => setIsOpenMobileMenu(false)}
                    className="text-3xl font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
              <ThemeToggle isVisible={true} />
              <Link
                href="/contact#contact"
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-center"
                onClick={() => setIsOpenMobileMenu(false)}
              >
                Book a Meeting
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;