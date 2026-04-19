import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at NexusFlow",
    content: "The engineering precision Predien brought to our SaaS migration was world-class. They didn't just write code; they architected a scalable future for us.",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Arif Rahman",
    role: "Founder, Nature Blend BD",
    content: "Building a high-converting Shopify store requires a specific eye for minimalism. Predien delivered exactly that—a premium feel that boosted our sales by 40%.",
    image: "https://i.pravatar.cc/150?u=arif"
  },
  {
    name: "James Miller",
    role: "Product Lead at Sunderban.nl",
    content: "Their expertise in migrating complex Magento systems to Shopify was impressive. Professional, responsive, and technically superior.",
    image: "https://i.pravatar.cc/150?u=james"
  },
  {
    name: "Elena Rodriguez",
    role: "Ops Manager at TechFlow",
    content: "Seamless integration and a very proactive team. They handled our infrastructure migration without a single minute of downtime.",
    image: "https://i.pravatar.cc/150?u=elena"
  }
];

const Testimonials = () => {
  // Initialize Embla with options for 3 slides on desktop
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 }
    }
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="bg-white dark:bg-[#020617] py-24 px-6 md:px-12 font-jost overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-blue-400" />
              <span className="text-blue-400 font-black tracking-[0.2em] uppercase text-[14px]">
                Global Trust
              </span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight">
              Stories of <span className="text-blue-500">Innovation.</span>
            </h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xs font-medium border-l-2 border-slate-100 dark:border-slate-800 pl-6"
          >
            Join over 50+ companies that scaled their digital presence with our dedicated engineering team.
          </motion.p>
        </div>

        {/* Carousel Wrapper */}
        {/* Carousel Wrapper */}
<div className="relative">
  {/* 1. Added -ml-6 to counteract the padding of the first slide */}
  <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
    <div className="flex -ml-6"> 
      {testimonials.map((t, idx) => (
        <div 
          key={idx} 
          className="flex-[0_0_100%] md:flex-[0_0_33.33%] min-w-0 pl-6"
        >
          <div className="h-full group relative p-8 lg:p-10 rounded-[32px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-500 flex flex-col justify-between">
            {/* Card Content remains the same... */}
            <div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="text-blue-500 w-4 h-4" />
                ))}
              </div>
              <p className="text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-10 italic">
                "{t.content}"
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-md flex-shrink-0">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-slate-950 dark:text-white font-bold tracking-tight text-sm lg:text-base">
                  {t.name}
                </h4>
                <p className="text-blue-500 text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none mt-1">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Navigation Buttons - Bottom Right */}
  <div className="flex justify-end gap-3 mt-10">
    <button 
      onClick={scrollPrev}
      className="p-4 rounded-full border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300"
    >
      <HiArrowLongLeft className="w-6 h-6" />
    </button>
    <button 
      onClick={scrollNext}
      className="p-4 rounded-full border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300"
    >
      <HiArrowLongRight className="w-6 h-6" />
    </button>
  </div>
</div>

        {/* Trust Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-900 flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-40 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0"
        >
          {['TECHFLOW', 'NEXUS', 'VANGUARD', 'HORIZON', 'CORE'].map((logo) => (
            <span key={logo} className="text-slate-900 dark:text-white font-black tracking-[0.3em] text-sm">
              {logo}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;