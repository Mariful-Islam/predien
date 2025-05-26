import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import product from "@/assets/product.jpg";
import Link from "next/link";
import { HiArrowTurnRightDown } from "react-icons/hi2";
import { API_URL } from "./blog";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/admin/product/ProductGrid";



function Product({data}:{data: any}) {
  return (
    <>
      <Head>
        <title>Predien | Career</title>
        <link rel="canonical" href="https://predien.vercel.app/career" />
      </Head>
      <div className="text-black relative overflow-hidden h-screen bg-gradient-to-l from-violet-600 dark:from-violet-800 via-green-500 dark:via-green-700 to-lime-400 dark:to-lime-700 bg-white dark:bg-black ">
        <Header />
        <div className="z-10 relative h-screen flex items-start ml:items-center">
          <div className="max-w-[1200px] mx-auto  px-4 sm:px-20 flex flex-col ml:flex-row gap-10 ml:gap-4 relative">
            <div
              className="w-full ml:w-1/2 h-full"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
             
              <h1 className="text-3xl text-center ml:text-start ml:text-6xl text-white mt-16">
                <div className="text-lg font-bold text-white mb-4">Product</div>
                Explore our products
                <span className="font-bold text-blue-600">_</span>
              </h1>
              <div className="text-white mt-6 text-center ml:text-start">Serve modern, robust, fast, scalable and secure product</div>
            </div>

            <div className="w-full ml:w-1/2">
              <div className="group relative h-[400px]">
                <Image
                  src={product}
                  alt="product"
                  className="h-[400px] object-cover rounded-3xl"
                />

                <div className="h-0 overflow-hidden absolute bottom-0 right-0 duration-200 backdrop-blur-md opacity-50 bg-gray-600 w-full group-hover:h-[400px] rounded-3xl "></div>

                <div className="h-0 overflow-hidden absolute bottom-0 right-0 duration-200 w-full group-hover:h-[400px] flex justify-center items-center">
                  <Link
                    href={`#job-list`}
                    className="group relative bg-blue-600 text-white px-12 py-2 rounded-full hover:bg-blue-700 duration-200 font-bold flex gap-2 items-center"
                  >
                    Explore
                    <HiArrowTurnRightDown className="duration-200 stroke-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-mt-[65px] bg-white dark:bg-black" id="job-list">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-20 ">

          <ProductGrid data={data}/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;



export async function getServerSideProps() {
  try {
    const res = await fetch(`${API_URL}/api/products/`);  
    const data = await res.json();

    // If the request fails, return empty data or handle the error
    if (!res.ok) {
      return { props: { data: [] } };
    }

    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { data: [] } };
  }
}