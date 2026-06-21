// pages/blog/[slug].tsx

import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { SlCalender } from "react-icons/sl";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { slateToHtml } from "@/components/slatetoHtml";

type Topic = {
  name?: string;
  slug?: string;
};

type BlogData = {
  _id?: string;
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  image?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  topic?: Topic;
  keywords?: string[],
  meta?: {
    title?: string;
    description?: string;
  };
};

type Heading = {
  id: string;
  text: string;
};

type BlogPageProps = {
  data: BlogData | null;
  canonicalUrl: string;
  unavailable?: boolean;
};

function safeJsonParse(value?: string | null): any[] {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getNodeText(node: any): string {
  if (!node) return "";

  if (typeof node.text === "string") {
    return node.text;
  }

  if (Array.isArray(node.children)) {
    return node.children.map(getNodeText).join("");
  }

  return "";
}

function createHeadingId(text: string, index: number) {
  const cleanText = text
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/&nbsp;/g, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return cleanText ? `${cleanText}-${index + 1}` : `section-${index + 1}`;
}

function addHeadingIdsToHtml(html: string, headings: Heading[]) {
  let headingIndex = 0;

  return html.replace(
    /<(h1|h2|h3)([^>]*)>(.*?)<\/\1>/gi,
    (fullMatch, tag, attributes, innerHtml) => {
      const heading = headings[headingIndex];

      if (!heading) return fullMatch;

      headingIndex += 1;

      const cleanAttributes = attributes.replace(
        /\s+id=(["']).*?\1/gi,
        "",
      );

      return `<${tag}${cleanAttributes} id="${heading.id}">${innerHtml}</${tag}>`;
    },
  );
}

function makeAbsoluteUrl(url: string | undefined, siteOrigin: string) {
  if (!url) return `${siteOrigin}/predien.png`;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${siteOrigin}${url}`;
  }

  return `${siteOrigin}/${url}`;
}

function formatDate(date?: string) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));
  } catch {
    return "";
  }
}

function getApiBaseUrl() {
  /**
   * IMPORTANT:
   * Use an internal/backend URL here in production.
   *
   * Example for same Next.js server:
   * API_BASE_URL=http://127.0.0.1:3000
   *
   * Example for separate API server:
   * API_BASE_URL=https://api.predien.com
   */
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("Missing API_BASE_URL environment variable.");
  }

  return apiBaseUrl.replace(/\/$/, "");
}

async function fetchBlogFromApi(slug: string): Promise<BlogData | null> {
  const apiBaseUrl = getApiBaseUrl();

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(
      `${apiBaseUrl}/api/blogs/${encodeURIComponent(slug)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Blog API failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data?.title || !data?.slug) {
      return null;
    }

    return data;
  } finally {
    clearTimeout(timeout);
  }
}

export default function BlogPage({
  data,
  canonicalUrl,
  unavailable = false,
}: BlogPageProps) {
  const [activeHeading, setActiveHeading] = useState("");

  const siteOrigin = useMemo(() => {
    try {
      return new URL(canonicalUrl).origin;
    } catch {
      return "https://predien.vercel.app";
    }
  }, [canonicalUrl]);

  const slateNodes = useMemo(() => {
    return safeJsonParse(data?.description);
  }, [data?.description]);

  const headings = useMemo<Heading[]>(() => {
    const headingNodes = slateNodes.filter(
      (node: any) =>
        node?.type === "heading-one" ||
        node?.type === "heading-two" ||
        node?.type === "heading-three",
    );

    return headingNodes.map((node: any, index: number) => {
      const text = getNodeText(node);

      return {
        text,
        id: createHeadingId(text, index),
      };
    });
  }, [slateNodes]);

  const articleHtml = useMemo(() => {
    try {
      const html = slateToHtml(slateNodes);

      return addHeadingIdsToHtml(html, headings);
    } catch (error) {
      console.error("Article HTML generation failed:", error);
      return "";
    }
  }, [slateNodes, headings]);

  useEffect(() => {
    if (!headings.length) return;

    const hash = window.location.hash.replace("#", "");

    if (!hash) return;

    const target = document.getElementById(decodeURIComponent(hash));

    if (!target) return;

    setTimeout(() => {
      const headerOffset = 120;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });

      setActiveHeading(target.id);
    }, 250);
  }, [headings]);

  useEffect(() => {
    if (!headings.length) return;

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean) as HTMLElement[];

    if (!headingElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);

        if (activeEntry?.target?.id) {
          setActiveHeading(activeEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-140px 0px -65% 0px",
        threshold: 0,
      },
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (
    event: React.MouseEvent<HTMLAnchorElement>,
    headingId: string,
  ) => {
    event.preventDefault();

    const target = document.getElementById(headingId);

    if (!target) return;

    const headerOffset = 120;
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setActiveHeading(headingId);
    window.history.replaceState(null, "", `#${headingId}`);
  };

  if (unavailable || !data) {
    return (
      <div className="font-jost selection:bg-blue-500 selection:text-white">
        <Head>
          <title>Blog Temporarily Unavailable | Predien</title>
          <meta
            name="description"
            content="This blog page is temporarily unavailable."
          />
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={canonicalUrl} />
          <link rel="icon" href="/predien.png" />
        </Head>

        <div className="border-b border-slate-100 bg-white dark:border-slate-900 dark:bg-[#020617]">
          <Header />
        </div>

        <main className="flex min-h-[60vh] items-center justify-center bg-white px-6 dark:bg-[#020617]">
          <div className="max-w-xl text-center">
            <h1 className="mb-4 text-4xl font-black text-slate-950 dark:text-white">
              Blog Temporarily Unavailable
            </h1>

            <p className="mb-8 text-slate-500 dark:text-slate-400">
              We could not load this article right now. Please try again later.
            </p>

            <Link
              href="/blog"
              className="inline-flex items-center gap-3 rounded-full bg-blue-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white"
            >
              <GoArrowLeft />
              Back to Journal
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const pageTitle = data.meta?.title
    ? `Predien | ${data.meta.title}`
    : `Predien | ${data.title}`;

  const pageDescription =
    data.meta?.description ||
    data.excerpt ||
    `Read ${data.title} on Predien.`;

  const imageUrl = makeAbsoluteUrl(data.image, siteOrigin);
  const formattedDate = formatDate(data.date);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: pageDescription,
    image: [imageUrl],
    datePublished: data.date || data.createdAt,
    dateModified: data.updatedAt || data.date || data.createdAt,
    author: {
      "@type": "Organization",
      name: "Predien",
    },
    publisher: {
      "@type": "Organization",
      name: "Predien",
      logo: {
        "@type": "ImageObject",
        url: `${siteOrigin}/predien.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <div className="font-jost selection:bg-blue-500 selection:text-white">
      <Head>
        <title>{pageTitle}</title>

        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <link rel="icon" href="/predien.png" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      </Head>

      <div className="border-b border-slate-100 bg-white transition-colors duration-500 dark:border-slate-900 dark:bg-[#020617]">
        <Header />
      </div>

      <main className="bg-white transition-colors duration-500 dark:bg-[#020617]">
        <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12">
          <div className="mb-8 mt-8 flex flex-col gap-3">
            <Link
              href="/blog"
              className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-blue-500"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all group-hover:border-blue-500 group-hover:bg-blue-500 dark:border-slate-800">
                <GoArrowLeft className="text-lg transition-colors group-hover:text-white" />
              </span>
              Back to Journal
            </Link>

            <nav
              aria-label="Breadcrumb"
              className="inline-flex max-w-full items-center gap-1 md:gap-2 overflow-hidden py-3"
            >
              <Link
                href="/"
                className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 transition-colors hover:text-blue-500"
              >
                Home
              </Link>

              <span className="text-slate-300 dark:text-slate-700">/</span>

              <Link
                href="/blog"
                className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 transition-colors hover:text-blue-500"
              >
                Blog
              </Link>

              <span className="text-slate-300 dark:text-slate-700">/</span>

              <Link
                href="/blog/category"
                className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 transition-colors hover:text-blue-500"
              >
                Category
              </Link>

              {data.topic?.name && data.topic?.slug && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">/</span>

                  <Link
                    href={`/blog/category/${data.topic.slug}`}
                    className="truncate text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 transition-colors hover:text-blue-500"
                  >
                    {data.topic.name}
                  </Link>
                </>
              )}


              <span className="text-slate-300 dark:text-slate-700">/</span>


              <span className="max-w-[120px] truncate text-[10px] font-black uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200 sm:max-w-[220px]">
                {data.title}
              </span>
            </nav>
          </div>

          <div className="flex flex-col gap-20 lg:flex-row">
            <article className="w-full lg:w-3/4">
              <h1 className="mb-10 text-4xl font-medium leading-[0.95] tracking-tight text-slate-950 dark:text-white md:text-4xl">
                {data.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500">
                {formattedDate && (
                  <div className="flex items-center gap-3">
                    <SlCalender className="text-blue-500" size={20} />
                    <span>{formattedDate}</span>
                  </div>
                )}

                {data.topic?.name && data.topic?.slug && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                    <Link
                      href={`/blog/category/${data.topic.slug}`}
                      className="text-blue-500"
                    >
                      {data.topic.name}
                    </Link>
                  </>
                )}
              </div>

              {data.image && (
                <div className="mb-16 mt-12 overflow-hidden rounded-[40px] border border-slate-100 shadow-2xl dark:border-slate-900">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="h-auto w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              )}

              {/* This full article HTML is rendered on the server. */}
              <div
                className="prose prose-lg mt-10 max-w-none prose-slate md:prose-xl
                prose-headings:scroll-mt-32 prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-950
                prose-p:font-medium prose-p:leading-relaxed prose-p:text-slate-600
                prose-strong:text-blue-600 prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
                dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-slate-400 dark:prose-strong:text-blue-500"
                dangerouslySetInnerHTML={{ __html: articleHtml }}
              />



              {/* Related Keyword Section */}
              <div>
                {data?.keywords?.map((k, i)=>(
                  <div key={i}>
                    {k}
                  </div>
                ))}
              </div>
              



            </article>

            <aside className="w-full lg:w-1/4">
              <div className="sticky top-32 space-y-10">
                {headings.length > 0 && (
                  <section aria-label="Table of contents">
                    <div className="space-y-4">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
                        On this page
                      </h2>

                      <div className="h-px w-full bg-slate-100 dark:bg-slate-900" />
                    </div>

                    {/* Fully rendered on server. JS only adds smooth scrolling and active state. */}
                    <nav className="mt-6 flex flex-col gap-5">
                      {headings.map((heading) => {
                        const isActive = activeHeading === heading.id;

                        return (
                          <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            onClick={(event) =>
                              scrollToHeading(event, heading.id)
                            }
                            className={`group relative text-left text-sm font-bold tracking-tight transition-all duration-300 ${
                              isActive
                                ? "pl-2 text-blue-500"
                                : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white"
                            }`}
                          >
                            <span
                              className={`absolute left-0 top-1/2 w-[2px] -translate-x-1 -translate-y-1/2 bg-blue-500 transition-all duration-500 ${
                                isActive
                                  ? "h-full"
                                  : "h-0 group-hover:h-full"
                              }`}
                            />

                            {heading.text}
                          </a>
                        );
                      })}
                    </nav>
                  </section>
                )}

                <div className="mt-20 rounded-[32px] border border-slate-100 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
                  <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-blue-500">
                    Newsletter
                  </p>

                  <p className="font-bold text-slate-900 dark:text-white">
                    Get technical insights delivered weekly.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const slug = context.params?.slug;

  if (!slug || typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://predien.vercel.app"
  ).replace(/\/$/, "");

  const canonicalUrl = `${siteUrl}/blog/${encodeURIComponent(slug)}`;

  try {
    const data = await fetchBlogFromApi(slug);

    if (!data) {
      return {
        notFound: true,
      };
    }

    context.res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=86400",
    );

    return {
      props: {
        data,
        canonicalUrl,
        unavailable: false,
      },
    };
  } catch (error) {
    console.error(`SSR failed for blog slug "${slug}":`, error);

    context.res.statusCode = 503;
    context.res.setHeader("X-Robots-Tag", "noindex, nofollow");

    return {
      props: {
        data: null,
        canonicalUrl,
        unavailable: true,
      },
    };
  }
};