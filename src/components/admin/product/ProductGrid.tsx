
import Link from "next/link";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function ProductGrid({ data }: { data: any }) {
  return (
    <>
    <div className="my-8 mb-16">
      <h1
        className={`text-green-500 font-bold text-2xl`}
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="100"
      >
        Products
      </h1>
      <div
        className="grid grid-cols-1 xs:grid-cols-2 ml:grid-cols-3 gap-4 mt-4"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="150"
      >
        {data?.map((item: any, index: number) => (
          <Link href={`/product/${item?.slug}/`} key={index}>
            <div className={`border border-green-500 p-5 group relative h-[300px] rounded-xl overflow-hidden shadow-md hover:shadow-2xl`}>
              {/* <div className={`uppercase text-green-500 text-sm font-semibold relative z-10`}>
                {item?.type}
              </div> */}
              <div className={`text-slate-800 dark:text-slate-200 text-xl font-semibold group-hover:text-green-500 duration-200 relative z-10`}>
                {item.name}
              </div>
              {/* <div className={`mt-10 text-black dark:text-slate-200 text-sm translate-x-[400px] group-hover:translate-x-0 duration-500`}>
                {item?.description}
              </div> */}

              <div className={`absolute bottom-5 right-7 z-10 group-hover:translate-x-2 border border-green-500 group-hover:bg-green-500 duration-200 rounded-full p-4 h-8 w-8 grid justify-center content-center`}>
                <MdOutlineKeyboardArrowRight className={`text-green-500 h-6 w-6 group-hover:text-white duration-200`}/>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}

export default ProductGrid;
