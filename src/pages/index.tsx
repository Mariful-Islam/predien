import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Introduction from "@/components/Home/Introduction";
import AboutUs from "@/components/Home/AboutUs";
import FAQ from "@/components/Home/FAQ";
import Header from "@/components/Header";
import Team from "@/components/Home/Team";
import Document from "@/components/Home/Document";

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
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] dark:bg-black bg-white dark:text-white text-black`}
    >
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-black dark:via-purple-900 dark:bg-pink-800 w-full">
        <Header/>
        <Introduction/>
      </div>
      <Document/>
      <Team/>
      <AboutUs/>
      <FAQ/>
      
      
      <Footer/>
    </div>
  );
}
