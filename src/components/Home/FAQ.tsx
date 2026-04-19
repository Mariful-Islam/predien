import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

const faqs:any[] = [
  {
    question: "What is your project management process?",
    answer: "We follow an agile development methodology, ensuring regular updates and seamless collaboration. We utilize industry-standard tools like Jira and Linear to track progress in real-time, keeping you in the loop at every sprint."
  },
  {
    question: "How do you communicate during a project?",
    answer: "Transparency is our priority. We maintain regular touchpoints through dedicated Slack channels, weekly video strategy calls, and automated progress reports so you never have to wonder about status."
  },
  {
    question: "How much do your services cost?",
    answer: "Pricing is tailored to project scope and technical complexity. We offer both fixed-price models for defined projects and dedicated team models for long-term scaling. Contact us for a custom architectural quote."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. Our relationship doesn't end at launch. We provide tiered maintenance packages covering security patches, performance monitoring, and feature scaling to ensure your product evolves with your business."
  },
  {
    question: "Can you integrate GIS data into existing systems?",
    answer: "Absolutely. We specialize in mapping spatial data into enterprise ecosystems like ERPs and CRMs, turning raw geographic coordinates into actionable business intelligence."
  }
];

function FAQ() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const containerVariants:any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants:any = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="bg-white dark:bg-[#020617] py-24 px-6 md:px-12 font-jost transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[1px] bg-blue-500" />
            <span className="text-blue-400 dark:text-blue-400 font-black tracking-[0.2em] uppercase text-[14px]">
              Support & Clarity
            </span>
          </div>
          <h3 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight max-w-2xl">
            Frequently Asked <span className="text-blue-500">Questions.</span>
          </h3>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* FAQ Accordion List */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-2/3 space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`border-b border-slate-100 dark:border-slate-800 transition-all duration-300 ${activeIdx === index ? 'pb-6' : 'pb-2'}`}
              >
                <button
                  onClick={() => setActiveIdx(activeIdx === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className={`text-xl font-bold tracking-tight transition-colors ${activeIdx === index ? 'text-blue-500' : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-500'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all ${activeIdx === index ? 'bg-blue-500 border-blue-500 text-white rotate-180' : 'text-slate-400'}`}>
                    {activeIdx === index ? <HiOutlineMinus /> : <HiOutlinePlus />}
                  </div>
                </button>

                <AnimatePresence>
                  {activeIdx === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Side Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <div className="p-10 rounded-[32px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 sticky top-32">
              <h4 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
                Still have questions?
              </h4>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                We're here to help. Reach out to our strategy team for a more personalized discussion.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center w-full py-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default FAQ;