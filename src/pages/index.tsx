import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Introduction from "@/components/Home/Introduction";
import AboutUs from "@/components/Home/AboutUs";
import FAQ from "@/components/Home/FAQ";
import Header from "@/components/Header";
import Team from "@/components/Home/Team";
import Document from "@/components/Home/Document";
import Clients from "@/components/Home/Clients";
import CTA from "@/components/Home/CTA";
import Testimonials from "@/components/Home/Testmonials";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}  `}
    >
      <div className=" w-full h-screen">
        <Header/>
        <Introduction/>
      </div>
      <Document/>
      <Team/>
      <AboutUs/>
      <Testimonials/>
      <CTA/>

      
      <FAQ/>
      
      
      <Footer/>
    </div>
  );
}
