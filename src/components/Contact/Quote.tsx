import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiFolder, FiMessageSquare, FiSend } from "react-icons/fi";

// Assets
import consulting from "@/assets/consulting.jpg";

const BASE_URL = 'https://predien.vercel.app';

interface FormDataState {
  client_email: string;
  client_phone: string;
  subject: string;
  text: string;
}

const initialFormState: FormDataState = {
  client_email: "",
  client_phone: "",
  subject: "",
  text: "",
};

function Quote() {
  const [formData, setFormData] = useState<FormDataState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.client_email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const emailPayload = {
      subject: formData.subject,
      text: `Email: ${formData.client_email}\nPhone Number: ${formData.client_phone}\n\nMessage:\n${formData.text}`,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/sendEmail/`, emailPayload);
      toast.success(response?.data?.message || "Quote request submitted successfully!");
      setFormData(initialFormState);
    } catch (error) {
      console.error(error);
      toast.error("Failed to route request to the Predien team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = formData.text.trim() === "" ? 0 : formData.text.trim().split(/\s+/).length;

  return (
    <section className="max-w-[1400px] mx-auto px-8 py-24">
      <div className="bg-white dark:bg-[#090d16] border border-slate-200/60 dark:border-white/5 rounded-[40px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.02)] dark:shadow-none grid grid-cols-1 md:grid-cols-12 min-h-[650px] transition-colors duration-700">
        
        {/* Left Visual Frame */}
        <div className="hidden md:block md:col-span-5 lg:col-span-6 relative group overflow-hidden">
          <Image
            src={consulting}
            alt="Consulting at Predien software firm"
            priority
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/20 dark:to-[#090d16]/40" />
        </div>

        {/* Right Form Processing Area */}
        <div className="col-span-1 md:col-span-7 lg:col-span-6 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <div className="space-y-2">
            <span className="text-blue-600 dark:text-blue-500 text-xs font-black uppercase tracking-[0.25em]">
              Initialization Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              Request a Project Quote<span className="text-blue-600 dark:text-blue-500">.</span>
            </h2>
          </div>

          <form onSubmit={handleQuote} className="mt-10 space-y-5 w-full">
            
            {/* Email Field */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                <FiMail className="text-lg" />
              </span>
              <input
                type="email"
                name="client_email"
                placeholder="Corporate Email Address"
                value={formData.client_email}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900/50 text-slate-950 dark:text-white pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/5 transition-all duration-300 font-medium"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                <FiPhone className="text-lg" />
              </span>
              <input
                type="text"
                name="client_phone"
                placeholder="Contact Line (Phone)"
                value={formData.client_phone}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900/50 text-slate-950 dark:text-white pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/5 transition-all duration-300 font-medium"
                required
              />
            </div>

            {/* Subject Field */}
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                <FiFolder className="text-lg" />
              </span>
              <input
                type="text"
                name="subject"
                placeholder="Project Domain / Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900/50 text-slate-950 dark:text-white pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/5 transition-all duration-300 font-medium"
                required
              />
            </div>

            {/* Message Area Context */}
            <div className="relative group">
              <span className="absolute left-4 top-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                <FiMessageSquare className="text-lg" />
              </span>
              <textarea
                name="text"
                placeholder="Describe architectural dependencies, platform specifications, or system guidelines..."
                value={formData.text}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-50 dark:bg-slate-900/50 text-slate-950 dark:text-white pl-12 pr-4 pt-4 pb-12 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/5 transition-all duration-300 font-medium resize-none"
                required
              />
              {/* Dynamic Metadata Indicator Tag */}
              <div className="absolute bottom-3 right-4 flex items-center gap-1.5 pointer-events-none select-none">
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${wordCount > 0 ? 'text-blue-500' : 'text-slate-400'}`}>
                  Metrics: {wordCount} Words
                </span>
              </div>
            </div>

            {/* Premium Button Trigger */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold tracking-wide rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.99]"
            >
              <span>{isSubmitting ? "Processing Link..." : "Transmit Architecture Brief"}</span>
              {!isSubmitting && <FiSend className="text-base transition-transform duration-300 group-hover:translate-x-0.5" />}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}

export default Quote;