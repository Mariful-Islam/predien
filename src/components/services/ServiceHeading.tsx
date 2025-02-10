import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowDownRight } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import Header from "../Header";

interface HeadingType {
    title: string;
    description: string;
    color: string;
    bgImage: any;

}

function ServiceHeading({data}:{data: HeadingType}) {
  return (
    <div className="relative ">
      <div className="z-20 relative">
        <Header />
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-20 flex flex-col justify-center h-[320px]">
          <h1
            className={`text-${data?.color}-500 text-xl font-bold text-center`}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            {data?.title}
          </h1>
          <h3
            className="text-slate-50 dark:text-slate-300 text-2xl md:text-5xl font-semibold text-center mt-4"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="1000"
          >
            {data?.description}
          </h3>
          <div
            className="mt-10 flex flex-col gap-2 xs:flex-row justify-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="1500"
          >
            <Link
              href="/contact#contact"
              className={`group border text-center border-${data?.color}-500 rounded-md px-8 py-1 text-${data?.color}-500 hover:bg-${data?.color}-500 hover:text-white dark:hover:bg-${data.color}-950 duration-200 flex gap-2 items-center justify-center`}
            >
              Contact{" "}
              <GoArrowRight className=" group-hover:translate-x-2 duration-200" />
            </Link>
            <Link
              href="#intro"
              className={`flex gap-2 items-center justify-center group ml-0 text-center xs:ml-4 bg-${data?.color}-500 hover:bg-${data?.color}-700 px-8 py-1 text-white rounded-md  duration-200`}
              role="button"
            >
              Learn more
              <FiArrowDownRight className=" group-hover:translate-x-2 duration-200" />
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 z-10 ">
        <div className="backdrop-blur-3xl bg-black opacity-80 h-full w-full absolute top-0 right-0"></div>
        <Image src={data.bgImage} alt="" className="h-[430px] w-screen object-cover" />
      </div>
    </div>
  );
}

export default ServiceHeading;
