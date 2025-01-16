import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import predien from '@/assets/predien.png'
import { BsArrowUpRight } from "react-icons/bs";


function Footer() {
  return (
    <div className="bg-gray-900 text-white z-20 pt-16">
      <div className="max-w-[1200px] mx-auto w-full px-4 py-8 sm:px-20 flex flex-wrap flex-col xs:flex-row items-center justify-between xs:items-start">
        <div>
          <h1 className="text-2xl font-bold">
            <Image 
              src={predien} 
              alt="predien software agency"
              className="h-[150px] w-[150px]"
            />
            Predien
          </h1>

          <div className="text-slate-400 max-w-[215px] xs:w-[200px]">
            Customized software solutions, cutting-edge innovation, and data-driven intelligence
          </div>

          <div className="text-slate-400 max-w-[215px] xs:w-[200px] mt-4">
            <Link
              href='mailto:marifulesgiu@gmail.com'
              className="hover:text-white flex items-center "
            >
              marifulesgiu@gmail.com
            </Link>
            <Link
              href='tel:+8801823242870'
              className="hover:text-white flex items-center "
            >
              +8801823242870
            </Link>
          </div>
        </div>

        <div className="mt-6 xs:mt-0">
          <h2 className="text-xl font-bold">Services</h2>
          <nav>
            <ul className="mt-3 text-sm text-slate-400 flex flex-col gap-2">
              <li className="hover:text-slate-100 duration-200">
                <Link href={`/services/custom-software-development`}>
                  Custom Software Development
                </Link>
              </li>
              <li className="hover:text-slate-100 duration-200">
                <Link href={`/services/mobile-application-development`}>Mobile Application Development</Link>
              </li>
              <li className="hover:text-slate-100 duration-200">
                <Link href={`/services/desktop-application-development`}>Desktop Application Development</Link>
              </li>
              <li className="hover:text-slate-100 duration-200">
                <Link href={`/services/data-extraction`}>Data Extraction</Link>
              </li>
              <li className="hover:text-slate-100 duration-200">
                <Link href={`/services/wordpress-development`}>Wordpress Development</Link>
              </li>
              <li className="hover:text-slate-100 duration-200">
                <Link href={`/services/geographic-information-system`}>Geographic Information System</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-6 xs:mt-0">
          <h2 className="text-xl font-bold">Connect with us</h2>
          <ul className="mt-3 flex gap-4">
            <li>
              <Link href={`https://www.linkedin.com/company/predien/`} legacyBehavior>
                <FaLinkedin className="w-6 h-6 hover:text-blue-500 duration-200"/>
              </Link>
            </li>
            <li>
              <Link href={`https://x.com/Predien191587`} legacyBehavior>
                <FaXTwitter className="w-6 h-6 hover:text-gray-500 duration-200"/>
              </Link>
            </li>
            <li>
              <Link href={`https://www.facebook.com/profile.php?id=61571565728848`} legacyBehavior>
                <FaFacebook className="w-6 h-6 hover:text-blue-700 duration-200"/>
              </Link>
            </li>
            <li>
              <Link href={`https://www.instagram.com/predien_software/`} legacyBehavior>
                <FaInstagram className="w-6 h-6 hover:text-pink-500 duration-200"/>
              </Link>
            </li>
          </ul>

          <div className="mt-[200px] text-slate-400">
            <div> 
              Copyright @ 2025 Predien
            </div>
            <div className="mt-4">
              Crafted by <span className="text-blue-500 font-bold">Mariful</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
