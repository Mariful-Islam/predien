import Header from "@/components/Header";
import Link from "next/link";
import React from "react";
import { GoArrowLeft } from "react-icons/go";

function Apply({slug}:{slug: string}) {

  console.log(slug)

  return (
    <div className="bg-white dark:bg-black">
      <div className="bg-gradient-to-l from-yellow-400 via-violet-400 to-red-400">
        <Header />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-20 py-12 text-gray-700 dark:text-white">
        <Link
          href={`/career`}
          className=" group flex gap-2 items-center justify-center  mb-4 text-blue-500 focus:ring-1 w-[80px]"
        >
          <GoArrowLeft className="text-blue-500 group-hover:-translate-x-2 duration-200" />{" "}
          Back
        </Link>
        
        <div>
          {slug}
        </div>
      </div>
    </div>
  );
}

export default Apply;


export async function getServerSideProps(context: any) {
  const { slug } = context.params;

  return { props: { slug } }

}

