import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Head from "next/head";
import moment from "moment";
import type { GetServerSidePropsContext } from "next";

import { HiArrowLongDown } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import blogHero from "@/assets/blog.jpg";
import AnchorHeadingPage from "@/components/global/AnchorHeadingPage";
import HeadingPage from "@/components/global/HeadingPage";
import SubHeadingPage from "@/components/global/SubHeadingPage";
import { useTopicContext } from "@/context/TopicContext";

type BlogItem = {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  image?: string;
  excerpt?: string;
  datetime?: string;
  date?: string;
  createdAt?: string;
  topic?: {
    _id?: string;
    id?: string;
    name?: string;
    slug?: string;
  };
  meta?: {
    title?: string;
    description?: string;
  };
};

type TopicItem = {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
};

type BlogPageProps = {
  data: BlogItem[];
  topicsData: TopicItem[];
  canonicalUrl: string;
  unavailable?: boolean;
};

const SITE_NAME = "Predien";
const PAGE_TITLE = "Predien | Engineering Journal";
const PAGE_DESCRIPTION =
  "Explore Predien engineering articles, software architecture insights, scalable automation guides, and minimalist digital product thinking.";

function getHeaderValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function cleanUrl(url: string) {
  return url.replace(/\/$/, "");
}

function makeAbsoluteUrl(url: string | undefined, siteOrigin: string) {
  if (!url) return `${siteOrigin}/blog-og.jpg`;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${siteOrigin}${url}`;
  }

  return `${siteOrigin}/${url}`;
}

function normalizeArray(value: any): any[] {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.blogs)) return value.blogs;
  if (Array.isArray(value?.posts)) return value.posts;
  if (Array.isArray(value?.items)) return value.items;

  return [];
}

function getBlogDate(item: BlogItem) {
  return item.datetime || item.date || item.createdAt || null;
}

function getBlogImage(item: BlogItem): string | StaticImageData {
  return item.image || blogHero;
}

function getBlogId(item: BlogItem, index: number) {
  return item._id || item.id || item.slug || String(index);
}

function getTopicId(topic: TopicItem, index: number) {
  return topic._id || topic.id || topic.slug || String(index);
}

function removeDuplicatePosts(posts: BlogItem[]) {
  const seen = new Set<string>();

  return posts.filter((post) => {
    if (!post?.slug || !post?.title) return false;

    if (seen.has(post.slug)) return false;

    seen.add(post.slug);
    return true;
  });
}

function BlogCard({ item, index }: { item: BlogItem; index: number }) {
  const blogDate = getBlogDate(item);
  const topicName = item?.topic?.name || "Insight";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.24),
      }}
      className="group"
    >
      <Link
        href={`/blog/${item.slug}`}
        aria-label={`Read article: ${item.title}`}
        className="block h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-950"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
          <Image
            src={getBlogImage(item)}
            alt={item.title}
            fill={typeof getBlogImage(item) === "string"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 backdrop-blur-md">
            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white">
              {topicName}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            <SlCalender className="text-blue-600 dark:text-blue-500" />

            <span>
              {blogDate ? moment(blogDate).format("MMM DD, YYYY") : "Latest"}
            </span>
          </div>

          <h3 className="line-clamp-2 text-xl font-black leading-tight tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-500">
            {item.title}
          </h3>

          {item.excerpt && (
            <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              {item.excerpt}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-500">
              Read Article
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-slate-800">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog({
  data,
  topicsData,
  canonicalUrl,
  unavailable = false,
}: BlogPageProps) {
  const { topics: contextTopics } = useTopicContext();

  const posts = useMemo(() => removeDuplicatePosts(data || []), [data]);

  const topics = useMemo(() => {
    if (Array.isArray(topicsData) && topicsData.length > 0) return topicsData;
    if (Array.isArray(contextTopics) && contextTopics.length > 0) {
      return contextTopics;
    }

    return [];
  }, [topicsData, contextTopics]);

  const siteOrigin = useMemo(() => {
    try {
      return new URL(canonicalUrl).origin;
    } catch {
      return "https://predien.vercel.app";
    }
  }, [canonicalUrl]);

  const ogImage = makeAbsoluteUrl("/blog-og.jpg", siteOrigin);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Predien Engineering Journal",
    description: PAGE_DESCRIPTION,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${siteOrigin}/predien.png`,
      },
    },
  };

  return (
    <div className="selection:bg-blue-500 selection:text-white">
      <Head>
        <title>{PAGE_TITLE}</title>

        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/predien.png" />

        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {unavailable && <meta name="robots" content="noindex, nofollow" />}

        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </Head>

      <Header />

      <section className="relative flex min-h-[82vh] items-center overflow-hidden bg-white pt-24 transition-colors duration-700 dark:bg-[#020617]">
        <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-20">
          <div className="absolute right-[-10%] top-[-10%] h-[640px] w-[640px] rounded-full bg-blue-600/30 blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 lg:col-span-7"
            >
              <AnchorHeadingPage text="The Engineering Journal" />

              <HeadingPage firstText="Digital" secondText="Dialogue." />

              <SubHeadingPage text="Deep dives into software architecture, minimalist design, scalable automation, and smarter digital product systems." />

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="#articles"
                  className="inline-flex items-center gap-4 rounded-full bg-blue-600 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20"
                >
                  Explore Articles
                  <HiArrowLongDown className="text-xl" />
                </Link>

                <Link
                  href="#topics"
                  className="inline-flex items-center rounded-full border border-slate-200 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300"
                >
                  Browse Topics
                </Link>
              </div>

              <div className="grid max-w-xl grid-cols-3 gap-4 pt-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    {posts.length}+
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Articles
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    {topics.length}+
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Topics
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    SEO
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Ready
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative hidden lg:col-span-5 lg:block"
            >
              <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[44px] border border-slate-100 bg-slate-100 shadow-[0_50px_100px_-35px_rgba(15,23,42,0.35)] dark:border-white/10">
                <Image
                  src={blogHero}
                  alt="Predien Engineering Journal"
                  priority
                  sizes="40vw"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-200">
                    Built for builders
                  </p>
                  <p className="mt-2 text-xl font-black leading-tight text-white">
                    Practical engineering insights for scalable digital products.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-7 -top-7 h-full w-full rounded-[44px] border border-slate-200 dark:border-blue-500/20" />
            </motion.div>
          </div>
        </div>
      </section>

      <main
        id="articles"
        className="bg-slate-50 py-16 transition-colors duration-700 dark:bg-[#01040f]"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
                Latest Publications
              </p>

              <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white md:text-5xl">
                Featured Insights
                <span className="text-blue-600 dark:text-blue-500">.</span>
              </h2>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              {posts.length} Total Publications
            </p>
          </div>

          {unavailable && (
            <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
              Articles are temporarily unavailable because the API did not
              respond correctly. This page is returning a temporary status
              instead of showing a fake empty blog list.
            </div>
          )}

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {posts.map((item, index) => (
                <BlogCard key={getBlogId(item, index)} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                No articles found
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                There are no published blog posts available right now. Once a
                published article exists, it will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </main>

      <section
        id="topics"
        className="bg-white py-16 transition-colors duration-700 dark:bg-[#020617]"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-600 dark:text-blue-500">
                Explore by Topic
              </p>

              <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white">
                Choose your focus
                <span className="text-blue-600 dark:text-blue-500">.</span>
              </h2>
            </div>
          </div>

          {topics.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topics.map((topic, index) => {
                const topicUrl = topic.slug
                  ? `/blog/category/${topic?.slug}`
                  : `/blog?topic=${encodeURIComponent(topic.name)}`;

                return (
                  <Link
                    href={topicUrl}
                    key={getTopicId(topic, index)}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:shadow-[0_24px_70px_rgba(37,99,235,0.18)] dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 opacity-0 blur-xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />

                    <h3 className="relative z-10 text-lg font-black tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-white dark:text-white">
                      {topic.name}
                      <span className="ml-2 inline-block -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </h3>

                    <p className="relative z-10 mt-3 text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-blue-50 dark:text-slate-400">
                      Read focused insights and guides.
                    </p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-500">
                No topics available yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

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
        const finalUrl = `${cleanUrl(baseUrl)}${path}`;
        const json = await fetchJsonWithTimeout(finalUrl);

        return json;
      } catch (error) {
        lastError = error;
      }
    }
  }

  throw lastError;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res, query } = context;

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
    new Set([
      apiBaseUrl,
      requestBaseUrl,
      process.env.NEXT_PUBLIC_SITE_URL
        ? cleanUrl(process.env.NEXT_PUBLIC_SITE_URL)
        : "",
    ].filter(Boolean)),
  );

  const canonicalUrl = `${siteUrl}/blog`;

  const topic = typeof query.topic === "string" ? query.topic : "";

  try {
    const blogPaths = topic
      ? [`/api/blogs?topic=${encodeURIComponent(topic)}`, "/api/blogs"]
      : ["/api/blogs"];

    const [blogsResponse, topicsResponse] = await Promise.allSettled([
      fetchFromPossibleUrls(blogPaths, possibleBaseUrls),
      fetchFromPossibleUrls(["/api/topics", "/api/topic"], possibleBaseUrls),
    ]);

    const blogs =
      blogsResponse.status === "fulfilled"
        ? removeDuplicatePosts(normalizeArray(blogsResponse.value))
        : [];

    const topics =
      topicsResponse.status === "fulfilled"
        ? normalizeArray(topicsResponse.value)
        : [];

    if (blogsResponse.status === "rejected") {
      res.statusCode = 503;

      return {
        props: {
          data: [],
          topicsData: topics,
          canonicalUrl,
          unavailable: true,
        },
      };
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=600",
    );

    return {
      props: {
        data: blogs,
        topicsData: topics,
        canonicalUrl,
        unavailable: false,
      },
    };
  } catch {
    res.statusCode = 503;

    return {
      props: {
        data: [],
        topicsData: [],
        canonicalUrl,
        unavailable: true,
      },
    };
  }
}