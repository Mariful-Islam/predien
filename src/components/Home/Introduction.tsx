import React from 'react'
import { motion } from 'framer-motion'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import Link from 'next/link'

const Introduction = () => {
  // Animation Variants for staggered entrance
  const containerVariants:any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants:any = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className='relative min-h-screen w-full flex items-center justify-center  overflow-hidden py-20 px-6 text-black dark:text-white bg-white dark:bg-slate-900'>
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10'
      >
        
        {/* Left Side: Text Content */}
        <div className='flex flex-col space-y-10 text-center lg:text-left'>
          <motion.div variants={itemVariants} className='space-y-6'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20'>
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-500'></span>
              </span>
              <span className='text-blue-400 font-bold tracking-widest uppercase text-[10px]'>
                Available for new projects
              </span>
            </div>

            <h1 className='text-5xl md:text-8xl dark:text-white text-black font-extrabold leading-[1.05] tracking-tight'>
              Code that <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                scales tech.
              </span>
            </h1>
            
            <p className='text-lg md:text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed'>
              We architect high-performance digital infrastructure designed for the next generation of business.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className='flex flex-wrap items-center justify-center lg:justify-start gap-6'
          >
            <Link
              href="/contact#contact"
              className='group relative inline-flex items-center gap-3 dark:bg-white bg-black text-white dark:text-slate-950 px-10 py-4 text-sm font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
            >
              Start Building
              <HiOutlineArrowNarrowRight className='text-xl group-hover:translate-x-2 transition-transform' />
            </Link>
            
            <Link
              href="/portfolio"
              className='text-sm font-bold text-black dark:text-white group flex items-center gap-2 dark:hover:text-blue-400 hover:text-blue-400 transition-colors'
            >
              Browse Solutions
              <span className='h-[1px] w-8 bg-slate-700 group-hover:bg-blue-400 group-hover:w-12 transition-all'></span>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Abstract Geometric Visual */}
        <motion.div 
          variants={itemVariants}
          className='relative h-[400px] w-full flex items-center justify-center'
        >
          {/* Main Abstract Core */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            
            {/* Outer Rotating Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[1px] border-dashed border-blue-500/30 rounded-full"
            />

            {/* Middle Rotating Ring (Reverse) */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border-[1px] border-blue-400/20 rounded-[40%] blur-[1px]"
            />

            {/* Central Floating "Node" */}
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotateY: [0, 180, 360] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 w-40 h-56 bg-gradient-to-br from-blue-600/20 to-transparent backdrop-blur-3xl border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden"
            >
              {/* Internal Glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-400/10 to-transparent opacity-50" />
              
              {/* Abstract Lines inside the node */}
              <div className="flex flex-col gap-3 w-full px-6">
                <div className="h-1 w-full bg-blue-400/40 rounded-full" />
                <div className="h-1 w-3/4 bg-blue-400/20 rounded-full" />
                <div className="h-1 w-1/2 bg-blue-400/10 rounded-full" />
              </div>
            </motion.div>

            {/* Floating Orbiting Dots */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]"
                style={{
                  top: '50%',
                  left: '50%',
                  margin: '-4px',
                  transformOrigin: `${120 + i * 30}px center`,
                }}
              />
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

export default Introduction