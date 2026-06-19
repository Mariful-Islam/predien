import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { slateToHtml } from "@/components/slatetoHtml";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import React, { useEffect, useMemo, useState } from "react";

import { GoArrowLeft } from "react-icons/go";
import {
  FiArrowRight,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiExternalLink,
  FiLayers,
  FiZap,
} from "react-icons/fi";

type ProductPageProps = {
  data: any | null;
  canonicalUrl: string;
  unavailable?: boolean;
};

type TocHeading = {
  id: string;
  text: string;
};

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function cleanUrl(url: string) {
  return url.replace(/\/$/, "");
}

function safeJsonParse(value: any) {
  try {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    const parsed = typeof value === "string" ? JSON.parse(value) : value;

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
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

function addHeadingIdsToHtml(html: string) {
  const headings: TocHeading[] = [];
  let index = 0;

  const processedHtml = html.replace(
    /<(h2|h3)([^>]*)>(.*?)<\/\1>/gi,
    (match, tag, attrs, innerHtml) => {
      const text = stripHtml(innerHtml);
      const id = createHeadingId(text, index);

      headings.push({
        id,
        text,
      });

      index++;

      const cleanAttrs = attrs.replace(/\s+id=(["']).*?\1/g, "");

      return `<${tag}${cleanAttrs} id="${id}">${innerHtml}</${tag}>`;
    },
  );

  return {
    processedHtml,
    headings,
  };
}

function makeAbsoluteUrl(url: string | undefined, siteOrigin: string) {
  if (!url) return `${siteOrigin}/product-og.jpg`;

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
    return new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "";
  }
}

function getProductName(data: any) {
  return data?.name || data?.title || data?.product_name || "Product";
}

function getProductDescription(data: any) {
  return (
    data?.meta?.description ||
    data?.short_description ||
    data?.excerpt ||
    data?.summary ||
    `${getProductName(data)} is a production-ready software solution by Predien.`
  );
}

function getProductType(data: any) {
  return data?.type || data?.category || "Software Product";
}

function Product({ data, canonicalUrl, unavailable = false }: ProductPageProps) {
  const router = useRouter();
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

  const rawHtml = useMemo(() => {
    if (!slateNodes.length) return "";

    try {
      return slateToHtml(slateNodes);
    } catch {
      return "";
    }
  }, [slateNodes]);

  const { processedHtml, headings } = useMemo(() => {
    if (!rawHtml) {
      return {
        processedHtml: "",
        headings: [] as TocHeading[],
      };
    }

    return addHeadingIdsToHtml(rawHtml);
  }, [rawHtml]);

  function scrollToHeading(id: string) {
    const target = document.getElementById(id);

    if (!target) return;

    const headerOffset = 110;
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
  }, [headings.length, processedHtml]);

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

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

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (unavailable || !data) {
    return (
      <>
        <Head>
          <title>Product Temporarily Unavailable | Predien</title>
          <meta
            name="description"
            content="This product page is temporarily unavailable."
          />
          <meta name="robots" content="noindex, nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={canonicalUrl} />
          <link rel="icon" href="/predien.png" />
        </Head>

        <div className="min-h-screen bg-white selection:bg-blue-500 selection:text-white dark:bg-[#020617]">
          <Header />

          <main className="flex min-h-[70vh] items-center justify-center px-6">
            <div className="max-w-xl text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <FiBox />
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                Product Temporarily Unavailable
              </h1>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                We could not load this product right now. Please try again
                later or explore other products.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => router.push("/product")}
                  className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
                >
                  <GoArrowLeft />
                  Back to Products
                </button>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full border border-slate-200 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                >
                  Contact Predien
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </>
    );
  }

  const productName = getProductName(data);
  const productDescription = getProductDescription(data);
  const productType = getProductType(data);
  const updatedDate = formatDate(data?.updatedAt || data?.createdAt);
  const imageUrl = makeAbsoluteUrl(data?.image || data?.thumbnail, siteOrigin);

  const pageTitle = data?.meta?.title
    ? `Predien | ${data.meta.title}`
    : `Predien | ${productName}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: productName,
    description: productDescription,
    applicationCategory: productType,
    operatingSystem: "Web",
    url: canonicalUrl,
    image: imageUrl,
    publisher: {
      "@type": "Organization",
      name: "Predien",
      logo: {
        "@type": "ImageObject",
        url: `${siteOrigin}/predien.png`,
      },
    },
    offers: data?.price
      ? {
          "@type": "Offer",
          price: String(data.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteOrigin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteOrigin}/product`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productName,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        <link rel="icon" href="/predien.png" />
        <link rel="canonical" href={canonicalUrl} />

        <meta name="description" content={productDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={productDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={productDescription} />
        <meta name="twitter:image" content={imageUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

      <div className="bg-white selection:bg-blue-500 selection:text-white dark:bg-[#020617]">
        <Header />

        <main>
          <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-28 dark:border-slate-900 dark:bg-[#020617]">
            <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-20">
              <div className="absolute right-[-10%] top-[-20%] h-[620px] w-[620px] rounded-full bg-blue-600/30 blur-[150px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-14 md:px-8">
              <button
                onClick={() => router.push("/product")}
                className="group mb-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-blue-600"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-all group-hover:border-blue-600 group-hover:bg-blue-600 dark:border-slate-800">
                  <GoArrowLeft className="text-lg transition-colors group-hover:text-white" />
                </span>
                Back to Products
              </button>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <div className="mb-5 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      <FiLayers />
                      {productType}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <FiCheckCircle />
                      {data?.status || "Production Ready"}
                    </span>
                  </div>

                  <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight text-slate-950 dark:text-white md:text-6xl">
                    {productName}
                  </h1>

                  <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
                    {productDescription}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
                    >
                      Request This Solution
                      <FiArrowRight />
                    </Link>

                    <a
                      href="#details"
                      className="inline-flex items-center gap-3 rounded-full border border-slate-200 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                    >
                      View Details
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      Product Summary
                    </p>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
                        <span className="text-sm font-bold text-slate-500">
                          Type
                        </span>
                        <span className="text-right text-sm font-black text-slate-950 dark:text-white">
                          {productType}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
                        <span className="text-sm font-bold text-slate-500">
                          Status
                        </span>
                        <span className="text-right text-sm font-black text-blue-600 dark:text-blue-400">
                          {data?.status || "Available"}
                        </span>
                      </div>

                      {updatedDate && (
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-bold text-slate-500">
                            Updated
                          </span>
                          <span className="text-right text-sm font-black text-slate-950 dark:text-white">
                            {updatedDate}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="details" className="scroll-mt-[100px] bg-slate-50 py-14 dark:bg-[#01040f]">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 md:px-8 lg:grid-cols-12">
              <article className="lg:col-span-8">
                <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#090d16] md:p-10">
                  <div
                    className="prose prose-lg max-w-none prose-slate
                    prose-headings:scroll-mt-32 prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-950
                    prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed
                    prose-strong:text-blue-600
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-slate-400 dark:prose-strong:text-blue-400"
                    dangerouslySetInnerHTML={{
                      __html:
                        processedHtml ||
                        `<p>${productDescription}</p>`,
                    }}
                  />
                </div>
              </article>

              <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-5">
                  <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#090d16]">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
                      Sections
                    </h2>

                    {headings.length > 0 ? (
                      <nav className="mt-5 flex flex-col gap-2">
                        {headings.map((heading) => {
                          const isActive = activeHeading === heading.id;

                          return (
                            <button
                              key={heading.id}
                              type="button"
                              onClick={() => scrollToHeading(heading.id)}
                              className={`group relative rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all duration-300 ${
                                isActive
                                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-950 dark:hover:text-white"
                              }`}
                            >
                              {heading.text}
                            </button>
                          );
                        })}
                      </nav>
                    ) : (
                      <p className="mt-4 text-sm font-medium text-slate-400">
                        No sections found.
                      </p>
                    )}
                  </div>

                  <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm dark:border-slate-800 dark:bg-white dark:text-slate-950">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl text-white">
                      <FiZap />
                    </div>

                    <h3 className="text-xl font-black tracking-tight">
                      Need this kind of system?
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300 dark:text-slate-600">
                      Tell us your workflow. Predien can customize or build a
                      similar software solution for your business.
                    </p>

                    <Link
                      href="/contact"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition-all hover:bg-blue-700"
                    >
                      Request Proposal
                      <FiExternalLink />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Product;

async function fetchJsonWithTimeout(url: string, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error(`Invalid JSON response from ${url}`);
    }

    const json = await res.json();

    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`);
    }

    return json;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFromPossibleUrls(paths: string[], baseUrls: string[]) {
  let lastError: unknown = null;

  for (const baseUrl of baseUrls) {
    for (const path of paths) {
      try {
        return await fetchJsonWithTimeout(`${cleanUrl(baseUrl)}${path}`);
      } catch (error) {
        lastError = error;
      }
    }
  }

  throw lastError;
}

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

  const siteUrl = cleanUrl(
    process.env.NEXT_PUBLIC_SITE_URL || requestBaseUrl,
  );

  const apiBaseUrl = cleanUrl(process.env.API_BASE_URL || requestBaseUrl);

  const possibleBaseUrls = Array.from(
    new Set(
      [
        apiBaseUrl,
        requestBaseUrl,
        process.env.NEXT_PUBLIC_SITE_URL
          ? cleanUrl(process.env.NEXT_PUBLIC_SITE_URL)
          : "",
      ].filter(Boolean),
    ),
  );

  const canonicalUrl = `${siteUrl}/product/${slug}`;

  try {
    const product = await fetchFromPossibleUrls(
      [
        `/api/products/${encodeURIComponent(slug)}`,
        `/api/products/${encodeURIComponent(slug)}/`,
      ],
      possibleBaseUrls,
    );

    if (!product || (!product.name && !product.title && !product.product_name)) {
      return {
        notFound: true,
      };
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=600",
    );

    return {
      props: {
        data: product,
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