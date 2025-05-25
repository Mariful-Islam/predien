import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SlateRenderer } from "@/components/Renderer";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { API_URL } from "../blog";



function Product({ data }: { data: any }) {
  const router = useRouter()
  return (
    <>
      <div className="bg-white dark:bg-black scroll-mt-12">
        <div className="bg-gradient-to-l from-green-600 dark:from-green-800 via-violet-500 dark:via-violet-700 to-blue-400 dark:to-blue-700">
          <Header />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-20 py-12 dark:text-white text-black">
          <button
            onClick={()=>router.back()}
            className=" group flex gap-2 items-center justify-center  mb-4 text-blue-500 focus:ring-1 w-[80px]"
          >
            <GoArrowLeft className="text-blue-500 group-hover:-translate-x-2 duration-200" />{" "}
            Back
          </button>
          <div className="flex flex-col-reverse md:flex-row gap-12">
            <div className="w-full md:w-3/4">
              <h1 className="text-5xl font-bold ">{data?.name}</h1>
    

              <SlateRenderer
                data={data?.description}

              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;

export async function getServerSideProps(context: any) {
  const { slug } = context.params;

  try {
    const res = await fetch(`${API_URL}/api/products/${slug}/`);
    const data = await res.json();

    if (!res.ok) {
      return { props: { data: {} } };
    }

    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: {} } };
  }
}
