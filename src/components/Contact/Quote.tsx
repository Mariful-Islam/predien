import React, { useState } from "react";
import consulting from "@/assets/consulting.jpg";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";

const BASE_URL = 'https://predien.vercel.app' 

function Quote() {
  const [formData, setFormData] = useState<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = formData?.subject;
    const text =
      "Email: " +
      formData?.client_email +
      "\n" +
      "Phone Number: " +
      formData?.client_phone +
      "\n" +
      formData?.text;

    const newFormData = {
      subject: subject,
      text: text,
    };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.client_email)) {
      toast.error('Email is not valid.')
    } else {
      axios.post(`${BASE_URL}/api/sendEmail/`, newFormData)
        .then((response: any) => {
          toast.success(response?.data?.message)
          setFormData(null)
        })
        .catch(() => toast.error("Error sending email to the Predien team!"));
    }
    
  };

  const wordCount = formData?.text?.trim()?.split(/\s+/).length

  console.log(formData);
  return (
    <div className="flex overflow-hidden">
      <div 
        className="w-0 overflow-hidden md:w-1/2"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <Image
          src={consulting}
          alt="consulting-software-firm"
          className="w-full h-[500px] object-cover"
        />
      </div>

      <div 
        className="w-full md:w-1/2 h-[500px] flex flex-col justify-center px-4 md:px-10"
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <div className="text-blue-500 font-bold text-lg">Send us Quote</div>

        <form onSubmit={handleQuote} className="mt-4 flex flex-col gap-4 mt-6 w-full md:w-[315px] lg:w-[400px]">
          <input
            type="email"
            name="client_email"
            placeholder="Your email"
            value={formData?.client_email}
            onChange={handleChange}
            className="bg-white dark:bg-gray-800 px-4 py-2 rounded-none border border-blue-500 outline-none focus:ring-2 "
            required
          
          />

          <input
            type="text"
            name="client_phone"
            placeholder="Your phone"
            value={formData?.client_phone}
            onChange={handleChange}
            className="bg-white dark:bg-gray-800 px-4 py-2 rounded-none border border-blue-500 outline-none focus:ring-2 "
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData?.subject}
            onChange={handleChange}
            className="bg-white dark:bg-gray-800 px-4 py-2 rounded-none border border-blue-500 outline-none focus:ring-2 "
            required
          />
          <span className="text-end text-green-500">Word: {wordCount}</span>
          <textarea
            name="text"
            placeholder="Type your message"
            value={formData?.text}
            onChange={handleChange}
            className="bg-white dark:bg-gray-800 px-4 py-2 mt-[-16px] rounded-none border border-blue-500 outline-none focus:ring-2 "
            required
          />
          

          <button 
            type="submit"
            className="bg-blue-500 text-white  hover:bg-blue-700 duration-200 py-2 font-bold text-lg"
          >
            Send
          </button>
        </form>

        <div className={`h-0 overflow-hidden `}>
          Your email is sent to predien team. Thanks for get in touch. We will reply as soon as possible.
        </div>
      </div>
    </div>
  );
}

export default Quote;
