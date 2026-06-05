import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SlateRenderer } from "@/components/Renderer";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { GoArrowLeft } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { API_URL } from "../blog";
import Head from "next/head";
import { slateToHtml } from "@/components/slatetoHtml";

function Product({ data }: { data: any }) {
  const router = useRouter();

  // 1. Convert Slate to raw HTML
  const rawHtml = useMemo(() => {
    if (!data?.description) return "";
    try {
      const parsedData = typeof data.description === "string" 
        ? JSON.parse(data.description) 
        : data.description;
      return slateToHtml(parsedData);
    } catch (e) {
      return "";
    }
  }, [data?.description]);

  // 2. Extract H3 headings and inject IDs into the HTML content
  const { processedHtml, headings } = useMemo(() => {
    if (!rawHtml) return { processedHtml: "", headings: [] };

    const extractedHeadings: { id: string; text: string }[] = [];
    let counter = 0;

    // Regex to match <h3> tags and capture their inner text
    const modifiedHtml = rawHtml.replace(/<h2[^>]*>(.*?)<\/h2>/gi, (match, p1) => {
      // Clean up text to create a URL-safe ID slug
      const textStripped = p1.replace(/<\/?[^>]+(>|$)/g, ""); // Strip any nested inline HTML tags
      const id = `section-${textStripped
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
        .replace(/(^-|-$)/g, "")}-${counter++}`; // Prevent duplicate IDs

      extractedHeadings.push({ id, text: textStripped });

      // Return the modified h3 tag containing the new ID attribute
      return `<h2 id="${id}" class="scroll-mt-20">${p1}</h2>`;
    });

    return {
      processedHtml: modifiedHtml,
      headings: extractedHeadings,
    };
  }, [rawHtml]);

  // Handle smooth scrolling for a cleaner user experience
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Optional: Update URL hash without breaking Next.js routing
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <Head>
        <title>{`Predien | ${data?.meta?.title || data?.name || "Product"}`}</title>
        <link rel="icon" href="/predien.png" />
        <meta name="description" content={data?.meta?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${API_URL}/product/${data?.slug}`} />
      </Head>
      <div className="bg-white dark:bg-black scroll-mt-12">
        <div className="bg-gradient-to-l from-green-600 dark:from-green-800 via-violet-500 dark:via-violet-700 to-blue-400 dark:to-blue-700">
          <Header />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-20 py-12 dark:text-white text-black mt-12">
          
          <div className="mb-8 mt-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <button
              onClick={() => router.push("/product")}
              className="group flex gap-4 items-center text-slate-400 hover:text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] transition-all"
            >
              <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                <GoArrowLeft className="text-lg group-hover:text-white transition-colors" />
              </div>
              Back
            </button>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-12 mx-auto">
            <div className="w-full md:w-3/4">
              <h1 className="text-5xl font-bold ">{data?.name}</h1>

              {/* Prose Styling for Slate Content */}
              <div
                className="mt-10 prose prose-lg md:prose-xl dark:prose-invert prose-slate max-w-none 
                prose-headings:tracking-tighter prose-headings:font-black prose-headings:text-slate-950 dark:prose-headings:text-white
                prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-medium
                prose-strong:text-blue-600 dark:prose-strong:text-blue-500
                prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
                scroll-mt-30" // Added scroll-mt-24 to prevent headers getting hidden under sticky navs
                dangerouslySetInnerHTML={{ __html: processedHtml }}
              />
              
            </div>
            <div className="w-full md:w-1/4">
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Sections</h2>
                {headings.length > 0 ? (
                  <ul className="space-y-3 get-started-nav list-none">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          onClick={(e) => handleScroll(e, heading.id)}
                          className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors block"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400 italic">No sections found.</p>
                )}
              </div>  
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