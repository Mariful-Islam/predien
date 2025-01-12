import Link from "next/link";
import React from "react";
import { FaSquareCheck } from "react-icons/fa6";
import { aboutUsItems } from "./AboutUsItems";
import img from '@/assets/20250103_161042.jpg'
import Image from "next/image";

const colorClasses = {
  green: 'bg-green-100 text-green-500',
  blue: 'bg-blue-100 text-blue-500',
  yellow: 'bg-yellow-100 text-yellow-500',
  red: 'bg-red-100 text-red-500',
  violet: 'bg-violet-100 text-violet-500',
  sky: 'bg-sky-100 text-sky-500',
  orange: 'bg-orange-100 text-orange-500',
};

function AboutUs() {
  return (
    <div className="">
      <div className="max-w-[1200px] mx-auto w-full px-4 py-12 sm:px-20 overflow-hidden">
        <div
          className=""
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <h1 className="text-blue-500 font-bold">About Us</h1>
          <h3 className="text-slate-500 dark:text-slate-300 text-5xl font-semibold">
            Dedicated to delivering exceptional service 
          </h3>
        </div>
        <div className="flex mt-12">
          <div 
            className="w-0 overflow-hidden ml:w-1/2 flex items-center mr-0 ml:mr-12 h-full"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            <Image
              src={img}
              alt=""
              className="h-[1050px] object-cover rounded-md"
            />
          </div>
          <div 
            className="w-full ml:w-1/2 text-slate-600 dark:text-slate-200"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            <div className="line-clamp-5">
              Welcome to <strong className="text-green-500">Predien</strong>, where <strong className="text-green-500">software development</strong> combines innovation and precision. We are a dedicated team of
               <strong className="text-green-500"> engineers</strong>, <strong className="text-green-500">designers</strong>, and strategists dedicated to developing
              cutting-edge software solutions that help organisations prosper in
              the digital age.
            </div>
            <br />
            <div>
              We provide the following services:
              <ul className="flex flex-col gap-4 text-">
                { aboutUsItems && aboutUsItems.map((item, index) => (
                  <li className="flex gap-4 mt-6" key={index}>
                    <div
                      className={`bg-${item.color}-100 w-[50px] min-w-[50px] h-[50px] flex items-center justify-center rounded-md`}
                    >
                      <FaSquareCheck
                        className={`text-${item.color}-500 w-[25px] h-[25px]`}
                      />
                    </div>
                    <div>
                      <div className="text-slate-800 dark:text-slate-100 font-semibold">
                        {item.name}
                      </div>
                      <div className="text-slate-500 dark:text-slate-200 text-sm mt-1 line-clamp-2">
                        {item.description}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <br />
            <div className="text-gray-800 dark:text-slate-100 font-semibold">
              What differentiates us is our dedication to teamwork and customer
              satisfaction.
            </div>
            <div className="mt-10">
              <Link
                href="mailto:mariful@heliosinsider.com"
                target="_blank"
                className="border border-green-500 rounded-md px-8 py-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-950 duration-200"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="ml-4 bg-green-500 px-8 py-2 text-white rounded-md hover:bg-green-700 duration-200"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
