import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import contact from "@/assets/contact.avif";
import FAQ from "@/components/Home/FAQ";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Flags } from "@/components/Contact/Flags";
import Quote from "@/components/Contact/Quote";
import Head from "next/head";

function ContactUs() {
  return (
    <>
    <Head>
      <title>Predien | Contact</title>
      <link rel="canonical" href="https://predien.vercel.app/contact"/>
    </Head>
    <div className=" relative overflow-hidden">
      <div className="z-10 relative h-screen">
        <Header />
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row gap-0 sm:gap-12 px-4 md:px-20 h-full">
          <div 
            className="w-full sm:w-1/2 text-justify flex flex-col justify-center h-full text-white"
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-delay="300"
          >
            <h1 className="font-bold text-green-500 ">About</h1>
            Hi, <br />
            This is Predin, a global software development agency
            that specializes in developing custom software, desktop and mobile
            applications, UI/UX design, WordPress, Geographic Information
            Systems, and more. Our agency does not have a physical office
            because we operate remotely. We tailored cutting edge software 
            using the newest and most appropriate technologies. <br/>
            Thanks<br/>
            Predien
          </div>
          <div 
            className="w-full sm:w-1/2 flex flex-col justify-start mt-6 sm:mt-0 sm:justify-center h-full text-white"
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-delay="300"
          >
            Agency: Predien <br />
            Founder: Mariful Islam Saad <br />
            Head Office: Remote <br />
            Email: marifulesgiu@gmail.com <br />
            Phone: +8801823242870 <br />
            
            <div className="flex flex-col gap-4 mt-12">
              <h2 className="text-xl font-bold">Connect with us</h2>
                <ul className="mt-3 flex gap-4">
                  <li>
                    <Link href={`https://www.linkedin.com/company/predien/`} target="_blank" >
                      <FaLinkedin className="w-6 h-6 hover:text-blue-500 duration-200"/>
                    </Link>
                  </li>
                  <li>
                    <Link href={`https://x.com/Predien191587`} target="_blank" >
                      <FaXTwitter className="w-6 h-6 hover:text-gray-500 duration-200"/>
                    </Link>
                  </li>
                  <li>
                    <Link href={`https://www.facebook.com/profile.php?id=61571565728848`} target="_blank" >
                      <FaFacebook className="w-6 h-6 hover:text-blue-700 duration-200"/>
                    </Link>
                  </li>
                  <li>
                    <Link href={`https://www.instagram.com/predien_software/`} target="_blank" >
                      <FaInstagram className="w-6 h-6 hover:text-pink-500 duration-200"/>
                    </Link>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="z-0 absolute top-0 w-full h-screen bg-black backdrop-blur-xl opacity-0">
        <Image
          src={contact}
          alt="contact"
          className="w-full h-screen object-cover"
        />
      </div>

      <div className="bg-white dark:bg-black text-black dark:text-gray-300">

        <div 
          className="max-w-[1200px] mx-auto flex flex-col gap-2 px-4 py-10 md:px-20 h-full "
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <h1 className="text-blue-500 font-bold">Client</h1>
          <h3 className="text-slate-500 dark:text-slate-300 text-5xl font-semibold">
            Most Of Our Client From
          </h3>
          <div 
            className="flex flex-wrap justify-center gap-4 mt-12" 
           
          >
            {Flags.map((item, index)=>(
              <div key={index}>
                <Image src={item.src} alt="" width={200} height={100} className="w-[200px] h-[100px] "/>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 scroll-mt-[80px]" id="contact">
          <Quote/>
        </div>

        <FAQ/>
        
      </div>
      

      <div className="z-10 ">
        <Footer />
      </div>
    </div>
    </>
  );
}

export default ContactUs;
