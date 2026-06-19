import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { slateToHtml } from "@/components/slatetoHtml";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { SlCalender } from "react-icons/sl";

type BlogPageProps = {
  data: any | null;
  canonicalUrl: string;
  unavailable?: boolean;
};

function safeJsonParse(value: string | undefined | null) {
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

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function createHeadingId(text: string, index: number) {
  const slug = text
    .toString()
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/&nbsp;/g, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug ? `${slug}-${index}` : `section-${index}`;
}

function addHeadingIdsToHtml(
  html: string,
  headings: {
    id: string;
    text: string;
  }[],
) {
  let headingIndex = 0;

  return html.replace(
    /<(h1|h2)([^>]*)>(.*?)<\/\1>/gi,
    (match, tag, attrs, innerHtml) => {
      const heading = headings[headingIndex];

      if (!heading) {
        return match;
      }

      headingIndex++;

      const cleanAttrs = attrs.replace(/\s+id=(["']).*?\1/g, "");

      return `<${tag}${cleanAttrs} id="${heading.id}">${innerHtml}</${tag}>`;
    },
  );
}

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function makeAbsoluteUrl(url: string, siteOrigin: string) {
  if (!url) return `${siteOrigin}/predien.png`;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${siteOrigin}${url}`;
  }

  return `${siteOrigin}/${url}`;
}

function Blog({ data, canonicalUrl, unavailable = false }: BlogPageProps) {
  const router = useRouter();
  const [activeHeading, setActiveHeading] = useState("");

  const siteOrigin = useMemo(() => {
    try {
      return new URL(canonicalUrl).origin;
    } catch {
      return "http://localhost:3000";
    }
  }, [canonicalUrl]);

  const slateNodes = useMemo(() => {
    return safeJsonParse(data?.description);
  }, [data?.description]);

  const headings = useMemo(() => {
    const headingNodes = slateNodes.filter(
      (node: any) =>
        node.type === "heading-one" ||
        node.type === "heading-two" ||
        node.type === "heading-three",
    );

    return headingNodes.map((node: any, index: number) => {
      const text = getNodeText(node);

      return {
        text,
        id: createHeadingId(text, index),
      };
    });
  }, [slateNodes]);

  const serializeToHtml = useMemo(() => {
    try {
      const html = slateToHtml(slateNodes);
      return addHeadingIdsToHtml(html, headings);
    } catch {
      return "";
    }
  }, [slateNodes, headings]);

  function scrollToHeading(id: string) {
    const target = document.getElementById(id);

    if (!target) {
      console.warn("Heading not found:", id);
      return;
    }

    const headerOffset = 120;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    setActiveHeading(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  useEffect(() => {
    if (!headings.length) return;

    const hash = decodeURIComponent(window.location.hash.replace("#", ""));

    if (hash) {
      setTimeout(() => {
        scrollToHeading(hash);
      }, 250);
    }
  }, [serializeToHtml, headings.length]);

  useEffect(() => {
    if (!headings.length) return;

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean) as HTMLElement[];

    if (!headingElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry?.target?.id) {
          setActiveHeading(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-130px 0px -65% 0px",
        threshold: 0,
      },
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [headings]);

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

        <div className="bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-900">
          <Header />
        </div>

        <main className="min-h-[60vh] bg-white dark:bg-[#020617] flex items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <h1 className="text-4xl font-black text-slate-950 dark:text-white mb-4">
              Blog Temporarily Unavailable
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mb-8">
              We could not load this article right now. Please try again later.
            </p>

            <button
              onClick={() => router.push("/blog")}
              className="inline-flex items-center gap-3 rounded-full bg-blue-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white"
            >
              <GoArrowLeft />
              Back to Journal
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const pageTitle = data?.meta?.title
    ? `Predien | ${data.meta.title}`
    : `Predien | ${data?.title}`;

  const pageDescription =
    data?.meta?.description ||
    data?.excerpt ||
    `Read ${data?.title} on Predien.`;

  const imageUrl = makeAbsoluteUrl(data?.image || "/predien.png", siteOrigin);

  const formattedDate = data?.date
    ? moment.utc(data.date).format("DD MMMM YYYY")
    : "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data?.title,
    description: pageDescription,
    image: imageUrl,
    datePublished: data?.date || data?.createdAt,
    dateModified: data?.updatedAt || data?.date || data?.createdAt,
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

        <link rel="icon" href="/predien.png" />
        <link rel="canonical" href={canonicalUrl} />

        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

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

      <div className="bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-900 transition-colors duration-500">
        <Header />
      </div>

      <main className="bg-white dark:bg-[#020617] transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
          <div className="mb-8 mt-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <button
              onClick={() => router.push("/blog")}
              className="group flex gap-4 items-center text-slate-400 hover:text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] transition-all"
            >
              <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                <GoArrowLeft className="text-lg group-hover:text-white transition-colors" />
              </div>
              Back to Journal
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-20">
            <article className="w-full lg:w-3/4">
              <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter leading-[0.95] mb-10">
                {data?.title}
              </h1>

              <div className="flex flex-wrap gap-6 items-center text-slate-500 font-bold uppercase tracking-[0.3em] text-[12px]">
                {formattedDate && (
                  <div className="flex items-center gap-3">
                    <SlCalender className="text-blue-500" size={20} />
                    <span>{formattedDate}</span>
                  </div>
                )}

                {data?.topic?.name && (
                  <>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-blue-500">{data.topic.name}</span>
                  </>
                )}
              </div>

              {data?.image && (
                <div className="mb-16 mt-12 rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-900 shadow-2xl">
                  <img
                    src={data.image}
                    alt={data?.title || "Blog featured image"}
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              )}

              <div
                className="mt-10 prose prose-lg md:prose-xl dark:prose-invert prose-slate max-w-none
                prose-headings:scroll-mt-32 prose-headings:tracking-tighter prose-headings:font-black prose-headings:text-slate-950 dark:prose-headings:text-white
                prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-medium
                prose-strong:text-blue-600 dark:prose-strong:text-blue-500
                prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: serializeToHtml }}
              />
            </article>

            <aside className="w-full lg:w-1/4">
              <div className="sticky top-32 space-y-10">
                {headings.length > 0 && (
                  <>
                    <div className="space-y-4">
                      <h4 className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">
                        On this page
                      </h4>
                      <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-900" />
                    </div>

                    <nav className="flex flex-col gap-6">
                      {headings.map((item) => {
                        const isActive = activeHeading === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => scrollToHeading(item.id)}
                            className={`group relative text-left text-sm font-bold tracking-tight transition-all duration-300 ${
                              isActive
                                ? "text-blue-500 pl-2"
                                : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            <div
                              className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] -translate-x-1 bg-blue-500 transition-all duration-500 ${
                                isActive
                                  ? "h-full"
                                  : "h-0 group-hover:h-full"
                              }`}
                            />

                            <div
                              className={
                                isActive
                                  ? "translate-x-1 inline-block transition-transform"
                                  : ""
                              }
                            >
                              {item.text}
                            </div>
                          </button>
                        );
                      })}
                    </nav>
                  </>
                )}

                <div className="mt-20 p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">
                    Newsletter
                  </p>

                  <p className="text-slate-900 dark:text-white font-bold mb-6">
                    Get technical insights delivered weekly.
                  </p>

                  <div className="relative h-[2px] w-full bg-slate-200 dark:bg-slate-800">
                    <div className="absolute inset-0 w-0 bg-blue-500 group-hover:w-full transition-all" />
                  </div>
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

export default Blog;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;

  const slug = params?.slug;

  if (!slug || typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const forwardedHost = getHeaderValue(req.headers["x-forwarded-host"]);
  const host = forwardedHost || req.headers.host || "localhost:3000";

  const forwardedProto = getHeaderValue(req.headers["x-forwarded-proto"]);
  const protocol =
    forwardedProto ||
    (process.env.NODE_ENV === "production" ? "https" : "http");

  const requestBaseUrl = `${protocol}://${host}`;

  const API_BASE_URL = process.env.API_BASE_URL || requestBaseUrl;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || requestBaseUrl;

  const cleanApiBaseUrl = API_BASE_URL.replace(/\/$/, "");
  const cleanSiteUrl = SITE_URL.replace(/\/$/, "");

  const canonicalUrl = `${cleanSiteUrl}/blog/${slug}`;

  try {
    const apiRes = await fetch(
      `${cleanApiBaseUrl}/api/blogs/${encodeURIComponent(slug)}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (apiRes.status === 404) {
      return {
        notFound: true,
      };
    }

    if (!apiRes.ok) {
      res.statusCode = 503;

      return {
        props: {
          data: null,
          canonicalUrl,
          unavailable: true,
        },
      };
    }

    const data = await apiRes.json();

    if (!data || !data.title || !data.slug) {
      return {
        notFound: true,
      };
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300",
    );

    return {
      props: {
        data,
        canonicalUrl,
        unavailable: false,
      },
    };
  } catch {
    res.statusCode = 503;

    return {
      props: {
        data: null,
        canonicalUrl,
        unavailable: true,
      },
    };
  }
}