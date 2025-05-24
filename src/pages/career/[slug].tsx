import { jobs } from "@/components/Career/JobList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SlateRenderer } from "@/components/Renderer";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GoArrowLeft } from "react-icons/go";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://predien.vercel.app"
    : "http://localhost:3000";

function CareerView({ data }: { data: any }) {
  const router = useRouter();

  console.log(data, "-------")

  return (
    <div className="bg-white dark:bg-black">
      <div className="bg-gradient-to-l from-yellow-400 via-violet-400 to-red-400">
        <Header />
      </div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-20 py-12 text-gray-700 dark:text-white">
        <button
          onClick={() => router.back()}
          className=" group flex gap-2 items-center justify-center  mb-4 text-blue-500 focus:ring-1 w-[80px]"
        >
          <GoArrowLeft className="text-blue-500 group-hover:-translate-x-2 duration-200" />{" "}
          Back
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <div className="text-5xl font-bold text-green-500 ">
              {data?.job_title}
            </div>

            <div className="mt-10 text-justify prestyle">
            { data?.description && 
              <SlateRenderer data={data?.description} />
            }
            </div>
          </div>

          <div className="w-full md:w-1/4">
            <div className="">
              <b>Job Title: </b>
              {data?.job_title}
            </div>
            <div className=" mt-3 ">
              <b>Salary: </b> {data?.salary_range}
            </div>
            <div className=" mt-3 ">
              <b>Available Postion:</b> {data?.vacancy}
            </div>
            <div className="mt-3 ">
              <b>Job Nature: </b>
              {data?.duration}
            </div>
            <div className="mt-3 ">
              <b>Location: </b> {data?.location}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={`/career/apply/${data?.slug}`}
            className="bg-blue-500 px-6 py-2 hover:bg-blue-600 duration-200 text-white"
          >
            Apply
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CareerView;

export async function getServerSideProps(context: any) {
  const { slug } = context.params;

  try {
    const res = await fetch(`${API_URL}/api/jobs/${slug}`);
    const data = await res.json();

    // If the request fails, return empty data or handle the error
    if (!res.ok) {
      return { props: { data: {} } };
    }

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: {} } };
  }
}
